import styled from '@emotion/styled'

export default styled.div<{
   gap?:number
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  > * {
      margin-top: 0 !important;
      margin-bottom: 0 !important;
      margin-right: ${props => props.gap ? props.gap+'rem' : '0'};
  }
`