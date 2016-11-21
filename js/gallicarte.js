// Create a JSON object with basic information about a Gallica result
function resultInfos(title,address,gallicaURL) {
   var imageURL = gallicaURL+"/f1.lowres";
   var text = '{"title":"'+title.replace(/\"/g,"''")+'", "address":"'+address.replace(/\"/g,"''")+'", "gallicaURL":"'+gallicaURL.replace(/\"/g,"''")+'", "imageURL":"'+imageURL.replace(/\"/g,"''")+'"}';
   //console.log(text)
   var obj = JSON.parse(text);
   return obj;
}


// Parse the results returned in JSON by dataBNF in SPARQL
function parseResponse(jsonData) {
    if((jsonData.results.bindings).length>0){
      return true;
    } else {
      return false;
    }
}


// Parse the results returned in XML by the Gallica API
function getXmlFromGallica(xmlData) {     

   var nom=["Abbaye de Saint-Germain-des-Pres","Antony (Hauts-de-Seine)","Arc de triomphe de l'Etoile","Arc de triomphe du Carrousel","Arenes de Lutece","Asnieres-sur-Seine (Hauts-de-Seine)","Aubervilliers (Seine-Saint-Denis)","Auteuil (Seine)","Avenue des Champs-Elysees","Avenue des Champs-Élysées","Avenue des Gobelins","Avenue Elisée-Reclus","Avenue Montaigne","Avenue Montaigne","Bagnolet (Seine-Saint-Denis)","Barrière de la Villette","Barriere du Trone","Basilique du Sacre-Coeur","Basilique Sainte-Clotilde de Paris","Bassin de l'Arsenal","Bassin de la Villette","Bazar de l'Hotel de Ville","Belleville","Bercy","Bibliotheque Nationale Richelieu","Bibliotheque Sainte-Genevieve","Bobigny (Seine-Saint-Denis)","Bois de Boulogne","Bois de Vincennes","Boulevard de Clichy","Boulevard de La Villette","Boulevard de Port Royal","Boulevard Haussmann","Boulevard Jourdan","Boulevard Kellermann","Boulevard Saint-Germain","Boulevard Saint-Michel","Boulevard Sérurier","Boulogne-Billancourt (Hauts-de-Seine)","Canal Saint-Martin","Catacombes de Paris","Cathedrale de la Sainte-Trinite de Paris","Cathédrale Notre-Dame","Cathedrale Notre-Dame de Paris","Champ-de-Mars","Charenton-le-pont (Val-de-Marne)","Chateau d'Ecouen","Chateau de Fontainebleau","Chateau de Versailles","Chateau de Vincennes","Chatenay-Malabry (Hauts-de-Seine)","Cimetière de Charonne","Cimetiere de Montmartre","Cimetiere de Passy","Cimetiere du Montparnasse","Cimetiere du Pere-Lachaise","Cimetière du Père-Lachaise","Cirque d'hiver","Cité Doré","Cite internationale universitaire de Paris","Clamart (Hauts-de-Seine)","Clichy (Hauts-de-Seine)","College Stanislas","Colombes (Hauts-de-Seine)","Colonne de Juillet","Colonne Medicis","Colonne Vendome","Conciergerie","Cour de Rohan","Courbevoie (Hauts-de-Seine)","Creteil (Val-de-Marne)","Drancy (Seine-Saint-Denis)","Ecole militaire","Eglise de la Madeleine","Église Saint-Étienne du Mont","Eglise Saint-Etienne-du-Mont","Eglise Saint-Eustache","Église Saint-Germain de Charonne","Église Saint-Germain-des-Prés","Eglise Saint-Germain-l'Auxerrois","Eglise Saint-Louis-des-Invalides","Eglise Saint-Paul-Saint-Louis","Eglise Saint-Severin","Église Saint-Sulpice","Eglise Saint-Sulpice de Paris","Esplanade des Invalides","Folies Bergere","Fontaine de la rue de Montreuil","Fontaine des Innocents","Fontaine des Quatre-Saisons","Fontaine Medicis","Fontaine Saint-Sulpice","Fontenay-sous-bois","Fortifications","Galerie Colbert","Galerie Vivienne","Galeries Lafayette","Gare d'Austerlitz","Gare de Bercy","Gare de l'Est","Gare de Lyon","Gare Montparnasse","Gare Nord","Gare Saint-Lazare","Gennevilliers (Hauts-de-Seine)","Gentilly (Val-de-Marne)","Grand Palais","Halles centrales","Halles de Paris","Hippodrome d'Auteuil","Hippodrome de Longchamp","Hippodrome de Vincennes","Hôtel de Beauvais","Hôtel de Boisgelin","Hôtel de Braque","Hôtel de Cluny","Hôtel de Grancey","Hôtel de la Monnaie","Hôtel de La Vieuville","Hôtel de Liancourt","Hôtel de Narbonne","Hôtel de Richelieu","Hôtel de Rohan","Hôtel de Saint-Eustache","Hôtel de Saint-Fargeau","Hotel de Sens","Hôtel de Sens","Hotel de Soubise","Hôtel de Sully","Hotel de ville de Paris","Hotel des Invalides","Hotel des Invalides","Hotel Drouot","Hôtel du Châtelet","Hôtel du Grand-Veneur","Hôtel Fleury","Hôtel Gouthière","Hôtel Lambert","Hotel Matignon","Hôtel Montholon","Hôtel Salé","Hôtel Séguier","Hôtel-Dieu","Houilles (Yvelines)","Ile aux Cygnes","Ile de la Cite","Île de la Cité","Ile Saint-Louis","Impasse Fiacre","Institut de France","Issy-les-Moulineaux (Hauts-de-Seine)","Ivry sur Seine (Val-de-Marne)","Jardin d'acclimatation","Jardin des Halles","Jardin des plantes","Jardin des Tuileries","Jardin des Tuileries","Jardin des Tuileries","Jardin du Carrousel","Jardin du Luxembourg","Jardin du Luxembourg","Jardin du Palais-Royal","Jardins des Champs-Elysees","Joinville (Val-de-Marne)","La Courneuve (Seine-Saint-Denis)","La Defense (Hauts-de-Seine)","La Samaritaine","La Villette","Le Bon Marche","Le Bourget (Seine-Saint-Denis)","Le Lion de Belfort","Le Marais","Les Chevaux de Marly","Les Gobelins","Les Lilas (Seine-Saint-Denis)","Levallois-Perret (Hauts-de-Seine)","Lycee Chaptal","Lycee Condorcet","Lycee Henri-IV","Maison des Patriarches","Maisons-Alfort (Val-de-Marne)","Manufacture des Gobelins","Marche Saint-Germain","Meudon (Hauts-de-Seine)","Montreuil","Montreuil (Seine-Saint-Denis)","Montrouge (Hauts-de-Seine)","Moulin rouge","Neuilly-sur-Seine (Hauts-de-Seine)","Nogent-sur-Marne","Noisy-le-Sec (Seine-Saint-Denis)","Obelisque de Louxor","Observatoire de Paris","Opera Garnier","Palais Bourbon","Palais Brongniart","Palais de Chaillot","Palais de Chaillot","Palais de justice","Palais de l'Elysee","Palais de l'industrie","Palais de l'Institut","Palais des glaces","Palais du Louvre","Palais du Louvre","Palais du Luxembourg","Palais-Royal","Palais-Royal","Pantheon","Pantin (Seine-Saint-Denis)","Parc Andre-Citroen","Parc de Bagatelle","Parc de Bagatelle","Parc de Passy","Parc des Buttes-Chaumont","Parc floral","Parc Monceau","Parc Montsouris","Parc zoologique du Jardin des plantes","Passage Choiseul","Passage Choiseul","Passage de la Petite-Boucherie","Passage des Panoramas","Passage des Panoramas","Passage du Dragon","Passage du Grand-Cerf","Passage Jouffroy","Passage Sainte-Anne","Passy","Passy (Seine)","Pavillon de Hanovre","Petit Luxembourg","Petit Palais","Petite-Halle","Pigalle","Place Clichy","Place Dauphine","Place Dauphine","Place de la Bastille","Place de la Bastille","Place de la Concorde","Place de la Concorde","Place de la Nation","Place de la Republique","Place de Stalingrad","Place de Valois","Place des Victoires","Place des Vosges","Place des Vosges","Place du Marché-Sainte-Catherine","Place du Panthéon","Place du Tertre","Place Maubert","Place Pablo-Picasso","Place Pinel","Place Saint-André-des-Arts","Place Saint-Sulpice","Place Sainte-Opportune","Place Vendome","Pointe de la Cité","Pont Alexandre-III","Pont de Bir-Hakeim","Pont de la Concorde","Pont de Sully","Pont des Arts","Pont des Arts","Pont Marie","Pont Mirabeau","Pont Neuf","Pont Royal","Pont Royal","Pont-Neuf","Port de l'Hôtel-de-Ville","Port des Saints-Pères","Port du Louvre","Porte d'Italie","Porte d'Ivry","Porte Dauphine","Porte de Bercy","Porte de Montreuil","Porte de Versailles","Porte Maillot","Porte Saint-Denis","Poterne des Peupliers","Puteaux (Hauts-de-Seine)","Quai Anatole-France","Quai d'Anjou","Quai d'Orléans","Quai d'Orsay","Quai de Béthune","Quai de Bourbon","Quai de Conti","Quai de la Loire","Quai de la Mégisserie","Quai des Célestins","Quai des Grands-Augustins","Quai des Orfèvres","Quai du Louvre","Quai Malaquais","Quai Voltaire","Quartier de Javel","Quartier de la Butte aux cailles","Quartier latin","Romainville","Rosny-sous-Bois (Seine-Saint-Denis)","Rue Amelot","Rue Aubriot","Rue Beaubourg","Rue Beauregard","Rue Beethoven","Rue Berbier-du-Mets","Rue Berger","Rue Bonaparte","Rue Brisemiche","Rue Cambon","Rue Campagne-Première","Rue Cassette","Rue Censier","Rue Chabanais","Rue Chapon","Rue Charles-V","Rue Charlot","Rue Clovis","Rue Colbert","Rue d'Alexandrie","Rue d'Anjou","Rue Dante","Rue Daubenton","Rue de Bagnolet","Rue de Beaujolais","Rue de Belleville","Rue de Bièvre","Rue de Braque","Rue de Bretonvilliers","Rue de Chaillot","Rue de Charenton","Rue de Cléry","Rue de Grenelle","Rue de l'Abbaye","Rue de l'Arbalète","Rue de l'Arbre-Sec","Rue de l'Ave-Maria","Rue de l'Échaudé","Rue de l'Estrapade","Rue de l'Hôtel-Colbert","Rue de l'Hôtel-de-Ville","Rue de l'Université","Rue de la Bonne","Rue de la Bûcherie","Rue de la Chaise","Rue de la Corderie","Rue de la Grande-Truanderie","Rue de la Montagne-Sainte-Geneviève","Rue de la Paix","Rue de la Parcheminerie","Rue de la Verrerie","Rue de Lanneau","Rue de Lille","Rue de Montpensier","Rue de Moussy","Rue de Nevers","Rue de Penthièvre","Rue de Picpus","Rue de Rennes","Rue de Richelieu","Rue de Rivoli","Rue de Seine","Rue de Sévigné","Rue de Sèvres","Rue de Tournon","Rue de Turenne","Rue de Valois","Rue de Varenne","Rue de Vaugirard","Rue de Venise","Rue de Verneuil","Rue de Viarmes","Rue des Anglais","Rue des Archives","Rue des Barres","Rue des Bernardins","Rue des Blancs-Manteaux","Rue des Bons-Enfants","Rue des Bourdonnais","Rue des Coutures-Saint-Gervais","Rue des Déchargeurs","Rue des Francs-Bourgeois","Rue des Gravilliers","Rue des Haudriettes","Rue des Irlandais","Rue des Juges-Consuls","Rue des Lions","Rue des Lombards","Rue des Moulins","Rue des Panoramas","Rue des Petits-Champs","Rue des Prêtres-Saint-Séverin","Rue des Quatre-Fils","Rue des Rosiers","Rue des Saints-Pères","Rue des Saules","Rue Descartes","Rue Domat","Rue du Bac","Rue du Cardinal-Lemoine","Rue du Cherche-Midi","Rue du Chevalier-de-la-Barre","Rue du Cloître-Saint-Merri","Rue du Faubourg du Temple","Rue du Faubourg Saint-Honoré","Rue du Faubourg-Saint-Antoine","Rue du Faubourg-Saint-Honore","Rue du Four","Rue du Jour","Rue du Mont-Cenis","Rue du Montparnasse","Rue du Parc-Royal","Rue du Petit-Pont","Rue du Plat-d'Étain","Rue du Regard","Rue du Sentier","Rue du Temple","Rue Dupetit-Thouars","Rue Dussoubs","Rue Edmond-Gondinet","Rue Eginhard","Rue François-Miron","Rue Galande","Rue Garancière","Rue Geoffroy-L'Asnier","Rue Gît-le-Coeur","Rue Grenier-sur-l'Eau","Rue Guénégaud","Rue Haxo","Rue Lacépède","Rue Laffitte","Rue Lagrange","Rue Laplace","Rue Lhomond","Rue Mazarine","Rue Mazet","Rue Michel-le-Comte","Rue Molière","Rue Montmartre","Rue Montorgueil","Rue Mouffetard","Rue Norvins","Rue Pavée","Rue Pierre-Bullet","Rue Pierre-Lescot","Rue Pirouette","Rue Poissonnière","Rue Quincampoix","Rue Radziwill","Rue Saint-André-des-Arts","Rue Saint-Antoine","Rue Saint-Bernard","Rue Saint-Denis","Rue Saint-Dominique","Rue Saint-Gilles","Rue Saint-Honoré","Rue Saint-Jacques","Rue Saint-Julien-le-Pauvre","Rue Saint-Louis-en-l'Ile","Rue Saint-Martin","Rue Saint-Médard","Rue Saint-Paul","Rue Saint-Sauveur","Rue Saint-Séverin","Rue Saint-Vincent","Rue Sainte-Anne","Rue Sauval","Rue Séguier","Rue Servandoni","Rue Thérèse","Rue Thouin","Rue Tiquetonne","Rue Tournefort","Rue Valette","Rue Vieille-du-Temple","Rue Vivienne","Rue Volta","Saint-Cloud (Hauts-de-Seine)","Saint-Denis (Seine-Saint-Denis)","Saint-Mande (Seine-Saint-Denis)","Saint-Ouen (Seine-Saint-Denis)","Sainte-Chapelle","Sainte-Pélagie","Salle Pleyel","Sceaux (Hauts-de-Seine)","Sevre (Hauts-de-Seine)","Square Boucicaut","Square des Innocents","Square Louis XVI","Square Monge","Square Scipion","Square Trousseau","Statue de la Liberte","Temple de l'Oratoire du Louvre","Theatre de l'Odeon","Theatre de l'Opera-Comique","Theatre de la porte Saint-Martin","Theatre des Champs-Elysees","Thermes de Cluny","Tour Clovis","Tour Eiffel","Tour Jean-sans-Peur","Tour Saint-Jacques","Universite Sorbonne","Versailles (Yvelines)","Villa des Otages","Villejuif (Val-de-Marne)","Villeneuve-la-Garenne (Hauts-de-Seine)","Vincennes (Val-de-Marne)","Vitry sur Seine (Val-de-Marne)"];

   var lat=["48.853924","48.753888889","48.8738","48.861944","48.845","48.91075","48.9128368","48.8522349","48.8659329","48.870814","48.8333344","48.85822109999999","48.868978","48.86709399999999","48.8603","48.8889091","48.84815","48.88694","48.858333","48.8494","48.8857388","48.85745","48.873889","48.838541","48.833611","48.84694","48.9106","48.863472611","48.83","48.8839214","48.8768062","48.8380526","48.872102","48.8221569","48.8201702","48.8602984","48.84593599999999","48.87898939999999","48.8351979","48.8829075","48.83389","48.862","48.8527288","48.853056","48.856111","48.821389","49.0175","48.401944","48.8047944","48.84278","48.7652777778","48.860875","48.887777777778","48.8625","48.8379135","48.86194","48.84833039999999","48.8633194","48.876739","48.8185361","48.7957962","48.9044444444","48.845278","48.9236111111","48.853055555556","48.8625","48.867469","48.855807","48.8530254","48.8977777778","48.791111","48.9356","48.8525","48.87","48.846528","48.846528","48.863278","48.860181","48.860181","48.859444","48.86","48.8546","48.852077","48.8510095","48.850929","48.8612598","48.8742","48.8504","48.86065","48.8546806","48.84805556","48.850889","48.8516666667","48.855732","48.866447","48.8664191","48.8733","48.8416","48.839039","48.877552","48.8448","48.841157","48.881642","48.8763","48.9333","48.8133333333","48.8661611","48.8635584","48.8586927","48.85251","48.85875","48.824116","48.8486768","48.8541222","48.8612679","48.850585","48.8336243","48.8567544","48.8846749","48.8348391","48.8530803","48.8687614","48.8629133","48.8636035","48.87244430000001","48.853333333333","48.8536577","48.860555555556","48.8549928","48.856389","48.86","48.86","48.872861","48.8575","48.8590582","48.8845132","48.8200584","48.8890519","48.854444444444","48.8765308","48.859784","48.8534389","48.85467","48.9261","48.8531962","48.8547029","48.8544595","48.8516072","48.8703601","48.857284","48.8238888889","48.8078","48.8775","48.8625","48.843889","48.8634951","48.8634916","48.8634916","48.8620186","48.846944","48.8462217","48.864983","48.868907","48.82139","48.9322222222","48.8977777778","48.85917","48.893056","48.8511","48.9352777778","48.8344","48.8576","48.8621","48.8364","48.88","48.895","48.8813","48.874771","48.846025","48.8410318","48.8058333333","48.83472","48.85227","48.8028377","48.8603","48.8603","48.8172222222","48.884167","48.8880555556","48.8367","48.8894","48.8655","48.8364778","48.87194","48.86194","48.86917","48.862217","48.862217","48.855722","48.8701444","48.8714564","48.8575072","48.86917","48.8611","48.8604931","48.848333333333","48.864583333333","48.865221","48.846111111111","48.9356","48.841112","48.871389","48.8683467","48.8557918","48.88111","48.83861","48.879167","48.822222","48.8322","48.8680742","48.8685054","48.8536557","48.8714602","48.8708986","48.8532698","48.8647986","48.872105","48.8680834","48.857111","48.857111","48.766697","48.8536557","48.86611","48.890517","48.882277777778","48.88352","48.856539","48.8565422","48.8530918","48.85200769999999","48.8655","48.865716","48.84733","48.8675","48.883333","48.8632545","48.86575","48.85565","48.85561140000001","48.8555097","48.8467002","48.886539","48.850313","48.841944","48.83335169999999","48.8530387","48.85055639999999","48.85959649999999","48.867453","48.855732","48.863611","48.855556","48.863611","48.85","48.858333","48.85834240000001","48.85278049999999","48.846389","48.856667","48.860833","48.8602795","48.85705","48.8546983","48.85851","48.8638931","48.819067","48.821819","48.8727631","48.8284808","48.8530946","48.8318826","48.8799612","48.869722","48.820861","48.885","48.8611271","48.851915","48.8516293","48.8622302","48.8505823","48.853065","48.8571638","48.88574149999999","48.85786599999999","48.8523802","48.8548346","48.8554644","48.8587784","48.8581635","48.8586415","48.8411352","48.82777129999999","48.851416666667","48.8836","48.8731","48.8593847","48.8583477","48.8637367","48.8692982","48.858545","48.8346838","48.8615672","48.8491349","48.8597974","48.8674311","48.8397473","48.849596","48.8404323","48.8677052","48.8635191","48.852653","48.8642611","48.8461552","48.8682297","48.8681271","48.87497159999999","48.851057","48.8410603","48.8581302","48.8661215","48.872083","48.850668","48.8612679","48.8509253","48.86744969999999","48.8496323","48.8692439","48.8552171","48.8541567","48.8400751","48.8604192","48.8529303","48.8542695","48.8447971","48.851692","48.8546983","48.8603186","48.8880291","48.8521422","48.8531791","48.8651753","48.8626649","48.8486221","48.8695761","48.8517229","48.8579646","48.8483357","48.8597641","48.8650105","48.8579532","48.8559896","48.8728743","48.8416617","48.8505733","48.8687614","48.8659329","48.8539711","48.8569062","48.8496497","48.850942","48.8598519","48.863922","48.85464409999999","48.8463329","48.8612315","48.8579249","48.86278189999999","48.8506423","48.8629687","48.8553106","48.8496376","48.85924","48.8631747","48.8594938","48.8603676","48.8597646","48.85775870000001","48.8645031","48.86160659999999","48.8443154","48.8585989","48.7933279","48.85953250000001","48.8664022","48.87008220000001","48.866828","48.8523609","48.8606379","48.8562137","48.8528894","48.8891798","48.84637559999999","48.8508514","48.8547232","48.8453711","48.8476849","48.8873965","48.859052","48.872083","48.8715007","48.8524167","48.8634916","48.8526266","48.8636902","48.8920206","48.8436508","48.8583908","48.8528129","48.8597646","48.8485234","48.8695452","48.86156339999999","48.86516109999999","48.8665273","48.8308246","48.8540347","48.8557347","48.8520773","48.8503462","48.854886","48.8536894","48.8554279","48.8558956","48.8733525","48.8438007","48.8737498","48.8513276","48.84740129999999","48.8428297","48.8552766","48.8538203","48.8623982","48.8656099","48.8672923","48.8647712","48.8421312","48.8870132","48.8564465","48.87183659999999","48.8623611","48.7479157","48.869602","48.862203","48.8658822","48.8533878","48.8543548","48.8518785","48.8617404","48.8596766","48.8578695","48.8610198","48.8497786","48.8522697","48.8525857","48.8594841","48.8436281","48.8534482","48.8659718","48.8524673","48.8884951","48.8687512","48.8621357","48.8537469","48.84993780000001","48.8662093","48.8449952","48.8647364","48.8428457","48.84748990000001","48.85909830000001","48.8689069","48.8660711","48.843838","48.9268466","48.8603","48.912149","48.85528","48.842271","48.876994","48.7786","48.8238888889","48.8514148","48.8605143","48.8741268","48.8433705","48.838811","48.8515051","48.8458122","48.86167","48.849444","48.87096","48.869028","48.86584444","48.850833","48.845889","48.858333333333","48.8643","48.857763888889","48.848611","48.8039192","48.8743454","48.791906","48.9352954","48.8477777778","48.7875"];

   var lon=["2.334538","2.2975","2.295","2.332778","2.353","2.288933","2.3710324","2.2527981","2.3228543","2.3030644000000393","2.35463720000007","2.297961799999939","2.3079283","2.306197099999963","2.4431","2.3314586999999847","2.398735","2.34306","2.319167","2.3673","2.3749079000000393","2.353344444","2.385278","2.378599","2.375833","2.34583","2.4397","2.252197306","2.4333","2.3308845000000247","2.3711686000000327","2.3429108999999926","2.3373203","2.3300489000000653","2.3487301000000116","2.3190061","2.3404771000000437","2.4008019999999988","2.24094672","2.366484","2.33222","2.3011","2.350563500000021","2.349722","2.298333","2.411944","2.378333","2.698056","2.1203722","2.43583","2.27805555556","2.403471","2.3302777777778","2.28528","2.3254321","2.39417","2.3459307000000535","2.3674778","2.372525900000028","2.3373417","2.216784","2.30638888889","2.3275","2.25222222222","2.3691666666667","2.3429861111111","2.329414","2.3445725","2.339466600000037","2.25305555556","2.462778","2.3539","2.30361","2.324167","2.34806","2.34806","2.345056","2.4039209999999684","2.4039209999999684","2.341111","2.311944","2.361417","2.34565","2.3350090999999793","2.334302","2.3132653999999775","2.345","2.38311","2.3480111111111","2.325111","2.33916667","2.333444","2.47722222222","2.261818299999959","2.3389347","2.337365","2.33222","2.3661","2.383081","2.359156","2.3735","2.320474","2.35616","2.32388","2.3","2.34444444444","2.3125528","2.3272205000000667","2.3451122","2.2567","2.23278","2.450355","2.3463338999999905","2.3220300000000407","2.3561299000000417","2.3447188999999753","2.3305338999999776","2.3510470999999598","2.3397723000000497","2.324553299999934","2.325011600000039","2.3382252000000108","2.3353634000000056","2.3451619999999593","2.4067093999999543","2.3591666666667","2.358561399999985","2.3583333333333","2.3644153999999844","2.352222","2.311944","2.311944","2.340417","2.315833","2.3660959999999704","2.3540740999999343","2.351738599999976","2.345233099999973","2.3208333333333","2.344651800000065","2.362169999999992","2.341590799999949","2.34882","2.1892","2.2842157","2.337235","2.3476210000000037","2.3522999","2.34563049999997","2.336934","2.27","2.3747","2.263056","2.344722","2.359444","2.3253056","2.327494300000012","2.327494300000012","2.3320627","2.336944","2.3371604999999818","2.337749","2.312868","2.47278","2.39666666667","2.25305555556","2.34222","2.390833","2.324361111","2.42555555556","2.33245","2.361453","2.33577","2.35225","2.4169","2.287222","2.3199","2.327623","2.347871","2.3507111000000123","2.43777777778","2.3528","2.335217","2.1937555","2.4431","2.4431","2.32194444444","2.332222","2.26861111111","2.4825","2.4503","2.3211","2.336524278","2.33222","2.31861","2.34139","2.288247","2.288247","2.345051","2.3164861","2.3535518999999567","2.336821699999973","2.368252","2.33583","2.339629500000001","2.3375","2.3375277777778","2.3353643000000375","2.3458333333333","2.3539","2.274722","2.247222","2.2456770000000006","2.283427299999971","2.38306","2.4425","2.309167","2.338333","2.4186","2.3331785","2.3356913999999733","2.3356632999999647","2.3396105","2.341631199999938","2.3308670999999777","2.3471681","2.3398504","2.3355672999999797","2.2841361","2.2841361","2.290931999999998","2.3356632999999647","2.31444","2.3905990000000656","2.3373611111111","2.32739","2.342428","2.342508299999963","2.3695634","2.369574400000033","2.3211","2.3217756999999892","2.3957","2.36384","2.369444","2.3381577000000107","2.34119","2.3654917","2.3655266000000665","2.36287040000002","2.3463884000000235","2.340772","2.3487155000000257","2.329444","2.3613381999999774","2.3429982999999766","2.333672100000058","2.346932299999935","2.329508","2.4015633000000207","2.313611","2.287778","2.319444","2.358889","2.3375","2.3375083999999333","2.3573397000000114","2.276389","2.340833","2.330278","2.33002149999993","2.3413252000000284","2.3549441000000115","2.3337807999999995","2.342347600000039","2.360230999999999","2.3700209999999515","2.2727760000000217","2.3896819999999934","2.410812299999975","2.287211999999954","2.282246100000066","2.3525","2.3508699999999862","2.23888888889","2.3241844000000356","2.3586103000000094","2.3541526000000204","2.3046064000000115","2.3575180000000273","2.3551583999999366","2.3386880000000474","2.3755467999999382","2.344698200000039","2.3604176000000052","2.342150400000037","2.3428595000000314","2.3410546999999724","2.3344242000000577","2.332081199999948","2.2829459","2.3502315000000635","2.3431666666667","2.4361","2.4853","2.367977500000052","2.3568795999999566","2.3545149000000265","2.3497171999999864","2.2871924999999464","2.3511280999999826","2.3453660999999784","2.3327633000000105","2.351913100000047","2.3261953999999605","2.3325002999999924","2.330880900000011","2.3530700000000024","2.337054999999964","2.355735500000037","2.3633270000000266","2.363927399999966","2.3490944999999783","2.338195300000052","2.3506508000000395","2.322737800000027","2.3461580000000595","2.3525150000000394","2.40001970000003","2.3385713000000123","2.3747583","2.3503544000000147","2.3561299000000417","2.3590159000000313","2.297599900000023","2.3743067999999994","2.3500924999999597","2.3234721000000036","2.335008700000003","2.347939999999994","2.3423225999999886","2.3601032999999916","2.336307300000044","2.3466286999999966","2.34871499999997","2.3549441000000115","2.3206880000000183","2.343473700000004","2.34812850000003","2.3271462000000156","2.362992200000008","2.349597000000017","2.3484853999999586","2.3293382","2.3448111000000154","2.352994200000012","2.3466058000000203","2.325001400000019","2.336908200000039","2.3558427000000393","2.3398233000000346","2.315988000000061","2.399693999999954","2.330522999999971","2.3382252000000108","2.3228543","2.337057100000038","2.362826600000062","2.323319500000025","2.337140999999974","2.364370000000008","2.338168499999938","2.31691550000005","2.3250838999999814","2.3505883999999924","2.329288099999985","2.342303500000071","2.3475226000000475","2.359744800000044","2.355242500000031","2.350347499999998","2.3565320999999813","2.3384642999999414","2.3446735999999646","2.361579699999993","2.3460867999999664","2.3606029000000035","2.3536867000000257","2.357525799999962","2.346055299999989","2.3512256999999863","2.3727429000000484","2.3487801999999647","2.3348522000000003","2.341166899999962","2.336580599999934","2.345449099999996","2.359349400000042","2.3591196","2.329543400000034","2.3400111999999353","2.3490564999999606","2.3468798999999763","2.324477800000068","2.3502776999999924","2.3236495999999534","2.34411590000002","2.3514189999999644","2.3747583","2.314583500000026","2.3750522000000274","2.3253056","2.332816600000001","2.3446475000000646","2.3436414999999897","2.3269178000000466","2.363688899999943","2.346647399999938","2.3460867999999664","2.326781100000062","2.3460555999999997","2.354841399999941","2.3622632000000294","2.349274899999955","2.3479098999999906","2.361704400000008","2.3569007999999485","2.346565000000055","2.335819700000002","2.3565260000000308","2.3426116000000548","2.355354700000021","2.3388959000000114","2.4036532999999736","2.3523009000000457","2.3379208000000062","2.3479992999999695","2.347178699999972","2.3470744999999624","2.3377523999999994","2.3391286999999465","2.355502900000033","2.336651800000027","2.344016199999942","2.3467957999999953","2.349826099999973","2.3393912999999884","2.360836000000063","2.358330600000045","2.348450200000002","2.3489613000000418","2.347839600000043","2.3509014999999636","2.3395414999999957","2.340899000000036","2.3629763999999795","2.3816822","2.348779199999967","2.3091366999999536","2.3664146999999502","2.3440693999999667","2.3450944999999592","2.346986300000026","2.3542346000000407","2.350473700000066","2.3504195000000436","2.3616594999999734","2.3489862999999787","2.3450972000000547","2.3407781999999315","2.336409900000035","2.3425953999999365","2.3417899999999463","2.3347444999999425","2.3355605000000423","2.349178400000028","2.34780980000005","2.348203699999999","2.346800499999972","2.358903899999973","2.3400877000000264","2.3577258000000256","2.219082","2.3308997","2.4431","2.334251","2.345","2.354022","2.301036","2.2906","2.21166666667","2.325626199999988","2.3474886999999853","2.322921199999996","2.3524245999999494","2.3538161000000173","2.3787737000000106","2.3291442","2.34","2.338611","2.3377","2.356667","2.3029","2.343333","2.347833","2.2944444444444","2.34806","2.3487777777778","2.342778","2.084159","2.4021229999999605","2.363584","2.3053678","2.43916666667","2.39277777778"];

   var departement = ["Ain","Aisne","Allier","Alpes-de-Haute-Provence","Basses-Alpes","Hautes-Alpes","Alpes-Maritimes","Ardèche","Ardennes","Ariège","Aube","Aude","Aveyron","Bouches-du-Rhône","Calvados","Cantal","Charente","Charente-maritime","Cher","Corrèze","Corse","Haute Corse","Côte d'Or","Côtes d'Armor","Creuse","Dordogne","Doubs","Drôme","Eure","Eure","Finistère","Gard","Haute-Garonne","Gers","Gironde","Hérault","Ille-et-Vilaine","Indre","Indre-et-Loire","Isère","Jura","Landes","Loir-et-Cher","Loire","Haute-Loire","Loire","Loiret","Lot","Lot-et-Garonne","Lozère","Maine-et-Loire","Manche","Marne","Haute-Marne","Mayenne","Meurthe","Meuse","Morbihan","Moselle","Nièvre","Nord","Oise","Orne","Pas","Puy","Pyrénées-Atlantiques","Hautes-Pyrénées","Pyrénées-Orientales","Bas-Rhin","Haut-Rhin","Rhône","Haute-Saône","Saône-et-Loire","Sarthe","Savoie","Haute-Savoie","Paris","Seine","Seine","Yvelines","Deux-Sèvres","Somme","Tarn","Tarn-et-Garonne","Var","Vaucluse","Vendée","Vienne","Haute-Vienne","Vosges","Yonne","Territoire-de-Belfort","Essonne","Hauts-de-Seine","Seine-Saint-Denis","Val-de-Marne","Val-d'Oise","Guadeloupe","Martinique","Guyane","La-Réunion","Mayotte"];

    //Transforms the results in XML into a string
    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    
    // transforms the HTML tags by removing the : character to make them selectable by jQuery
    xmlString = xmlString.replace(/dc:subject/g,"dcsubject");
    xmlString = xmlString.replace(/dc:title/g,"dctitle");
    xmlString = xmlString.replace(/dc:identifier/g,"dcidentifier");
    xmlString = xmlString.replace(/srw:record/g,"srwrecord");
    xmlString = xmlString.replace(/srw:numberOfRecords/g,"srwnumberOfRecords");
    
    // transforms the XML string into an XML object
    var xmlDoc = $.parseXML(xmlString),
    $xml = $(xmlDoc),
    $title = $xml.find( "link" );
    //console.log(xmlData);
    //console.log(xmlDoc);
    //console.log("\n");
    //console.log($title.html());
    
    // stores the XML string into a hidden DIV
    $("#results").html(xmlString);
    
    // updates the number of results and the start record into hidden DIVs
    if(parseInt($("#startRecord").html())==1){
       $("#resultNumber").html(parseInt($("srwnumberOfRecords").html())-50);
    }else{
       $("#resultNumber").html(parseInt($("#resultNumber").html())-50);
    }
    $("#startRecord").html(parseInt($("#startRecord").html())+50);
    //console.log($("#resultNumber").html());
    
    //For each result:
    $("srwrecord").each(function(i){
       //alert(i);
       //console.log("i"+$(this).html());
       var title=""
       title=$(this).find("dctitle").html();
       var gallicaURL=$(this).find("dcidentifier").html();
       

       //For each dcsubject in this result
       $(this).find("dcsubject").each(function(i){
       
          console.log("getScript");
          //Check with dataBNF using SPARQL if the subject is a location
          var foundLocation = $.getScript("http://data.bnf.fr/sparql?default-graph-uri=&query=PREFIX+dcterms%3A+%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%3E%0D%0APREFIX+skos%3A+%3Chttp%3A%2F%2Fwww.w3.org%2F2004%2F02%2Fskos%2Fcore%23%3E%0D%0ASELECT+DISTINCT+*+%0D%0AWHERE+%7B%0D%0A++%3Fsujet+%3Fprop+%22"+(($(this).html()).replace("\"","%22").replace(" ","%20"))+"%22%40fr.%0D%0A++%3Fsujet+dcterms%3AisPartOf+%3Chttp%3A%2F%2Fdata.bnf.fr%2Fvocabulary%2Fscheme%2Fr167%3E.%0D%0A+%23+%3Chttp%3A%2F%2Fdata.bnf.fr%2Fark%3A%2F12148%2Fcb16275204x%3E+%3Fa+%3Fb.%0D%0A%7D%0D%0ALIMIT+1000&format=application%2Fsparql-results%2Bjson&timeout=0&should-sponge=&debug=on&callback=parseResponse",function(){console.log($(this).html())});
          //console.log($(this).html());

          var possibleLocation=$(this).html();
          //console.log("subject"+possibleLocation)
          
          //Check if there is a "département" between brackets:
          var openingP = possibleLocation.indexOf("(");
          var closingP = possibleLocation.indexOf(")");
          if (openingP>-1 && closingP>-1){
             var possibleDepartment=possibleLocation.substring(openingP+1,closingP)
             if(departement.indexOf(possibleDepartment)>-1){
                //Found a "département"!
                console.log(possibleDepartment);
             }             
          }
                    
          var res = possibleLocation.split("--");
          
          // if we find "--" in the subject, it may be a location
          if(res.length>1){
             possibleCountry=res[0].substring(res[0].length-9);
             res[1]=res[1].substring(1,res[1].length);
             //console.log(possibleCountry)
             
             // if we find "(France)" in the subject before "--", it is a location
             if(possibleCountry=="(France) "){
                //console.log("AAAA"+res[1])
                var latitude=0;
                var longitude=0;
                var indexOfAddress=nom.indexOf(res[1]);
                //console.log(indexOfAddress+"-"+res[1]+"|");
                if (indexOfAddress>-1){
                   latitude=lat[indexOfAddress]
                   longitude=lon[indexOfAddress]
                }
                                
                //$("#allResults").append("<li><a href=\""+gallicaURL+"\"><img title=\""+title+"\" src=\""+gallicaURL+"/f1.lowres\" height=\"100px\"></a> : "+res[1]+" <small>("+latitude+", "+longitude+")</small></li>")
                //console.log($(this).find("dcidentifier").html())
                var obj=resultInfos(title,res[1]+", "+res[0],gallicaURL)
                
                if(indexOfAddress>-1){
                   //console.log(title+" : "+parseInt(latitude)+" "+parseInt(longitude))
                   var marker=L.marker([parseFloat(latitude), parseFloat(longitude)]);
                   markersLayer.addLayer(marker);
                   marker.addTo(map)
                   .bindPopup("<a href=\""+gallicaURL+"\"><img title=\""+title+"\" src=\""+gallicaURL+"/f1.lowres\" height=\"100px\"></a><br/>"+res[1]+" <small>("+latitude+", "+longitude+")</small>");                                   
                //.openPopup();
                }
             }
          }
       })
    })
    
    //console.log(parseInt($("#startRecord").html()))
    
    // If there are still some results left to analyze, we start a new query
    if(parseInt($("#resultNumber").html())>0){
       var query = createQuery();
       // Queries the Gallica API to get the results in XML format
       jQuery.ajax({
       type: "GET",
       //url: "./getData.php?q=(dc.creator%20all%20%22Atget,%20Eugène%22%20or%20dc.contributor%20all%20%22Atget,%20Eugène%22%20)",
       url: "./getData.php?q="+query+"&startRecord="+parseInt($("#startRecord").html()),
       dataType: "xml",
       success: getXmlFromGallica
       });
    }
    
    
}


