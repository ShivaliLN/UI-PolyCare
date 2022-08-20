Moralis.Cloud.define(
    "getProposals",
    async () => {
      const proposals = new Moralis.Query("Proposals");
      return await proposals.find({useMasterKey: true })
    }
  );