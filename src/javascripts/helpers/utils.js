const firebaseArray = (data) => {
  const collectionOfObjs = data;
  const arrayCollection = [];

  if (collectionOfObjs) {
    Object.keys(collectionOfObjs).forEach((itemId) => {
      collectionOfObjs[itemId].id = itemId;
      arrayCollection.push(collectionOfObjs[itemId]);
    });
  }

  return arrayCollection;
};

export default { firebaseArray };
