const withContainer = (Component: React.ComponentType) => {
  return (props) => (
    <div className='mx-auto max-w-custom3 px-3.5'>
      <Component {...props} />
    </div>
  )
}

export default withContainer
