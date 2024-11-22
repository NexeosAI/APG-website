import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: "Sarah Thompson",
    date: "November 2024",
    rating: 5,
    comment: "Huge shout-out to this garage! Amazing service. Had a major coolant Leak on Thursday night, took my car in on Friday morning and I had to get back down South on Saturday! Got an update within the hour and had the car fixed within the day!! Life saver, thank you so much!!!"
  },
  {
    id: 2,
    name: "James Wilson",
    date: "November 2024",
    rating: 5,
    comment: "Took my car for an mot and service last week, everyone was extremely welcoming and nice. When I got the car I was told about all the work that has been done on it. Outstanding service will definitely be back :)"
  },
  {
    id: 3,
    name: "Emma MacDonald",
    date: "October 2024",
    rating: 5,
    comment: "First time customer and I'm impressed! They explained everything clearly and fixed my car's issues promptly. Great customer service."
  },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Customer Reviews
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Don't just take our word for it - hear what our customers have to say
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-[#ef1c25] opacity-20" />
              <div className="mb-4">
                <h3 className="font-semibold text-lg">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
              <div className="flex space-x-1 mb-4">
                {[...Array(review.rating)].map((_, index) => (
                  <Star
                    key={index}
                    className="w-5 h-5 fill-[#ef1c25] text-[#ef1c25]"
                  />
                ))}
              </div>
              <p className="text-gray-600 leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Reviews sourced from{' '}
            <a 
              href="https://www.fixter.co.uk/garage/ainslie-park-garage" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#ef1c25] hover:underline"
            >
              Fixter.co.uk
            </a>
          </p>
        </div>
      </div>
    </section>
  );
} 