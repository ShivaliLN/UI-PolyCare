Moralis.Cloud.define(
    "getProposals",
    async () => {
      const commentsQuery = new Moralis.Query("Poposals");
      return await commentsQuery.find(); 
    }
  );