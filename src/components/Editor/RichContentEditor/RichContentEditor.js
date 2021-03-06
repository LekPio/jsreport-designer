import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ContentEditor from './ContentEditor'

class RichContentEditor extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isDirty: false
    }

    this.setEditorRef = this.setEditorRef.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  setEditorRef (el) {
    this.editor = el
  }

  handleSave () {
    const { propName, onSave } = this.props
    const { editor } = this

    if (onSave) {
      onSave({
        propName,
        html: editor.getContentRepresentation()
      })
    }
  }

  handleRemove () {
    const { propName, onRemove } = this.props

    if (onRemove) {
      onRemove({ propName, html: null })
    }
  }

  render () {
    const { isDirty } = this.state
    const { componentType, propName, initialContent, onClose } = this.props

    return (
      <div
        style={{
          position: 'fixed',
          top: '50px',
          left: '200px',
          zIndex: 100,
          color: '#000',
          backgroundColor: 'yellow',
          padding: '8px',
          width: '500px'
        }}
      >
        <h3 style={{ marginTop: '0.3rem', marginBottom: '0.3rem' }}>
          Rich Content Editor - {`${componentType} (property: ${propName}${isDirty ? '*' : ''})`}
        </h3>
        <br />
        <div style={{ fontSize: '0.7rem' }}>
          Edit the content using the editor bellow
        </div>
        <div style={{
          marginTop: '0.6rem',
          marginBottom: '0.6rem',
          overflow: 'auto'
        }}
        >
          <ContentEditor
            ref={this.setEditorRef}
            initialContent={initialContent}
          />
        </div>
        <br />
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.handleRemove}>Remove rich content</button>
        {' '}
        <button onClick={onClose}>Close</button>
      </div>
    )
  }
}

RichContentEditor.propTypes = {
  componentType: PropTypes.string.isRequired,
  propName: PropTypes.string.isRequired,
  initialContent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onSave: PropTypes.func,
  onRemove: PropTypes.func,
  onClose: PropTypes.func
}

export default RichContentEditor
