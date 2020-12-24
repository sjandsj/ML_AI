import _ from 'lodash';

export const marketDataUpdated = (markets, match) => {
  const marketNew = [];
  _.forIn(markets, (specifierList, marketID) => {
    const marketToCreate = { id: marketID };
    const firstSpecifierObj = _
      .chain(specifierList)
      .values()
      .first()
      .value();
    if (!_.isEmpty(firstSpecifierObj)) {
      marketToCreate.status = firstSpecifierObj.status;
      marketToCreate.name = firstSpecifierObj.name;
      marketToCreate.marketUID = firstSpecifierObj.uid;
    }
    marketToCreate.specifiers = [];
    _.forIn(specifierList, (specifierObj, specifierID) => {
      const specifierUpdate = { };
      specifierUpdate.specifierName = _.trim(specifierID, 'total=');
      specifierUpdate.outcomes = [];
      _.forIn(specifierObj.outcomes, (outcomeObj, outcomeID) => {
        const outcomeUpdated = _.assign({}, outcomeObj);
        outcomeUpdated.id = outcomeID;
        outcomeUpdated.marketID = marketID;
        outcomeUpdated.specifierName = specifierID;
        outcomeUpdated.marketName = specifierObj.name;
        specifierUpdate.outcomes.push(outcomeUpdated);
      });
      marketToCreate.specifiers.push(specifierUpdate);
    });
    marketNew.push(marketToCreate);
  });
  return marketNew;
};
