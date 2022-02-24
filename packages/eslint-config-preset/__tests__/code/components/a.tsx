import React from 'react'

import type { SomeEnum } from '../enum'

interface AaProps {
  e: SomeEnum
}

const Aa: React.FC<AaProps> = () => {
  return <p>Aa</p>
}

export default Aa
