
const IdeasDashboard = () => {
    const ideas = [
      {
        id: 1,
        ideaTitle: "Revolutionary E-Learning Platform",
        userName: "Alice Smith",
        timestamp: "2025-01-01",
        ideaDescription:
          "An interactive platform that personalizes learning paths based on AI.",
        currentStage: "Concept",
      },
      {
        id: 2,
        ideaTitle: "Eco-Friendly Packaging Solutions",
        userName: "John Doe",
        timestamp: "2025-01-02",
        ideaDescription:
          "Innovative packaging materials made from biodegradable resources.",
        currentStage: "Development",
      },
      {
        id: 3,
        ideaTitle: "Blockchain-based Voting System",
        userName: "Emma Johnson",
        timestamp: "2025-01-03",
        ideaDescription:
          "A secure and transparent voting system leveraging blockchain technology.",
        currentStage: "Prototype",
      },
      {
        id: 4,
        ideaTitle: "Smart Home Energy Optimizer",
        userName: "Chris Brown",
        timestamp: "2025-01-04",
        ideaDescription:
          "A system that optimizes energy consumption based on real-time usage patterns.",
        currentStage: "Testing",
      },
    ];
    return (
      <div className="flex flex-wrap flex-1 gap-2 ">
        {ideas.length > 0 &&
          ideas?.map((idea) => (
           
              <div key={idea.id} className="">
         
                {idea.ideaTitle}
                <span className="text-sm">  {idea.ideaTitle}</span>
   
                <span className="text-sm">{idea.userName}</span>
  
                <span className="text-sm">{idea.timestamp}</span>
                <span className="text-sm"> {idea.currentStage}</span>
          
     
          <p className="text-gray-600">{idea.ideaDescription}</p>
      
              </div>
           
          ))}
      </div>
    );
  };
  
  export default IdeasDashboard;
  
  
  