// Create the query using the fields in the form
function createQuery() {
  var query="", element="";
  if(($(":text[name='all']").val()).length>0){
    query=addElementToQuery("gallica%20all%20%22"+$(":text[name='all']").val()+"%22",query)
  }
  if(($(":text[name='author']").val()).length>0){
    query=addElementToQuery("(dc.creator%20all%20%22"+$(":text[name='author']").val()+"%22%20or%20dc.contributor%20all%20%22"+$(":text[name='author']").val()+"%22%20)",query)
  }
  if(($(":text[name='title']").val()).length>0){
    query=addElementToQuery("dc.title%20all%20%22"+$(":text[name='title']").val()+"%22",query)
  }
  if(($(":text[name='text']").val()).length>0){
    query=addElementToQuery("text%20all%20%22"+$(":text[name='text']").val()+"%22",query)
  }
  if(($(":text[name='toc']").val()).length>0){
    query=addElementToQuery("toc%20all%20%22"+$(":text[name='toc']").val()+"%22",query)
  }
  if(($(":text[name='subject']").val()).length>0){
    query=addElementToQuery("dc.subject%20all%20%22"+$(":text[name='subject']").val()+"%22",query)
  }
  if(($(":text[name='beginYear']").val()).length>0){
    query=addElementToQuery("gallicapublication_date>=%22"+$(":text[name='beginYear']").val()+"/01/01%22",query)
  }
  if(($(":text[name='endYear']").val()).length>0){
    query=addElementToQuery("gallicapublication_date<=%22"+$(":text[name='endYear']").val()+"/12/31%22",query)
  }
  if(($(":text[name='publisher']").val()).length>0){
    query=addElementToQuery("dc.publisher%20all%20%22"+$(":text[name='publisher']").val()+"%22",query)
  }
  if(($(":text[name='isbn']").val()).length>0){
    query=addElementToQuery("ISBN%20all%20%22"+$(":text[name='isbn']").val()+"%22",query)
  }
  if(($("select[name='collection']").val()).length>0){
    query=addElementToQuery("colnum%20adj%20%22Appartient%20à%20l%27ensemble%20documentaire%20:%20"+$("select[name='collection']").val()+"%22",query)
  }
  
  //console.log(query);
  return query;
}


