export interface PackageModel {
    "dependent_repos_count": number,
    "dependents_count": number,
    "deprecation_reason": string | null,
    "description": string,
    "forks": number,
    "homepage": string,
    "keywords": Array<string>,
    "language": string,
    "latest_download_url": string
    "latest_release_number": string
    "latest_release_published_at": string
    "latest_stable_release_number": string
    "latest_stable_release_published_at": string
    "license_normalized": string
    "licenses": string
    "name": string
    "normalized_licenses": Array<string>,
    "package_manager_url": string | null,
    "platform": string,
    "rank": number,
    "repository_license": string,
    "repository_url": string,
    "stars": number,
    "status": number,
    "versions": Array<any>
}