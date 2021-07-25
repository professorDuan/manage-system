import styled from '@emotion/styled'
import { Card,Button } from 'antd'
import logo from '../../assets/logo.svg'
import left from '../../assets/left.svg'
import right from '../../assets/right.svg'

export const Container = styled.div`
   display:flex;
   flex-direction:column;
   align-items:center;
   min-height:100vh;
`

export const Title = styled.h2`
   margin-bottom: 2.4rem;
   color: rgb(94,108,132);
`

export const Header = styled.div`
   background:url(${logo}) no-repeat center;
   padding: 5rem 0;
   background-size: 8rem;
   width: 100%;
`

export const ShadowCard = styled(Card)`
   width: 40rem;
   text-align: center;
   min-height: 56rem;
   padding: 3.2rem 4rem;
   border-radius: 0.3rem;
   box-sizing: border-box;
   box-shadow: rgba(0,0,0,.1) 0 0 10px;
`

export const BackGround = styled.div`
   position: absolute;
   width: 100%;
   height: 100%;
   background-repeat: no-repeat;
   background-attachment: fixed;
   background-position: left bottom,right bottom;
   background-size: calc(((100vw-40rem)/2)-3.2rem), calc(((100vw-40rem)/2)-3.2rem), cover;
   background: url(${left}), url(${right});
`

export const LongBtn = styled(Button)`
   width: 100%;
`