// const mongoose = require('mongoose');

// const pdfSchema = new mongoose.Schema({
//   title: String,
//   link: String,
//   isPaid: Boolean
// });

// module.exports = mongoose.model('PDF', pdfSchema);


const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  name: { type: String, required: true },
  free: [
    {
      title: String,
      url: String,
    },
  ],
  premium: [
    {
      title: String,
      url: String,
      price: Number,
    },
  ],
});

module.exports = mongoose.model('Pdfs', pdfSchema);

