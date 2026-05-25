// Raanana Municipality external ticketing system.
//
// We do not process payments ourselves — concerts link out to the municipal
// system, which handles checkout (via Pelecard) end to end. Each concert
// carries its own deep link in Sanity (`ticketUrl`, set by an admin to the
// exact municipal concert page). The board URL below is the catalog-wide
// entry point used only by the /tickets page (and as mock-data stand-in),
// NOT as a per-concert fallback.
export const MUNICIPALITY_TICKETS_URL =
  "https://tickets.raanana.muni.il/%D7%9C%D7%95%D7%97_%D7%9E%D7%95%D7%A4%D7%A2%D7%99%D7%9D";

export const MUNICIPALITY_TICKETS_LABEL = "מערכת הכרטיסים של עיריית רעננה";
