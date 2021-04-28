import React from 'react'
import {Helmet} from 'react-helmet'

export const MetaData = (props) => {
    return (
      <Helmet>
          <title>{`${props.title}-Socio`}</title>
      </Helmet>
    )
}


export default MetaData;