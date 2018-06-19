import initStoryshots, {
  snapshotWithOptions
} from '@storybook/addon-storyshots'

initStoryshots({
  test: snapshotWithOptions({
    createNodeMock: element =>
      element.type === 'input' && element.props.type === 'file'
        ? document.createElement('input')
        : null
  })
})
