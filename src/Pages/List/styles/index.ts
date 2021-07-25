import styled from '@emotion/styled'
import Row from '../../common-style/row'

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   height: 100vh;
`
export const Header = styled.header`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: space-between;
   height: 6rem;
   padding: 3.2rem;
`
export const HeaderLeft = styled(Row)``
export const Main = styled.main`
   margin: 2rem;
   height: calc(100vh - 6rem);
`