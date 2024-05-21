import React, { useState } from "react";
import styles from "./Dashboard.module.scss";

import { Divider, Input, Button } from 'antd';
const { TextArea } = Input;

import Send from '../../assets/send.svg'


const index = () => {
	const [value, setValue] = useState('');

	return (
		<div className={styles.DashboardBgMain}>
			<div className={styles.DashboardChatMain}>
				<div className={styles.DashboardSidebar}>
					<div className={styles.SidebarGroups}>
						{/* group 1 */}
						{/* group 2 */}
						Listed Groups
					</div>
					
					{/* <Divider style={{width: '100%', margin: '0px'}}/> */}

					<div className={styles.SidebarOptions}>
						<Button type="primary" block>
							Create
						</Button>
						<Button type="primary" block>
							Join
						</Button>
					</div>
				</div>
				
				<Divider type="vertical" style={{height: '100%', margin: '0px'}}/>
				
				<div className={styles.DashboardMainPage}>
					
					<div className={styles.MainPageHeading}>
						<p className={styles.GroupName}>Test Group</p>
						<p className={styles.GroupParticipantName}>Test, Test, Test</p>
					</div>

					<Divider style={{width: '100%', margin: '0px'}}/>
					
					<div className={styles.MainPageContent}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque necessitatibus alias expedita sunt vel maxime, aliquid mollitia hic aliquam molestias, dolore impedit. Exercitationem eos similique eum tenetur ad consectetur veritatis natus. Tempora mollitia quasi, dolor incidunt soluta impedit officia. Voluptatibus ducimus quisquam nobis fuga totam sunt quaerat, eveniet aspernatur. Porro numquam itaque quisquam commodi modi nemo. Voluptatibus optio ea, commodi earum dolores minima. Totam, doloremque. Molestias, odit fugiat obcaecati earum officiis nobis rem officia odio? Odit hic iure totam facilis minima ad, qui, dicta delectus odio ipsa, porro dolore at accusamus voluptatem cumque perspiciatis. Consequuntur vel unde iusto tempora et possimus commodi nesciunt, deserunt tenetur quibusdam perferendis quaerat eveniet! Provident iure pariatur id harum accusantium eveniet est sit praesentium minima cum? Sed, placeat porro iusto nostrum molestiae, beatae sit eligendi distinctio velit et a excepturi esse recusandae dolor reprehenderit illum cum consectetur quo quibusdam. Quo eveniet culpa adipisci mollitia velit nulla harum quis expedita, dolore quibusdam quos laboriosam dolores optio veritatis nemo commodi temporibus aliquam consequuntur impedit cupiditate voluptate voluptas exercitationem praesentium! Molestiae, ab? Veritatis repudiandae, laudantium incidunt consequatur distinctio, ea dolorem error qui vero officia cumque? Facilis consequatur iure fuga ipsum quia corrupti perspiciatis suscipit eligendi porro, tenetur sint veritatis? Veniam quod ipsum modi. Quisquam omnis dolorum nostrum dolores officia natus! Consequatur magni mollitia maiores, doloribus eaque nulla accusamus cum, totam esse quo, veritatis nobis cumque voluptatem amet consectetur culpa expedita quia commodi vel inventore in maxime sit. Cum, commodi labore beatae asperiores quaerat omnis ullam, quia dolorum doloremque dignissimos incidunt, accusamus molestias ea. Delectus alias sed dolorem, quisquam recusandae totam asperiores error provident in eius nemo, beatae labore sapiente non omnis, velit laborum aliquid atque consequuntur perferendis dolore enim ut eveniet nostrum! Odit sed, omnis quam explicabo inventore consectetur dolor temporibus repellendus labore suscipit unde optio tempore impedit? Hic architecto, eaque earum ducimus, atque dicta nihil veritatis illum error soluta labore officiis asperiores, at facilis? Quia laudantium blanditiis minima odit a non corrupti neque laborum hic eligendi sapiente labore ut reprehenderit, eveniet rem, officia quidem et aperiam architecto incidunt quibusdam provident. Eveniet sequi impedit quod doloribus sapiente odio corrupti doloremque ratione atque consequuntur possimus repellendus, velit numquam, eius recusandae quibusdam laudantium! Cum illum nesciunt libero facere corrupti voluptas qui, minus ab? Qui quos vel consequatur fugit voluptates nam inventore rem earum et est consequuntur id in, veniam recusandae ex tempore natus at? Nostrum explicabo velit, nisi veniam quisquam odio, totam soluta eos doloribus veritatis iusto quia! Explicabo, necessitatibus obcaecati aperiam quasi perferendis debitis voluptate consequuntur delectus commodi illum praesentium voluptatem eius doloremque ducimus odio ipsam maxime fuga veniam labore dolorem suscipit tempore qui. Perferendis quisquam sequi, numquam temporibus harum possimus vel hic labore amet dolorem nulla, tempora, saepe odit dicta doloremque quaerat libero maxime. Vero sequi facere omnis reprehenderit eligendi, natus, unde, accusantium pariatur voluptas commodi recusandae id tempore laboriosam. Vero quos ipsa minus corrupti labore facere beatae ea! Veniam tenetur corporis sit, pariatur autem quod sapiente velit ad? Accusamus, tenetur velit? At maxime nemo quisquam eligendi vitae deserunt culpa modi aspernatur, ipsa nostrum rerum harum repellendus dolores aliquam, molestiae magnam iure nobis. Vel aliquam ut necessitatibus obcaecati blanditiis maxime qui dignissimos adipisci, ipsam autem maiores suscipit ducimus, explicabo praesentium, omnis atque sit eveniet. Commodi a tempora porro dolore fuga dolor, iusto vel culpa corrupti dolorum dicta laborum numquam temporibus quam quia quod eos incidunt repudiandae perferendis voluptates nobis cumque, at, veniam odio. Corrupti ea officiis eaque nostrum aperiam? Provident dolor totam dolorem repellendus, et quasi eum ab vero eveniet esse. Nostrum necessitatibus sit corporis, nulla distinctio non nobis quidem soluta beatae est nesciunt consectetur in, cumque temporibus. Quibusdam, reiciendis in minima corrupti culpa omnis, minus provident et voluptate aperiam, asperiores quo inventore mollitia architecto quaerat temporibus itaque quas qui eaque? Quos, vero nostrum dicta ipsam aliquam, distinctio laudantium quia doloremque commodi earum animi ducimus beatae dolores repellat similique dolorum, ad incidunt explicabo libero provident sequi nobis nam. Dicta culpa asperiores fugit odio perferendis magni necessitatibus dignissimos, delectus sed repudiandae vel ut eius similique porro eos vero rem in ipsa. Praesentium neque mollitia unde officia iste, doloremque expedita labore molestiae vel numquam in hic facilis laboriosam? Similique dignissimos veritatis nesciunt esse tempora dolorem obcaecati mollitia numquam dolorum recusandae quisquam, ipsam, eius deleniti molestias incidunt dolores corrupti nisi quas voluptas odit suscipit repudiandae voluptatibus sit eos. Rerum necessitatibus cumque ex magnam beatae odio? Sapiente voluptatem ullam atque beatae dolore ea tenetur veritatis exercitationem dicta delectus dolor odio deleniti alias repudiandae rerum nisi quo iure reprehenderit corrupti cumque, aut architecto adipisci illum tempora? Aspernatur veniam porro velit? Inventore vitae, dolore veniam nam quaerat eos mollitia laboriosam beatae neque perspiciatis aspernatur error atque maiores debitis illo, ipsum incidunt necessitatibus accusantium facere laborum natus, distinctio adipisci omnis! Recusandae ipsum iusto placeat perspiciatis ipsa necessitatibus, consequuntur, totam laudantium nesciunt magnam harum, architecto eum et nihil eius non debitis eveniet praesentium facere tempora tempore! Dolor laboriosam illum molestiae optio, consequuntur iste recusandae amet iure voluptatum, omnis fuga tempora sed at pariatur numquam, in possimus incidunt expedita ipsa ratione aperiam animi voluptates. Qui beatae dolores repudiandae animi repellendus dolorem vitae dolorum itaque repellat incidunt. Earum saepe rem illo debitis, eaque vitae ab sed corporis. Repudiandae molestiae quis nihil beatae. Voluptatibus quasi ratione incidunt adipisci eum iste nobis laborum voluptate esse fuga. Excepturi, praesentium nisi cumque unde architecto ipsam suscipit dolorum rerum iste neque molestias id numquam itaque quidem commodi voluptatem, asperiores fugit eius veritatis officia est earum quo doloremque! Quibusdam tempora optio autem! Eaque esse iure, tempora earum, eum quae a voluptates magni labore corporis dolor. Quas, ut nisi sint aspernatur laborum, numquam adipisci sed sapiente, doloremque aliquid mollitia esse minima ratione? Saepe explicabo tempore, reiciendis excepturi dicta ab dolore aut? Officiis dolore recusandae perferendis aperiam soluta modi, eveniet officia enim esse molestias consequuntur architecto. Omnis necessitatibus quas pariatur debitis nisi similique optio eveniet suscipit impedit et ipsa minus ipsam quisquam quibusdam, explicabo mollitia beatae fuga! Inventore debitis voluptas eum pariatur ipsam ut veritatis veniam, exercitationem tenetur, fugit ad, itaque porro voluptatum illum id. Laudantium.
					</div>

					<Divider style={{width: '100%', margin: '0px'}}/>
					
					<div className={styles.MainPageFooter}>
						<div className={styles.TextHolder}>
							<TextArea className={styles.TextAreaInput} placeholder="Type here so engage in the chat" autoSize />
						</div>
						<div className={styles.SendChatBtn}>
							<Button type="primary" shape="circle" >
								<img src={Send} alt="" width={20} />
							</Button>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default index;
