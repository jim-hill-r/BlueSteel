export default {
  version: '1.0.2.0',
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
    uploading: true,
    name: ''
  },
  retryLimit: 3,
  stabilizeCount: 3,
  reintroduceCount: 8
}
