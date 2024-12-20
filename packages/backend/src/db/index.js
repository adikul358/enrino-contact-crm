import { drizzle } from 'drizzle-orm/node-postgres'
import { and, eq, ne } from 'drizzle-orm'
import { contactsTable } from './schema'
import isEqual from '../lib/isEqual'

const db = drizzle(process.env.DATABASE_URL)

// Comment out and run 'bun src/db/index.js' to upload sample 100 contacts
// async function main () {
//   const sample = [
//     {"firstName":"Veronika","lastName":"Kyngdon","email":"vkyngdon0@creativecommons.org","phone":"132-143-3704","company":"Topicstorm","jobTitle":"VP Quality Control"},
//     {"firstName":"Sharline","lastName":"Crouch","email":"scrouch1@pen.io","phone":"180-412-0081","company":"Zoombox","jobTitle":"Tax Accountant"},
//     {"firstName":"Marsha","lastName":"Conerding","email":"mconerding2@guardian.co.uk","phone":"250-524-4176","company":"Topicshots","jobTitle":"Senior Editor"},
//     {"firstName":"Marabel","lastName":"Jorgensen","email":"mjorgensen3@example.com","phone":"769-388-6703","company":"Izio","jobTitle":"Developer III"},
//     {"firstName":"Cristin","lastName":"Ancliffe","email":"cancliffe4@shinystat.com","phone":"969-809-0670","company":"Buzzdog","jobTitle":"Junior Executive"},
//     {"firstName":"Randolph","lastName":"Bescoby","email":"rbescoby5@wufoo.com","phone":"283-143-2966","company":"Jabberbean","jobTitle":"Media Manager III"},
//     {"firstName":"Dawna","lastName":"Rugiero","email":"drugiero6@histats.com","phone":"330-590-8536","company":"Browsetype","jobTitle":"Tax Accountant"},
//     {"firstName":"Emery","lastName":"Rown","email":"erown7@arizona.edu","phone":"578-514-0271","company":"Innojam","jobTitle":"Account Executive"},
//     {"firstName":"Gwenneth","lastName":"Kiddey","email":"gkiddey8@cdbaby.com","phone":"491-186-2380","company":"Flashdog","jobTitle":"Computer Systems Analyst II"},
//     {"firstName":"Alverta","lastName":"Bougen","email":"abougen9@edublogs.org","phone":"779-375-3460","company":"Kare","jobTitle":"Senior Sales Associate"},
//     {"firstName":"Ali","lastName":"Finlater","email":"afinlatera@auda.org.au","phone":"228-657-3065","company":"Meevee","jobTitle":"Environmental Tech"},
//     {"firstName":"Bram","lastName":"Pischoff","email":"bpischoffb@live.com","phone":"577-999-7601","company":"Zooveo","jobTitle":"Nurse Practicioner"},
//     {"firstName":"Hewitt","lastName":"Dornin","email":"hdorninc@msn.com","phone":"279-496-2965","company":"Edgeclub","jobTitle":"General Manager"},
//     {"firstName":"Urban","lastName":"Cholomin","email":"ucholomind@abc.net.au","phone":"620-624-5419","company":"Flashspan","jobTitle":"Occupational Therapist"},
//     {"firstName":"Nicolea","lastName":"Carefull","email":"ncarefulle@dailymail.co.uk","phone":"276-246-0411","company":"Meeveo","jobTitle":"Administrative Assistant II"},
//     {"firstName":"Saxon","lastName":"Thompson","email":"sthompsonf@bloglines.com","phone":"299-831-8320","company":"Mynte","jobTitle":"Civil Engineer"},
//     {"firstName":"Thacher","lastName":"Codman","email":"tcodmang@europa.eu","phone":"534-109-5149","company":"Mydo","jobTitle":"Nurse Practicioner"},
//     {"firstName":"Emily","lastName":"Blenkin","email":"eblenkinh@springer.com","phone":"335-923-7682","company":"Zoonoodle","jobTitle":"Payment Adjustment Coordinator"},
//     {"firstName":"Evvie","lastName":"Piatti","email":"epiattii@omniture.com","phone":"848-955-9392","company":"Feedmix","jobTitle":"Graphic Designer"},
//     {"firstName":"Melody","lastName":"Damant","email":"mdamantj@51.la","phone":"974-722-2691","company":"Thoughtbridge","jobTitle":"Professor"},
//     {"firstName":"Layla","lastName":"Skipworth","email":"lskipworthk@mail.ru","phone":"648-361-1470","company":"Leenti","jobTitle":"Chief Design Engineer"},
//     {"firstName":"Oswald","lastName":"McAw","email":"omcawl@npr.org","phone":"586-536-3708","company":"Thoughtsphere","jobTitle":"Web Developer II"},
//     {"firstName":"Micheil","lastName":"Mantrup","email":"mmantrupm@geocities.com","phone":"852-515-7608","company":"Jabbertype","jobTitle":"Compensation Analyst"},
//     {"firstName":"Thelma","lastName":"Spurdle","email":"tspurdlen@shutterfly.com","phone":"801-521-1338","company":"Fivebridge","jobTitle":"Occupational Therapist"},
//     {"firstName":"Bendite","lastName":"Ekins","email":"bekinso@youtu.be","phone":"753-443-9766","company":"Divape","jobTitle":"Data Coordinator"},
//     {"firstName":"Edd","lastName":"Bantick","email":"ebantickp@intel.com","phone":"450-190-2532","company":"Oyope","jobTitle":"Software Test Engineer III"},
//     {"firstName":"Arleen","lastName":"Brownhill","email":"abrownhillq@oakley.com","phone":"167-551-9946","company":"Talane","jobTitle":"Community Outreach Specialist"},
//     {"firstName":"Kristos","lastName":"Mewis","email":"kmewisr@pen.io","phone":"529-643-5537","company":"Camimbo","jobTitle":"Environmental Specialist"},
//     {"firstName":"Adorne","lastName":"Huerta","email":"ahuertas@baidu.com","phone":"176-217-2841","company":"Quamba","jobTitle":"Community Outreach Specialist"},
//     {"firstName":"Wendeline","lastName":"Guyan","email":"wguyant@booking.com","phone":"751-655-7146","company":"Youspan","jobTitle":"Web Developer II"},
//     {"firstName":"Oona","lastName":"Spedroni","email":"ospedroniu@canalblog.com","phone":"435-681-2738","company":"Riffpath","jobTitle":"Media Manager I"},
//     {"firstName":"Win","lastName":"Andric","email":"wandricv@geocities.jp","phone":"647-357-0959","company":"Wikizz","jobTitle":"VP Marketing"},
//     {"firstName":"Andriana","lastName":"Allot","email":"aallotw@paginegialle.it","phone":"544-928-1512","company":"Mynte","jobTitle":"Software Engineer III"},
//     {"firstName":"Ky","lastName":"De Maine","email":"kdemainex@nsw.gov.au","phone":"283-153-8618","company":"Agivu","jobTitle":"Senior Cost Accountant"},
//     {"firstName":"Barnebas","lastName":"Whitman","email":"bwhitmany@altervista.org","phone":"956-135-9593","company":"Skaboo","jobTitle":"GIS Technical Architect"},
//     {"firstName":"Gwyneth","lastName":"Harston","email":"gharstonz@networkadvertising.org","phone":"998-978-8408","company":"Zoomlounge","jobTitle":"Analog Circuit Design manager"},
//     {"firstName":"Adham","lastName":"Springer","email":"aspringer10@cbsnews.com","phone":"408-361-8514","company":"Chatterbridge","jobTitle":"Software Engineer IV"},
//     {"firstName":"Leta","lastName":"Guynemer","email":"lguynemer11@prnewswire.com","phone":"132-725-6167","company":"Mita","jobTitle":"Actuary"},
//     {"firstName":"Barton","lastName":"Fortun","email":"bfortun12@pbs.org","phone":"920-780-4437","company":"Rhycero","jobTitle":"VP Quality Control"},
//     {"firstName":"Griz","lastName":"Reck","email":"greck13@epa.gov","phone":"961-814-8722","company":"Oodoo","jobTitle":"Actuary"},
//     {"firstName":"Susy","lastName":"Fidock","email":"sfidock14@dyndns.org","phone":"317-707-0983","company":"Skajo","jobTitle":"Food Chemist"},
//     {"firstName":"Bernadina","lastName":"Keel","email":"bkeel15@uiuc.edu","phone":"408-840-7405","company":"Edgeify","jobTitle":"Design Engineer"},
//     {"firstName":"Ase","lastName":"Edmand","email":"aedmand16@bandcamp.com","phone":"775-511-5414","company":"Skippad","jobTitle":"Sales Representative"},
//     {"firstName":"Ward","lastName":"Pennick","email":"wpennick17@google.com.au","phone":"766-461-8142","company":"Ainyx","jobTitle":"Chemical Engineer"},
//     {"firstName":"Fenelia","lastName":"Amort","email":"famort18@e-recht24.de","phone":"375-448-0696","company":"Zoomzone","jobTitle":"Data Coordinator"},
//     {"firstName":"Gwen","lastName":"Kivell","email":"gkivell19@phpbb.com","phone":"518-495-4972","company":"Skyndu","jobTitle":"Account Coordinator"},
//     {"firstName":"Gar","lastName":"Fechnie","email":"gfechnie1a@google.com.hk","phone":"477-348-1029","company":"Tekfly","jobTitle":"Graphic Designer"},
//     {"firstName":"Dael","lastName":"Nield","email":"dnield1b@ucla.edu","phone":"306-740-7326","company":"Eabox","jobTitle":"Research Assistant II"},
//     {"firstName":"Sloane","lastName":"Perrycost","email":"sperrycost1c@xrea.com","phone":"322-296-8087","company":"Wordware","jobTitle":"Professor"},
//     {"firstName":"Sarge","lastName":"Sire","email":"ssire1d@sohu.com","phone":"657-864-3597","company":"Ooba","jobTitle":"Analog Circuit Design manager"},
//     {"firstName":"Hendrick","lastName":"Rivelon","email":"hrivelon1e@disqus.com","phone":"507-375-6848","company":"Mybuzz","jobTitle":"Web Designer IV"},
//     {"firstName":"Maura","lastName":"Matson","email":"mmatson1f@scribd.com","phone":"385-995-6464","company":"Twimm","jobTitle":"Librarian"},
//     {"firstName":"Jaquith","lastName":"Victoria","email":"jvictoria1g@utexas.edu","phone":"965-563-0113","company":"Thoughtmix","jobTitle":"Staff Accountant II"},
//     {"firstName":"Gare","lastName":"Bernholt","email":"gbernholt1h@homestead.com","phone":"199-720-9488","company":"Fadeo","jobTitle":"Environmental Specialist"},
//     {"firstName":"Tiertza","lastName":"Bearne","email":"tbearne1i@networkadvertising.org","phone":"487-251-8889","company":"Jatri","jobTitle":"Account Coordinator"},
//     {"firstName":"Obadiah","lastName":"Wainman","email":"owainman1j@ibm.com","phone":"316-524-8837","company":"Rhybox","jobTitle":"Safety Technician IV"},
//     {"firstName":"Serena","lastName":"Pont","email":"spont1k@china.com.cn","phone":"703-955-9200","company":"Wikizz","jobTitle":"Food Chemist"},
//     {"firstName":"Granger","lastName":"Lea","email":"glea1l@dailymotion.com","phone":"443-471-4973","company":"Photofeed","jobTitle":"Software Engineer III"},
//     {"firstName":"Dannie","lastName":"Emmens","email":"demmens1m@gizmodo.com","phone":"247-199-1488","company":"Bubbletube","jobTitle":"Nurse Practicioner"},
//     {"firstName":"Jasmin","lastName":"Laverack","email":"jlaverack1n@youku.com","phone":"735-286-4921","company":"Muxo","jobTitle":"Senior Financial Analyst"},
//     {"firstName":"Lind","lastName":"Wenden","email":"lwenden1o@sogou.com","phone":"279-925-7030","company":"Thoughtstorm","jobTitle":"Software Consultant"},
//     {"firstName":"Phedra","lastName":"Troman","email":"ptroman1p@quantcast.com","phone":"394-636-3391","company":"Buzzshare","jobTitle":"Tax Accountant"},
//     {"firstName":"Bernadina","lastName":"Gollin","email":"bgollin1q@github.io","phone":"377-327-9632","company":"Skinte","jobTitle":"Dental Hygienist"},
//     {"firstName":"Price","lastName":"Woolmore","email":"pwoolmore1r@ftc.gov","phone":"775-725-8963","company":"Tagchat","jobTitle":"Developer III"},
//     {"firstName":"Derwin","lastName":"Runcie","email":"druncie1s@nasa.gov","phone":"868-452-5802","company":"Leenti","jobTitle":"Systems Administrator II"},
//     {"firstName":"Sergio","lastName":"Tutchener","email":"stutchener1t@nationalgeographic.com","phone":"214-473-3765","company":"Zoombeat","jobTitle":"Recruiter"},
//     {"firstName":"Ruthie","lastName":"McNicol","email":"rmcnicol1u@myspace.com","phone":"101-361-2052","company":"Plajo","jobTitle":"Social Worker"},
//     {"firstName":"Norbie","lastName":"Chevin","email":"nchevin1v@usatoday.com","phone":"543-924-7168","company":"Tambee","jobTitle":"Account Representative I"},
//     {"firstName":"Paulette","lastName":"Jerrom","email":"pjerrom1w@facebook.com","phone":"387-620-6618","company":"Tagfeed","jobTitle":"Human Resources Manager"},
//     {"firstName":"Kittie","lastName":"Yglesias","email":"kyglesias1x@intel.com","phone":"919-711-9445","company":"Youopia","jobTitle":"Nurse"},
//     {"firstName":"Rheba","lastName":"Van Hault","email":"rvanhault1y@patch.com","phone":"208-442-6712","company":"Devpoint","jobTitle":"Physical Therapy Assistant"},
//     {"firstName":"Doralia","lastName":"Joust","email":"djoust1z@themeforest.net","phone":"260-556-9085","company":"Meejo","jobTitle":"VP Accounting"},
//     {"firstName":"Gayler","lastName":"Kaiser","email":"gkaiser20@cnbc.com","phone":"267-824-0165","company":"Mynte","jobTitle":"Data Coordinator"},
//     {"firstName":"Arvy","lastName":"Coldman","email":"acoldman21@nps.gov","phone":"124-286-0514","company":"Oyondu","jobTitle":"Web Developer I"},
//     {"firstName":"Tann","lastName":"Rowler","email":"trowler22@facebook.com","phone":"977-888-5907","company":"Blogpad","jobTitle":"Safety Technician I"},
//     {"firstName":"Patten","lastName":"Hustler","email":"phustler23@stumbleupon.com","phone":"776-582-9978","company":"Dabvine","jobTitle":"Health Coach II"},
//     {"firstName":"Galina","lastName":"Imesen","email":"gimesen24@dyndns.org","phone":"117-289-2068","company":"Twitterbridge","jobTitle":"Developer II"},
//     {"firstName":"Reilly","lastName":"Dominey","email":"rdominey25@amazon.co.uk","phone":"654-698-7223","company":"Youopia","jobTitle":"Business Systems Development Analyst"},
//     {"firstName":"Remus","lastName":"Mattingson","email":"rmattingson26@dailymotion.com","phone":"254-717-3952","company":"Jaloo","jobTitle":"Financial Analyst"},
//     {"firstName":"Gorden","lastName":"Truelock","email":"gtruelock27@mayoclinic.com","phone":"883-715-3844","company":"Twinder","jobTitle":"Registered Nurse"},
//     {"firstName":"Griz","lastName":"Pallaske","email":"gpallaske28@opensource.org","phone":"526-937-4338","company":"Meemm","jobTitle":"Business Systems Development Analyst"},
//     {"firstName":"Herrick","lastName":"Geroldi","email":"hgeroldi29@reverbnation.com","phone":"727-253-6827","company":"Jaxnation","jobTitle":"Community Outreach Specialist"},
//     {"firstName":"Nataniel","lastName":"Nettle","email":"nnettle2a@google.es","phone":"571-588-6868","company":"Eayo","jobTitle":"Statistician I"},
//     {"firstName":"Eirena","lastName":"Brosoli","email":"ebrosoli2b@cocolog-nifty.com","phone":"590-621-2227","company":"Dynazzy","jobTitle":"Safety Technician IV"},
//     {"firstName":"Rem","lastName":"Forgan","email":"rforgan2c@geocities.com","phone":"172-184-7515","company":"Thoughtbridge","jobTitle":"Automation Specialist III"},
//     {"firstName":"Merlina","lastName":"Mackison","email":"mmackison2d@nytimes.com","phone":"858-951-2288","company":"Voonte","jobTitle":"Actuary"},
//     {"firstName":"Peria","lastName":"Dunbavin","email":"pdunbavin2e@tripadvisor.com","phone":"535-679-1618","company":"LiveZ","jobTitle":"Staff Scientist"},
//     {"firstName":"Clare","lastName":"Loines","email":"cloines2f@japanpost.jp","phone":"369-521-7725","company":"Flashpoint","jobTitle":"Editor"},
//     {"firstName":"Janaye","lastName":"Glastonbury","email":"jglastonbury2g@kickstarter.com","phone":"850-336-6848","company":"Jaxworks","jobTitle":"Mechanical Systems Engineer"},
//     {"firstName":"Ethel","lastName":"McKenzie","email":"emckenzie2h@sbwire.com","phone":"730-719-8988","company":"Babblestorm","jobTitle":"Director of Sales"},
//     {"firstName":"Dmitri","lastName":"Pullan","email":"dpullan2i@discovery.com","phone":"971-732-8565","company":"Jaxnation","jobTitle":"Tax Accountant"},
//     {"firstName":"Meridel","lastName":"Ibanez","email":"mibanez2j@de.vu","phone":"402-408-4378","company":"Oozz","jobTitle":"Teacher"},
//     {"firstName":"Lucine","lastName":"Duesberry","email":"lduesberry2k@webs.com","phone":"972-647-3651","company":"Quatz","jobTitle":"Geological Engineer"},
//     {"firstName":"Mayer","lastName":"Feaks","email":"mfeaks2l@meetup.com","phone":"515-959-7762","company":"Gabcube","jobTitle":"Occupational Therapist"},
//     {"firstName":"Kendell","lastName":"Olliar","email":"kolliar2m@google.es","phone":"871-375-6171","company":"Demimbu","jobTitle":"Food Chemist"},
//     {"firstName":"Elana","lastName":"Kordes","email":"ekordes2n@cbsnews.com","phone":"242-785-4080","company":"Gabspot","jobTitle":"Account Executive"},
//     {"firstName":"Lisle","lastName":"Pagon","email":"lpagon2o@webeden.co.uk","phone":"501-178-3471","company":"Myworks","jobTitle":"Analyst Programmer"},
//     {"firstName":"Agustin","lastName":"Lanegran","email":"alanegran2p@hexun.com","phone":"724-382-9648","company":"Eidel","jobTitle":"Database Administrator I"},
//     {"firstName":"Barnebas","lastName":"Olechnowicz","email":"bolechnowicz2q@psu.edu","phone":"229-904-8091","company":"Feedfish","jobTitle":"Physical Therapy Assistant"},
//     {"firstName":"Wilek","lastName":"Wegner","email":"wwegner2r@ihg.com","phone":"311-972-2650","company":"Twitterbridge","jobTitle":"Senior Developer"}
//   ]

