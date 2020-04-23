export default {
  version: '2137',
  patternsLoading: true,
  patterns: {},
  history: {},
  letter: '',
  activeQueue: [],
  stableQueue: [],
  pendingQueue: [],
  sequence: {},
  user: {
    sequenceId: 'Standard',
    uploading: false,
    name: ''
  },
  retryLimit: 3,
  stabilizeCount: 3,
  reintroduceCount: 8
}
