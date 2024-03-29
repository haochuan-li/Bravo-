import React, { useCallback, useEffect } from 'react';
import useCodeMirror from './use-codemirror'
import './editor.css'

interface Props {
  initialDoc: string,
  onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialDoc } = props
  
  const handleChange = useCallback(
    state => onChange(state.doc.toString()),
    []
  )
  console.log(initialDoc)
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  })
  useEffect(() => {
    if (editorView) {
      // console.log(editorView)
    }
  }, [])
  // console.log(refContainer)
  return <div className="editor-wrapper" ref={refContainer}></div>
}

export default Editor
