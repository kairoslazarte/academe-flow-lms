export const SpinningWhiteCircleLoader = () => {
    return (
        <div className="flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
}

export const SpinningBlueCircleLoader = () => {
    return (
        <div className="d-flex align-items-center justify-content-center">
            <div className="spinner-border align-items-center text-center" role="status" style={{width: '2rem', height: '2rem', color: '#58BBFE'}}>
            <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export const SpinningDynamicCircleLoader = (props) => {
  return (
      <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border align-items-center text-center" role="status" style={{width: '2rem', height: '2rem', color: props.color}}>
          <span className="sr-only">Loading...</span>
          </div>
      </div>
  )
}