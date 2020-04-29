export default {
  version: '1.1.0.2',
  patternsLoading: true,
  patterns: {},
  history: {},
  letter: '',
  consecutiveFails: 0,
  staleFails: 0,
  activeQueue: [],
  stableQueue: [],
  pendingQueue: [],
  level: '',
  sequence: {},
  user: {
    sequenceId: '',
    uploading: true,
    name: ''
  },
  retryLimit: 3,
  stabilizeCount: 3,
  reintroduceCount: 8
}
