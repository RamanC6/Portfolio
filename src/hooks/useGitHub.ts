import { useCallback, useEffect, useState } from 'react';

export interface GitHubUserProfile {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
}

export type GitHubStatus = 'loading' | 'success' | 'rate-limited' | 'error';

interface UseGitHubResult {
  status: GitHubStatus;
  profile: GitHubUserProfile | null;
  repos: GitHubRepo[];
  errorMessage: string | null;
  retry: () => void;
}

const CACHE_TTL_MS = 5 * 60 * 1000;

interface CachedPayload {
  timestamp: number;
  profile: GitHubUserProfile;
  repos: GitHubRepo[];
}

let memoryCache: CachedPayload | null = null;

export function useGitHub(username: string): UseGitHubResult {
  const [status, setStatus] = useState<GitHubStatus>(() =>
    memoryCache ? 'success' : 'loading'
  );
  const [profile, setProfile] = useState<GitHubUserProfile | null>(
    () => memoryCache?.profile ?? null
  );
  const [repos, setRepos] = useState<GitHubRepo[]>(
    () => memoryCache?.repos ?? []
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    memoryCache = null;
    setAttempt((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (memoryCache && Date.now() - memoryCache.timestamp < CACHE_TTL_MS) {
      setProfile(memoryCache.profile);
      setRepos(memoryCache.repos);
      setStatus('success');
      return;
    }

    const controller = new AbortController();

    async function loadGitHubData() {
      setStatus('loading');
      setErrorMessage(null);

      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
            signal: controller.signal,
            headers: { Accept: 'application/vnd.github+json' },
          }),
          fetch(
            `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12`,
            {
              signal: controller.signal,
              headers: { Accept: 'application/vnd.github+json' },
            }
          ),
        ]);

        if (userRes.status === 403 || userRes.status === 429 || reposRes.status === 403 || reposRes.status === 429) {
          setStatus('rate-limited');
          setErrorMessage(
            'GitHub API rate limit reached from this network. Visit the GitHub profile directly or retry in a moment.'
          );
          return;
        }

        if (!userRes.ok || !reposRes.ok) {
          throw new Error(`GitHub returned status ${userRes.status}`);
        }

        const userData = (await userRes.json()) as GitHubUserProfile;
        const reposData = (await reposRes.json()) as GitHubRepo[];

        memoryCache = {
          timestamp: Date.now(),
          profile: userData,
          repos: Array.isArray(reposData) ? reposData : [],
        };

        setProfile(memoryCache.profile);
        setRepos(memoryCache.repos);
        setStatus('success');
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setStatus('error');
        setErrorMessage(
          'Unable to load live GitHub repositories right now. You can still inspect all repositories directly on GitHub.'
        );
      }
    }

    loadGitHubData();

    return () => controller.abort();
  }, [username, attempt]);

  return { status, profile, repos, errorMessage, retry };
}
