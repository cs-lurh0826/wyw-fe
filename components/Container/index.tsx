import React from "react"
import style from './index.module.css'

const Container: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <div className={style.container}>
      <div className={style['inner-wrapper']}>
        {children}
      </div>
    </div>
  )
}

export default Container