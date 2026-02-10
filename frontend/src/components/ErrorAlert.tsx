
interface Props {
  message: string
  onClose?: () => void
}

const ErrorAlert = ({ message, onClose }: Props) => {
  if (!message) return null

  return (
    <div className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <span>{message}</span>

      {onClose && (
        <button
          onClick={onClose}
          className="font-bold ml-4"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default ErrorAlert