//   await db.insert(contactsTable).values(sample)
// }

// main()

export const selectContact = async (id) => {
  const contacts = await db.select()
    .from(contactsTable)
    .where(eq(contactsTable.id, id))
  return contacts
}

export const selectContacts = async () => {
  const contacts = await db.select()
    .from(contactsTable)
    .orderBy(contactsTable.firstName, contactsTable.lastName)
  return contacts
}

export const insertContact = async (contact) => {
  const returnId = await db.insert(contactsTable).values(contact).returning({ insertedId: contactsTable.id })
  return returnId
}

export const updateContact = async (id, contact) => {
  const res = await db.update(contactsTable)
    .set(contact)
    .where(eq(contactsTable.id, id))
    .returning()
  return res
}

export const deleteContact = async (id) => {
  const res = await db.delete(contactsTable)
    .where(eq(contactsTable.id, id))
    .returning()
  return res
}

export const checkDuplicate = async (contact) => {
  let filters
  if (contact.id) {
    filters = and(eq(contactsTable.email, contact.email), ne(contactsTable.id, contact.id))
  } else {
    filters = eq(contactsTable.email, contact.email)
  }
  const contacts = await db.select()
    .from(contactsTable)
    .where(filters)

  for (const v of contacts) {
    const { id, ...data } = v
    console.log({ data, check: isEqual(data, contact) })
    if (isEqual(data, contact)) {
      return true
    }
  }
  return false
}
