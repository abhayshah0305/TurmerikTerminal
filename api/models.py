from pydantic import BaseModel

class FundingRequest(BaseModel):
    nctId: str
