const states = require("./handson/states");
const { log } = require("./logger.js");

const orderPackedStateDraft = {
  key: "jm-order-packed3",
  type: "OrderState",
  name: {
    "de": "JM Order Packed ",
    "en": "JM Order Packed ",
  },
  initial: true,
};

const orderCompletedStateDraft = {
  key: "jm-order-completed3",
  type: "OrderState",
  name: {
    "de": "JM Order Completed ",
    "en": "JM Order Completed ",
  },
  initial: false,
};

const createStatesWithTransitions = async () => {
  // let orderPackedState = await states.createNewState(orderPackedStateDraft) // d293d1b0-c6ae-4110-94dd-45bca69dbc7e
  // let orderCompletedState = await states.createNewState(orderCompletedStateDraft) // 4687e6e1-f94d-456d-92a7-d35199a1241f
  let orderPackedState;
  let orderCompletedState

  orderPackedState = states.addTransition("d293d1b0-c6ae-4110-94dd-45bca69dbc7e", ["4687e6e1-f94d-456d-92a7-d35199a1241f"])

  orderCompletedState = states.addTransition("4687e6e1-f94d-456d-92a7-d35199a1241f", [])

  return orderPackedState;
};

createStatesWithTransitions().then(log).catch(log)

//states.getStateByKey(orderPackedStateDraft.key).then(log).catch(log)
