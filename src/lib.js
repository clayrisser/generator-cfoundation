import emptyDir from 'empty-dir';
import gitUserEmail from 'git-user-email';
import gitUserName from 'git-user-name';

export function isEmpty() {
  return emptyDir.sync(process.cwd());
}

export function guessEmail() {
  return gitUserEmail() || 'email@example.com';
}

export function guessUsername(email) {
  const matches = (email || guessEmail()).match(/^[^@]+/g);
  if (matches.length > 0) return matches[0];
  return 'some-username';
}

export function guessName() {
  const matches = process.cwd().match(/[^\/]+$/g);
  if (isEmpty() && matches.length > 0) return matches[0];
  return 'some-name';
}

export function guessAuthorName() {
  return gitUserName() || 'Some Name';
}

export function copy(yo) {
  return Promise.all([
    yo.fs.copyTpl(
      yo.templatePath('template/shared/LICENSE'),
      yo.destinationPath('LICENSE'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/Makefile'),
      yo.destinationPath('Makefile'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/README.rst'),
      yo.destinationPath('README.rst'),
      ...yo.context
    ),
    yo.fs.copy(
      yo.templatePath('template/shared/_editorconfig'),
      yo.destinationPath('.editorconfig')
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/_gitignore'),
      yo.destinationPath('.gitignore'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/requirements.txt'),
      yo.destinationPath('requirements.txt'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/setup.cfg'),
      yo.destinationPath('setup.cfg'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/setup.py'),
      yo.destinationPath('setup.py'),
      ...yo.context
    ),
    yo.fs.copyTpl(
      yo.templatePath('template/shared/app/**'),
      yo.destinationPath('app'),
      ...yo.context
    )
  ]);
}
