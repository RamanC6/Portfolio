import { useState } from 'react';
import {
  AlertCircle,
  ExternalLink,
  FolderGit2,
  GitFork,
  Github,
  RefreshCw,
  Star,
} from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { useGitHub } from '../../hooks/useGitHub';
import { SectionHeader } from '../UI/SectionHeader';

export function GitHubSection() {
  const { status, profile, repos, errorMessage, retry } = useGitHub(
    PROFILE.githubUsername
  );
  const [avatarFailed, setAvatarFailed] = useState(false);

  return (
    <section id="github" className="py-16 sm:py-20 lg:py-24 border-b border-white/[0.08]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          title="GitHub Activity"
          subtitle="Live public profile and repository index fetched directly from the GitHub REST API."
        />

        {/* Loading State */}
        {status === 'loading' && (
          <div className="space-y-6" aria-live="polite" aria-busy="true">
            <div className="h-32 animate-pulse rounded-2xl border border-white/[0.08] bg-[#141A21]" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-40 animate-pulse rounded-2xl border border-white/[0.08] bg-[#141A21]"
                />
              ))}
            </div>
          </div>
        )}

        {/* Error / Rate-Limit Fallback State */}
        {(status === 'error' || status === 'rate-limited') && (
          <div className="rounded-2xl border border-white/[0.1] bg-[#141A21] p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3.5">
                <AlertCircle
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#70D9FF]"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-display text-lg font-semibold text-[#F5F7FA]">
                    {status === 'rate-limited'
                      ? 'GitHub API Rate Limit Reached'
                      : 'GitHub Data Temporarily Unavailable'}
                  </h3>
                  <p className="mt-1 text-sm text-[#A0AAB8]">
                    {errorMessage}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={retry}
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-white/[0.12] bg-[#1A212A] px-4 py-2 text-sm font-medium text-[#F5F7FA] hover:border-[#C6F36B]/50 transition-colors whitespace-nowrap"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  <span>Retry</span>
                </button>
                <a
                  href={PROFILE.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[42px] items-center gap-2 rounded-lg bg-[#C6F36B] px-4 py-2 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                  <span>Open GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && profile && (
          <div className="space-y-6">
            {/* GitHub Profile Summary Card */}
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/[0.08] bg-[#141A21] p-6 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4 min-w-0">
                {profile.avatar_url && !avatarFailed ? (
                  <img
                    src={profile.avatar_url}
                    alt={`${profile.name || profile.login} GitHub avatar`}
                    referrerPolicy="no-referrer"
                    onError={() => setAvatarFailed(true)}
                    className="h-16 w-16 shrink-0 rounded-xl border border-white/[0.1] object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-white/[0.1] bg-[#1A212A] text-[#C6F36B]">
                    <Github className="h-7 w-7" aria-hidden="true" />
                  </div>
                )}

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <h3 className="font-display text-xl font-semibold text-[#F5F7FA] truncate">
                      {profile.name || PROFILE.name}
                    </h3>
                    <span className="font-mono text-xs text-[#70D9FF]">
                      @{profile.login}
                    </span>
                  </div>
                  {profile.bio && (
                    <p className="mt-1 text-sm text-[#A0AAB8] line-clamp-2">
                      {profile.bio}
                    </p>
                  )}
                  <p className="mt-1.5 font-mono text-xs text-[#A0AAB8] tabular-nums">
                    Public Repositories: {profile.public_repos}
                  </p>
                </div>
              </div>

              <a
                href={profile.html_url || PROFILE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#C6F36B] px-4 py-2.5 text-sm font-semibold text-[#080A0E] hover:bg-[#d4f78c] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B]"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>View GitHub Profile</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Public Repositories Grid */}
            {repos.length === 0 ? (
              <div className="rounded-2xl border border-white/[0.08] bg-[#141A21] p-8 text-center">
                <FolderGit2 className="mx-auto h-7 w-7 text-[#A0AAB8]" aria-hidden="true" />
                <p className="mt-3 text-sm text-[#A0AAB8]">
                  No public repositories returned at this moment.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                  <article
                    key={repo.id}
                    className="flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-[#141A21] p-5 hover:border-[#70D9FF]/40 transition-colors"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-display text-base font-semibold text-[#F5F7FA] hover:text-[#C6F36B] transition-colors break-words focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C6F36B] rounded-sm"
                        >
                          {repo.name}
                        </a>
                        <ExternalLink
                          className="mt-1 h-3.5 w-3.5 shrink-0 text-[#A0AAB8]"
                          aria-hidden="true"
                        />
                      </div>

                      <p className="mt-2 text-sm leading-relaxed text-[#A0AAB8] line-clamp-3">
                        {repo.description || 'Public repository hosted on GitHub.'}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-3.5 font-mono text-xs text-[#A0AAB8]">
                      <span>{repo.language || 'Repository'}</span>

                      <div className="flex items-center gap-4 tabular-nums">
                        <span className="inline-flex items-center gap-1" title="Stars">
                          <Star className="h-3.5 w-3.5 text-[#C6F36B]" aria-hidden="true" />
                          <span>{repo.stargazers_count}</span>
                        </span>
                        <span className="inline-flex items-center gap-1" title="Forks">
                          <GitFork className="h-3.5 w-3.5 text-[#70D9FF]" aria-hidden="true" />
                          <span>{repo.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
