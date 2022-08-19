Moralis.Cloud.define(
    "getProposals",
    async () => {
      const proposals = new Moralis.Query("Poposals");
      return await proposals.find({useMasterKey: true })
    }
  );