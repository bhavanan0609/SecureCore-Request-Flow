const $=id=>document.getElementById(id),msg=(n,t,c)=>{$('m'+n).textContent=t;$('m'+n).className='msg '+(c||'')};
const ST=p=>`<span class="${p=='Authorized'?'ok-t':'bad-t'}">${p}</span>`;
class Node{constructor(d){this.d=d;this.next=null}}
class LinkedList{constructor(){this.head=null;this.size=0}
 append(d){const n=new Node(d);if(!this.head)this.head=n;else{let c=this.head;while(c.next)c=c.next;c.next=n}this.size++}
 find(id){let c=this.head,i=0;while(c){if(c.d.id==id)return i;c=c.next;i++}return -1}
 get(i){let c=this.head;while(i--&&c)c=c.next;return c&&c.d}
 remove(id){let c=this.head,p=null;while(c){if(c.d.id==id){p?p.next=c.next:this.head=c.next;this.size--;return true}p=c;c=c.next}return false}
 toArray(){const a=[];for(let c=this.head;c;c=c.next)a.push(c.d);return a}}
class LinkedQueue{constructor(){this.front=null;this.rear=null;this.size=0}
 enqueue(d){const n=new Node(d);if(this.rear)this.rear.next=n;else this.front=n;this.rear=n;this.size++}
 dequeue(){if(!this.front)return null;const n=this.front;this.front=n.next;if(!this.front)this.rear=null;this.size--;return n.d}
 toArray(){const a=[];for(let c=this.front;c;c=c.next)a.push(c.d);return a}}
let R=new LinkedList(),Q=new LinkedQueue(),LOG=new LinkedList(),done=0;
const chain=(arr,h,tags)=>(arr.length?`<span class="nul" style="padding-right:8px">${tags[0]} →</span>`:`<span class="nul">${tags[0]} → NULL</span>`)+arr.map((x,i)=>`<div class="node ${i===h?'hit':''}">${i==arr.length-1&&tags[1]?'<span class="tag">'+tags[1]+'</span>':''}<b>${x.id}</b><br>${x.name?x.name.split(' ')[0]:''}<br><small>${x.zone}</small></div><span class="arr">${i<arr.length-1?'→':'→ <span class="nul">NULL</span>'}</span>`).join('');
function drawR(h){const a=R.toArray();$('v1').innerHTML=chain(a,h,['HEAD']);$('tb1').innerHTML=a.map((x,i)=>`<tr><td>${i+1}</td><td>${x.id}</td><td>${x.name}</td><td>${x.zone}</td><td>${ST(x.perm)}</td></tr>`).join('');stats()}
function drawQ(){const a=Q.toArray();$('v2').innerHTML=chain(a,-1,['FRONT','REAR']);
 $('tb2').innerHTML=LOG.toArray().map((x,i)=>`<tr><td>${i+1}</td><td>${x.id}</td><td>${x.zone}</td><td>${ST(x.ok?'Authorized':'Not authorized').replace('Not authorized','DENIED').replace('Authorized','GRANTED')}</td><td>${x.why}</td></tr>`).join('');stats()}
function stats(){const a=R.toArray();$('s1').textContent=R.size;$('s2').textContent=a.filter(x=>x.perm=='Authorized').length;$('s3').textContent=Q.size;$('s4').textContent=done}
const U=s=>s.trim().toUpperCase().slice(0,8);
function addR(){const id=U($('id').value),nm=$('nm').value.trim();if(!id||!nm)return msg(1,'Enter both researcher ID and full name.','bad');
 if(R.find(id)>=0)return msg(1,id+' already exists.','bad');R.append({id,name:nm,zone:$('zn').value,perm:$('pm').value});$('id').value=$('nm').value='';msg(1,'Node created for '+id+'. List size: '+R.size+' (no fixed limit).','ok');drawR()}
const clr=()=>{$('id').value=$('nm').value=$('q').value='';msg(1,'Fields cleared.')};
function findR(){const q=U($('q').value),i=R.find(q);drawR(i);msg(1,i<0?q+' not found after checking '+R.size+' node(s).':q+' found at node '+(i+1)+'.',i<0?'bad':'ok')}
function delR(){const q=U($('q').value);if(R.remove(q)){msg(1,q+' deleted. Only pointers changed, nothing was shifted.','ok');drawR()}else msg(1,q+' not found.','bad')}
function resetR(){R=new LinkedList();[['R101','Ananya Rao','Research Lab','Authorized'],['R102','Karthik Nair','Restricted Lab','Not authorized'],['R103','Meera Iyer','General Lab','Authorized']].forEach(s=>R.append({id:s[0],name:s[1],zone:s[2],perm:s[3]}));msg(1,'Samples restored. Ready to try R101.');drawR()}
function enq(){const id=U($('rid').value);if(!id)return msg(2,'Enter a researcher ID.','bad');Q.enqueue({id,zone:$('rz').value});$('rid').value='';msg(2,id+' joined the rear. Queue length: '+Q.size+' (never "full").','ok');drawQ()}
function deq(){const r=Q.dequeue();if(!r)return msg(2,'Queue Empty. No requests waiting.','bad');const i=R.find(r.id);let ok=false,why;
 if(i<0)why='Not in records';else{const p=R.get(i);if(p.perm!='Authorized')why='Not authorized';else if(p.zone=='Restricted Lab'||r.zone==p.zone||r.zone=='General Lab'){ok=true;why='Verified for '+r.zone}else why='Zone not allowed'}
 LOG.append({id:r.id,zone:r.zone,ok,why});done++;msg(2,r.id+(ok?' GRANTED':' DENIED')+' — '+why+'.',ok?'ok':'bad');drawQ()}
function resetQ(){Q=new LinkedQueue();LOG=new LinkedList();done=0;[['R101','Research Lab'],['R102','Restricted Lab'],['R999','General Lab']].forEach(s=>Q.enqueue({id:s[0],zone:s[1]}));msg(2,'Samples restored. Process the next request.');drawQ()}
document.querySelectorAll('.tabs button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tabs button').forEach(x=>x.classList.toggle('on',x==b));['t1','t2'].forEach(t=>$(t).classList.toggle('hide',t!=b.dataset.t))});
resetR();resetQ();msg(2,'Ready. Process the next request to verify it against the records.');
function setBg(c){document.documentElement.style.setProperty('--bg',c);$('bgc').value=c}
document.querySelectorAll('.sw').forEach(b=>b.onclick=()=>setBg(b.dataset.c));
$('bgc').oninput=e=>setBg(e.target.value);

