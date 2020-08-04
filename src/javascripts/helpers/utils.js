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

const showFlashMessage = (messageType, messageBody) => {
  const domString = `<div class="alert alert-${messageType} alert-dismissible fade show" role="alert">
            <h4 class="text-center"> ${messageBody}</h4>
            </div>`;
  document.getElementById('message').innerHTML = domString;
  setTimeout(() => {
    document.getElementById('message').innerHTML = '';
  }, 4000);
};

export default { printToDom, firebaseArray, showFlashMessage };
