export default {
  version: '1.1.0.2',
  patternsLoading: true,
  patterns: {},
  history: {},
  letter: '',
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
