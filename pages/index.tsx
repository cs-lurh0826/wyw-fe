import type { NextPage } from 'next'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import Container from '../components/Container'
import Classification from '../components/Classification'
import Selection from '../components/Selection'
import Augmentation from '../components/Augmentation'
import style from '../styles/Home.module.css'
import 'antd/dist/antd.css'

// Create a client
const queryClient = new QueryClient()

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={style['bgimg-1']}>
        <div className={style['caption']}>
          <span className={style['border']}>Classification | Selection | Augmentation</span>
        </div>
      </div>

      <Container>
        <Classification />
      </Container>
       
      <div className={style['bgimg-2']}>
        <div className={style['caption']} />
      </div>

      <Container>
        <Selection />
      </Container>
       

      <div className={style['bgimg-3']}>
        <div className={style['caption']} />
      </div>

      <Container>
        <Augmentation />
      </Container>
       

      <div className={style['bgimg-1']}>
        <div className={style['caption']}>
          <span className={style['border']}>E N D</span>
        </div>
      </div>
  </QueryClientProvider>
  )
}

export default Home
