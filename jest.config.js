export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: 'src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest'
    },
    collectCoverageFrom: ['**/*.(t|j)s'],
    moduleNameMapper: {
        '@domain/(.*)$': '<rootDir>/domain/$1',
        '@application/(.*)$': '<rootDir>/application/$1',
        '@infrastructure/(.*)$': '<rootDir>/infrastructure/$1',
        '@presentation/(.*)$': '<rootDir>/presentation/$1',
        '@shared/(.*)$': '<rootDir>/shared/$1'
    },
    coverageDirectory: '../coverage'
};
