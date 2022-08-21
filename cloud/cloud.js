Moralis.Cloud.define(
    "getProposals",
    async () => {
      const proposals = new Moralis.Query("Proposals");
      return await proposals.find({useMasterKey: true })
    }
  );

  Moralis.Cloud.define("findRecord", async function (request) {
    const query = new Moralis.Query("ProposalData");
    query.equalTo("ProposalId", request.params.proposalId);
    return await query.find();    
       
  });