/**
 * Output debug information to use console.log only when env is dev
 * @param {String} message
 */
module.exports = function (message) {
  if (this.env !== "dev") return;
  console.log(message);
};