// Adds an element to a query
function addElementToQuery(element,query) {
  if(query.length>0){
     query=query+"%20and%20("+element+")";
  } else {
     query="("+element+")";
  }
  return query;
}


$(document).ready(function(){
  $("#advanced").show();
  $("#advancedFields").hide();
  $("#advanced").on("click",function(){
     $("#advancedFields").css("height","0px");
     $("#advancedFields").show();
     $("#advanced").hide();
     $("#noteAtget").hide();
     $("#advancedFields").animate({height:"100%"},500);     
  });
  
  //Hide or show the map when the user clicks on the border above it
  $("#mapClickContainer").on("click",function(){
     //Try to reinitialize the map here (but it does not work)
     markersLayer.clearLayers();

     if(parseInt($("#mapContainer").css("height"))==320){
        $("#mapContainer").animate({height:"20px"},500);
        $("#mapUpperBorder").prop("src","./visuels/map_show.png")
     } else {
        $("#mapContainer").animate({height:"320px"},500);
        $("#mapUpperBorder").prop("src","./visuels/map_hide.png")
     }
  })
  
  markersLayer = new L.LayerGroup(); 
  map = L.map('map').setView([48.84, 2.34], 5);
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map); 

  $("#map").hide();
  $("#mapContainer").hide();
  $("#foundLocations").hide();
  $("#results").hide();
  $("#resultNumber").hide();
  $("#startRecord").hide();
  
  // Adds an event for any click on the submit button of the form
  $("#submitGallica").on("click",function(e){
    e.preventDefault();
    
    $("#map").show();
    $("#mapContainer").show();
    
    var query = createQuery();
    // Queries the Gallica API to get the results in XML format
    jQuery.ajax({
    type: "GET",
    //url: "./getData.php?q=(dc.creator%20all%20%22Atget,%20Eugène%22%20or%20dc.contributor%20all%20%22Atget,%20Eugène%22%20)",
    url: "./getData.php?q="+query+"&startRecord=1",
    dataType: "xml",
    success: getXmlFromGallica
    });
    
  })

})
