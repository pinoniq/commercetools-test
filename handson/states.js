const { apiRoot, projectKey } = require("./client.js");

module.exports.createNewState = (stateDraftData) => apiRoot.states()
.post({
  body: createStateDraft(stateDraftData)
})
    .execute();

const createStateDraft = (stateDraftData) => {
  const { key, type, name, initial } = stateDraftData;
  return {
    key,
    type,
    name,
    initial,
  };
};

module.exports.getStateByKey = (key) => apiRoot.states().withKey({key}).get().execute()

module.exports.getStateById = (ID) => apiRoot.states().withId({ID}).get().execute()

module.exports.addTransition = (stateId, transitionStateIds) =>
    this.getStateById(stateId).then(
        (state) => apiRoot.states().withId({ID: stateId}).post({
          body: {
            version: state.body.version,
            actions: [{
              action: 'setTransitions',
              transitions: transitionStateIds.map(id => ({
                  id,
              }))
            }],
          }
        }).execute()
    );
