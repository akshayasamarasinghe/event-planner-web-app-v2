const EventPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
              <main className="w-3/4 p-4">
          <h1 className="text-2xl font-bold mb-4">Our Collection Of Events</h1>
          <p className="text-gray-600 mb-4">Showing 1-9 of 20 events</p>
          
          <div className="grid grid-cols-3 gap-6">
            {Array(9).fill("Event").map((item, index) => (
              <div key={index} className="bg-white p-4 shadow-md rounded-md">
                <div className="bg-gray-300 h-40 mb-2"></div>
                <p className="text-gray-700">Double Bed & Side Tables</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <button className="bg-black text-white px-6 py-2 rounded-md">Load More</button>
          </div>
        </main>
      </div>
  );
};

export default EventPage;