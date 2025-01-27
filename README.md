# Monorepo Structure

This repository is organized as a monorepo, which means it contains multiple packages managed within a single repository. The structure of the monorepo is as follows:

```
/packages
  /core
  /ex
  ...
/scripts
  prepublish.js
  ...
```

- **/packages**: This directory contains all the individual packages in the monorepo.
- **/scripts**: This directory contains various scripts used for automation, including the prepublish script.

# Prepublish Script

The prepublish script is used to automate tasks that need to be performed before publishing the packages. This script is located at `/scripts/prepublish.js` and typically includes tasks such as:

- Creates a dist subfolder and copy files to it
- Creates a new package.json in dist folder
- Updates package.json main and type tags to new folder

# Changesets Package Usage

The `changesets` package is used to manage versioning and changelogs for the packages in the monorepo. It helps in creating and applying changesets, which are records of changes made to the packages.

## Adding a Changeset

To add a changeset, run the following command:

```sh
npx changeset
```

This will prompt you to select the packages that have been changed and describe the changes. A new changeset file will be created in the `.changeset` directory.

## Applying Changesets

To apply the changesets and update the versions of the packages, run:

```sh
npx changeset version
```

This will update the package versions and generate changelogs based on the changesets.

## Publishing Packages

After applying the changesets, you can publish the packages to the npm registry using:

```sh
npx changeset publish
```

This will publish all the packages with the updated versions.

For more information on using changesets, refer to the [Changesets documentation](https://github.com/atlassian/changesets).
