import { createSelector } from 'reselect'

const getLotteries = (state, name) => state.lotteryList.lotteries.filter((item)=>item.name === name)

export const getLotteryDetails = createSelector([getLotteries],(list)=> list && list.length>0 && list[0]
)