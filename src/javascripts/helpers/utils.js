const printToDom = (selector, text) => {
  $(selector).html(text);
};

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

export default { printToDom, firebaseArray };
