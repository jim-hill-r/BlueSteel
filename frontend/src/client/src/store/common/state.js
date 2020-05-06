export default {
  version: '1.1.0.7',
  patternsLoading: true,
  patterns: {},
  history: {},
  expression: '',
  consecutiveFails: 0,
  staleFails: 0,
  activeQueue: [],
  stableQueue: [],
  pendingQueue: [],
  level: '',
  sequence: {},
  user: {
    sequence: '',
    uploading: true,
    name: '',
    technique: 'Tracing'
  },
  retryLimit: 3,
  stabilizeCount: 3,
  reintroduceCount: 8
}
