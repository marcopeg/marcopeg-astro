IMAGE ?= marcopeg/marcopeg-astro
VERSION ?= $(shell date +%Y%m%d%H%M%S)
VERSION := $(VERSION)
GITHUB_REPO ?= marcopeg/marcopeg-astro
DEPLOYMENT_URL ?= https://marcopeg.com
DEPLOYMENT_VERIFY_INITIAL_WAIT ?= 30
DEPLOYMENT_VERIFY_INTERVAL ?= 10
DEPLOYMENT_VERIFY_ATTEMPTS ?= 30
SKIP_DEPLOYMENT_VERIFY ?= 0

.PHONY: dev build preview install deploy deploy.github verify.deployment verify.deployment.maybe

dev:
	npm run dev

build:
	npm run build

preview:
	npm run preview

install:
	npm install

deploy: deploy.github

deploy.github:
	@tag="$(VERSION)"; \
	if ! printf '%s' "$$tag" | grep -Eq '^20[0-9]{12}$$'; then \
		echo "VERSION must be a timestamp in YYYYMMDDHHMMSS format (got: $$tag)"; \
		exit 1; \
	fi; \
	if git rev-parse -q --verify "refs/tags/$$tag" >/dev/null; then \
		echo "Tag $$tag already exists; choose a new VERSION"; \
		exit 1; \
	fi; \
	git tag -a "$$tag" -m "Deploy $$tag"; \
	git push origin "$$tag"; \
	echo "Deployment started: https://github.com/$(GITHUB_REPO)/actions"; \
	$(MAKE) verify.deployment.maybe VERSION="$$tag"

verify.deployment.maybe:
	@if [ "$(SKIP_DEPLOYMENT_VERIFY)" = "1" ]; then \
		echo "Skipping local deployment verification; the caller must verify the rollout"; \
	else \
		$(MAKE) verify.deployment VERSION="$(VERSION)"; \
	fi

verify.deployment:
	@base_url="$(DEPLOYMENT_URL)"; \
	marker_url="$${base_url%/}/deployment-$(VERSION).txt"; \
	marker_file="$$(mktemp)"; \
	trap 'rm -f "$$marker_file"' EXIT; \
	echo "Waiting $(DEPLOYMENT_VERIFY_INITIAL_WAIT)s before verifying $$marker_url"; \
	sleep $(DEPLOYMENT_VERIFY_INITIAL_WAIT); \
	attempt=1; \
	while [ $$attempt -le $(DEPLOYMENT_VERIFY_ATTEMPTS) ]; do \
		: > "$$marker_file"; \
		http_code="$$(curl --silent --show-error --location \
			--max-time $(DEPLOYMENT_VERIFY_INTERVAL) \
			--output "$$marker_file" \
			--write-out '%{http_code}' \
			"$$marker_url?verify=$(VERSION)-$$attempt" || true)"; \
		marker="$$(tr -d '\r\n' < "$$marker_file")"; \
		if [ "$$http_code" = "200" ] && [ "$$marker" = "$(VERSION)" ]; then \
			echo "Verified deployment $(VERSION): $$marker_url"; \
			exit 0; \
		fi; \
		echo "Attempt $$attempt/$(DEPLOYMENT_VERIFY_ATTEMPTS): marker not ready (HTTP $${http_code:-000})"; \
		attempt=$$((attempt + 1)); \
		sleep $(DEPLOYMENT_VERIFY_INTERVAL); \
	done; \
	echo "Deployment verification failed after $(DEPLOYMENT_VERIFY_ATTEMPTS) attempts: $$marker_url"; \
	exit 1
