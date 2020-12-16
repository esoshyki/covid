import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

export default function Error ({type, message, callback, callbackDescription}) {

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>{type}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={callback}>{callbackDescription}</Button>
      </Modal.Footer>

    </Modal.Dialog>
  )
}