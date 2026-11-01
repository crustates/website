import { pageUrl } from "./site";

/**
 * The script behind `curl -fsSL <site>/install | sh`. Crustates has no
 * release yet, so it explains that and exits non-zero instead of installing.
 * TODO: install the release once one exists.
 */
export function installScript(downloadUrl = pageUrl("/download")): string {
  return `#!/bin/sh
# Crustates installer
set -eu

echo "Crustates isn't released yet." >&2
echo "Follow the first release at ${downloadUrl}" >&2
exit 1
`;
}
