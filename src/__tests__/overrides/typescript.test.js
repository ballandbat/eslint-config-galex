const { createTSOverride } = require('../../overrides/typescript');

describe('createTSOverride', () => {
  test('matches snapshot without TS', () => {
    const project = {
      react: {
        hasReact: false,
      },
      typescript: {
        hasTypeScript: false,
        version: '',
      },
    };

    expect(createTSOverride(project)).toMatchSnapshot();
  });

  test.each([
    '3.3.0',
    '3.4.0',
    '3.5.0',
    '3.6.0',
    '3.7.0',
    '3.8.0',
    '3.9.0',
    '4.0.0',
  ])('matches snapshot with TS %s', version => {
    const project = {
      react: {
        hasReact: false,
      },
      typescript: {
        hasTypeScript: true,
        version,
      },
    };

    expect(createTSOverride(project)).toMatchSnapshot();
  });

  test.each([
    '3.3.0',
    '3.4.0',
    '3.5.0',
    '3.6.0',
    '3.7.0',
    '3.8.0',
    '3.9.0',
    '4.0.0',
  ])('matches snapshot with TS %s & react', version => {
    const project = {
      react: {
        hasReact: true,
      },
      typescript: {
        hasTypeScript: true,
        version,
      },
    };

    expect(createTSOverride(project)).toMatchSnapshot();
  });

  test('allows passing custom rules', () => {
    const rule = '@typescript-eslint/ban-types';
    const level = 'error';

    const project = {
      customRules: {
        [rule]: level,
      },
      react: {
        hasReact: true,
      },
      typescript: {
        hasTypeScript: true,
        version: '4.0.2',
      },
    };

    const override = createTSOverride({ ...project, customRules: {} });

    const result = createTSOverride(project);

    expect(result.rules[rule]).toBe(level);
    expect(result.rules[rule]).not.toBe(override.rules[rule]);

    expect(result).toMatchSnapshot();
  });
});
