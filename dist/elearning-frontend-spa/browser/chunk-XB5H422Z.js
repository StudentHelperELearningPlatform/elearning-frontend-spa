import{a as aa}from"./chunk-ICA5ZKKO.js";import{a as Oi}from"./chunk-MOZ6E2MG.js";import{a as Bi}from"./chunk-VQEEJCC3.js";import{a as Ri,b as ra}from"./chunk-DPURTZ6B.js";import{a as Rn}from"./chunk-R3QGAVLS.js";import{a as At,b as Nt}from"./chunk-6RPSEOZM.js";import{a as Vi}from"./chunk-RFNAMY7A.js";import{a as lt,b as ft,c as Ln,d as hn,e as et,f as Ti,g as st,h as Si,i as Ii,j as Ei,k as Di,l as Pn,m as Fn,n as Mi,o as tt,p as Li}from"./chunk-EKGHAW3F.js";import{a as Zt}from"./chunk-JQ5LZUMD.js";import{a as ea}from"./chunk-S43R7LLI.js";import{a as Te,b as be,c as De,d as A,e as Ve,f as re,g as Pi,h as fn,i as Fi,j as ta,k as gn,l as ce,m as na,n as Ue,o as ia,p as oa}from"./chunk-CNS4UD55.js";import{A as Hr,B as ht,C as $r,D as Gt,E as jr,F as Fo,H as nn,J as Ur,K as Qr,L as Gr,M as cn,P as Oo,S as fe,a as Ke,b as dn,c as Br,d as zt,e as Or,f as Vr,h as Zn,i as zr,j as qr,k as Xn,l as Mn,m as Ye,n as vi,o as Ar,p as qt,q as vn,r as Nr,s as Ut,t as Ee,u as mt,v as Jn,w as xi,x as Qt,y as ei,z as Ci}from"./chunk-TGF3E4J5.js";import{A as Xr,B as Me,C as ie,D as Ze,a as ti,b as Wr,d as Wt,e as Kt,f as on,g as Kr,i as Ro,o as ni,q as Yr,v as Zr,w as Bo,x as wi,y as ki,z as pn}from"./chunk-ZDBY7NQL.js";import{c as Jr}from"./chunk-HWZU2SV7.js";import{a as R,b as Tt,c as un,d as St,e as It}from"./chunk-WYHYFTM7.js";import{b as Yt,c as mn}from"./chunk-EJT7U4T5.js";import{a as Et}from"./chunk-ELO3SN2Z.js";import{d as En,f as Dn,g as wt,j as kt}from"./chunk-E5GFILRW.js";import{A as Je,i as at,j as jt,k as ze,l as rt,m as Le,n as sn,o as Lr,p as te,t as qe,u as Pr,x as Fr,y as Po,z as Rr}from"./chunk-NNTSLBXF.js";import{$ as O,$a as E,A as To,Ab as ve,B as ct,Bb as X,Bc as ee,Cb as W,Cc as Yn,D as _i,Db as K,E as xr,Eb as U,F as Cr,Fb as P,Gb as Fe,Gc as w,Hc as se,I as bi,J as pt,Jb as x,Jc as Mr,K as Rt,L as kn,Lb as d,Mb as Ge,Na as l,Nb as Ne,O as ot,Ob as Re,P as ne,Pb as We,Q as ge,Qb as k,Rb as T,S as ae,Sa as Qn,Sb as Se,Ta as Io,Tb as je,U as v,Ua as Sn,Ub as bt,Va as Eo,Vb as Ae,Wa as Qe,Wb as C,X as wr,Xb as m,Ya as Gn,Yb as Q,Z as _,Zb as $,_ as b,_b as In,a as yn,ab as _e,ac as yt,ba as Bt,bb as Oe,bc as vt,c as Ft,ca as _t,cc as xt,d as Un,db as we,e as Ce,eb as L,f as br,fa as I,fb as g,ga as Be,gc as Mo,h as wo,hc as le,ic as Ct,jc as oe,k as $e,ka as Z,kc as Pe,l as ko,lb as Do,lc as Wn,mb as D,mc as Lo,na as Xe,nb as Tr,nc as yi,o as gt,oa as So,ob as Sr,oc as Kn,p as wn,pa as M,pb as V,pc as Er,qb as z,qc as Vt,ra as Ot,rb as Ir,rc as Dr,sb as ln,sc as tn,ta as kr,tb as me,tc as Ie,ub as he,v as an,va as Tn,vb as s,wb as c,x as yr,xb as p,xc as J,y as gi,yb as F,z as vr,zb as ye}from"./chunk-WJ7SS25N.js";import{a as G,b as ue}from"./chunk-DAQOROHW.js";var la={lessons:[],quizzes:[],recentActivity:[],classes:[],loading:!1,error:null};function sa(t){return t?t instanceof Date?t:typeof t=="string"||typeof t=="number"?new Date(t):new Date:new Date}var _n=Tt({providedIn:"root"},It(la),un(t=>({publishedLessons:J(()=>t.lessons().filter(r=>r.status==="PUBLISHED")),draftLessons:J(()=>t.lessons().filter(r=>r.status==="DRAFT")),archivedLessons:J(()=>t.lessons().filter(r=>r.status==="ARCHIVED")),publishedQuizzes:J(()=>t.quizzes().filter(r=>r.status==="PUBLISHED")),draftQuizzes:J(()=>t.quizzes().filter(r=>r.status==="DRAFT")),publishedLessonsCount:J(()=>t.lessons().filter(r=>r.status==="PUBLISHED").length),draftLessonsCount:J(()=>t.lessons().filter(r=>r.status==="DRAFT").length),totalLessonsCount:J(()=>t.lessons().length),totalQuizzesCount:J(()=>t.quizzes().length)})),St((t,r=v(Je),e=v(Yt),n=v(mn))=>({loadDashboard(){R(t,{loading:!0,error:null}),an({lessons:r.get(`${e}/lessons`),profile:r.get(`${n}/teachers/me/profile`).pipe(ct(i=>(console.error("Failed to load profile in dashboard",i),$e(null))))}).subscribe({next:({lessons:i,profile:o})=>{let a=i,u=[];Array.isArray(a)?u=a:a&&(u=a.items??a.content??[]);let h=u.map(y=>({id:y.id??"",title:y.title??"",subject:y.subject??"",status:y.status??"DRAFT",lastModified:sa(y.updatedAt??y.lastModified)})),f=(o?.recentActivity??[]).map(y=>({id:y.id??"",type:y.type??"updated",contentTitle:y.contentTitle??"",contentType:y.contentType??"lesson",timestamp:sa(y.timestamp)}));R(t,{lessons:h,recentActivity:f.length>0?f:h.map(y=>({id:y.id,type:"updated",contentTitle:y.title,contentType:"lesson",timestamp:y.lastModified})),classes:o?.classes??[],loading:!1,error:null})},error:i=>{let o=i instanceof Error?i.message:"Failed to load dashboard";R(t,{loading:!1,error:o})}})},loadContent(){R(t,{loading:!0}),setTimeout(()=>{R(t,{loading:!1})},300)},createLesson(i){R(t,o=>({lessons:[...o.lessons,ue(G({},i),{id:crypto.randomUUID(),lastModified:new Date})]}))},updateLesson(i,o){R(t,a=>({lessons:a.lessons.map(u=>u.id===i?ue(G(G({},u),o),{lastModified:new Date}):u)}))},deleteLesson(i){R(t,{loading:!0,error:null}),r.delete(`${e}/lessons/${i}`).subscribe({next:()=>{R(t,o=>({lessons:o.lessons.filter(a=>a.id!==i),loading:!1}))},error:o=>{console.error("Failed to delete lesson",o),R(t,{loading:!1,error:o.message||"Failed to delete lesson"})}})},createQuiz(i){R(t,o=>({quizzes:[...o.quizzes,ue(G({},i),{id:i.id??crypto.randomUUID(),lastModified:new Date})]}))},updateQuiz(i,o){R(t,a=>({quizzes:a.quizzes.map(u=>u.id===i?ue(G(G({},u),o),{lastModified:new Date}):u)}))},deleteQuiz(i){R(t,o=>({quizzes:o.quizzes.filter(a=>a.id!==i)}))},reset(){R(t,la)}})));var ad={classes:[],currentClass:null,loading:!1,error:null},Bn=Tt({providedIn:"root"},It(ad),un(t=>({totalClasses:J(()=>t.classes().length),totalStudents:J(()=>t.classes().reduce((r,e)=>r+e.studentCount,0))})),St((t,r=v(Je),e=v(mn))=>({loadClasses(){R(t,{loading:!0,error:null}),r.get(`${e}/teachers/classes`).subscribe({next:n=>{R(t,{classes:n.map(Ri),loading:!1})},error:n=>{R(t,{loading:!1,error:n.message})}})},loadClassDetail(n){R(t,{loading:!0,error:null,currentClass:null}),an({detail:r.get(`${e}/teachers/classes/${n}`),lessons:r.get(`${e}/teachers/classes/${n}/lessons`).pipe(ct(()=>$e([]))),enrolledIds:r.get(`${e}/teachers/classes/${n}/students`).pipe(ct(()=>$e([]))),allStudents:r.get(`${e}/students`).pipe(ct(()=>$e([])))}).subscribe({next:({detail:i,lessons:o,enrolledIds:a,allStudents:u})=>{let h=new Map(u.map(f=>[f.id,f]));R(t,{currentClass:ue(G({},ra(i)),{lessons:o,students:a.map(f=>{let y=h.get(f);return{id:f,name:y?`${y.firstName} ${y.lastName}`.trim():f,email:y?.email??""}})}),loading:!1})},error:i=>{R(t,{loading:!1,error:i.message})}})},createClass(n){R(t,{loading:!0,error:null});let i={name:n.name,bio:n.description??""};r.post(`${e}/teachers/classes`,i).subscribe({next:o=>{let a=Ri(o);R(t,{classes:[...t.classes(),a],loading:!1})},error:o=>{R(t,{loading:!1,error:o.message})}})},updateClass(n,i){R(t,{loading:!0,error:null});let o={};i.name!==void 0&&(o.name=i.name),i.description!==void 0&&(o.bio=i.description),r.put(`${e}/teachers/classes/${n}`,o).subscribe({next:a=>{let u=Ri(a);R(t,{classes:t.classes().map(h=>h.id===n?u:h),currentClass:t.currentClass()?.id===n?G(G({},t.currentClass()),u):t.currentClass(),loading:!1})},error:a=>{R(t,{loading:!1,error:a.message})}})},deleteClass(n){R(t,{classes:t.classes().filter(i=>i.id!==n)}),r.delete(`${e}/teachers/classes/${n}`).subscribe()},addStudent(n,i){return r.post(`${e}/teachers/classes/${n}/students/${i}`,{})},removeStudent(n,i){let o=t.currentClass();o&&(R(t,{currentClass:ue(G({},o),{students:o.students.filter(a=>a.id!==i)})}),r.delete(`${e}/teachers/classes/${n}/students/${i}`).subscribe())},addLesson(n,i){return r.post(`${e}/teachers/classes/${n}/lessons/${i}`,{})},removeLesson(n,i){let o=t.currentClass();o&&(R(t,{currentClass:ue(G({},o),{lessons:o.lessons.filter(a=>a.id!==i)})}),r.delete(`${e}/teachers/classes/${n}/lessons/${i}`).subscribe())}})));var da=Tt({providedIn:"root"},It({classSummary:null,classStudents:[],selectedStudentDetail:null,allStudents:[],loading:!1,error:null}),St((t,r=v(Je),e=v(mn))=>({loadClassStats:Nt(Ft(kn(()=>R(t,{loading:!0,error:null})),pt(n=>r.get(`${e}/progress/professor/class-stats`,{params:{classId:n}}).pipe(At({next:i=>R(t,{classSummary:i.summary,classStudents:i.students,loading:!1}),error:i=>R(t,{error:i.message||"Failed to load class stats",loading:!1})}))))),loadStudentDetail:Nt(Ft(kn(()=>R(t,{loading:!0,error:null,selectedStudentDetail:null})),pt(n=>r.get(`${e}/progress/professor/students/${n}`).pipe(At({next:i=>R(t,{selectedStudentDetail:i,loading:!1}),error:i=>R(t,{error:i.message||"Failed to load student detail",loading:!1})}))))),loadAllStudents:Nt(Ft(kn(()=>R(t,{loading:!0,error:null})),pt(()=>r.get(`${e}/progress/professor/students`).pipe(At({next:n=>R(t,{allStudents:n,loading:!1}),error:n=>R(t,{error:n.message||"Failed to load all students",loading:!1})})))))})));var ld=t=>["/teacher/classes",t],sd=(t,r,e)=>({"bg-green-100 text-green-700":t,"bg-yellow-100 text-yellow-700":r,"bg-red-100 text-red-700":e}),dd=(t,r,e)=>({"bg-green-100 text-green-700":t,"bg-yellow-100 text-yellow-700":r,"bg-gray-100 text-gray-500":e}),cd=(t,r)=>r.id,pd=(t,r)=>r.studentId,ud=(t,r)=>r.lessonId;function md(t,r){if(t&1&&(c(0,"tr",29)(1,"td",38)(2,"div",31)(3,"div",39),m(4),p(),c(5,"div")(6,"p",40),m(7),p()()()(),c(8,"td",41),m(9),p(),c(10,"td",38)(11,"div",42)(12,"div",43),F(13,"div",44),p(),c(14,"span",45),m(15),Vt(16,"number"),p()()(),c(17,"td",46)(18,"button",47),m(19," View "),p()()()),t&2){let e=r.$implicit;l(4),$(" ",e.name.charAt(0)," "),l(3),Q(e.name),l(2),Q(e.studentCount),l(4),je("width",e.averageGrade?e.averageGrade*10:75,"%"),l(2),$(" ",e.averageGrade?tn(16,7,e.averageGrade,"1.1-1")+"/10":"7.5/10"," "),l(3),s("routerLink",oe(10,ld,e.id))}}function hd(t,r){t&1&&(c(0,"div",34)(1,"span",48),m(2,"sync"),p(),c(3,"p",49),m(4,"Fetching student progress records from the API..."),p()())}function fd(t,r){if(t&1&&(c(0,"div",35)(1,"span",50),m(2,"error_outline"),p(),c(3,"p",51),m(4),p()()),t&2){let e=d();l(4),$("Error loading progress data: ",e.progressStore.error())}}function gd(t,r){t&1&&(c(0,"div",36)(1,"span",52),m(2,"group_off"),p(),c(3,"h4",53),m(4,"No Students Enrolled"),p(),c(5,"p",54),m(6,"Students enrolled in your classes will appear here with progress reports."),p()())}function _d(t,r){if(t&1){let e=P();c(0,"tr",57)(1,"td",58)(2,"div",59),m(3),p(),c(4,"span"),m(5),p()(),c(6,"td",60)(7,"span",61),m(8),p()(),c(9,"td",60)(10,"span",62),m(11),p()(),c(12,"td",63),m(13),Vt(14,"date"),p(),c(15,"td",46)(16,"button",64),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.inspectStudent(i.studentId))}),m(17," Inspect "),p()()()}if(t&2){let e=r.$implicit;l(3),$(" ",e.studentName.charAt(0)," "),l(2),Q(e.studentName),l(3),$(" ",e.lessonsCompleted," "),l(2),s("ngClass",Wn(9,sd,e.averageScore>=80,e.averageScore>=50&&e.averageScore<80,e.averageScore<50)),l(),$(" ",e.averageScore,"% "),l(2),$(" ",tn(14,6,e.lastActive,"mediumDate")," ")}}function bd(t,r){if(t&1&&(c(0,"div",23)(1,"table",24)(2,"thead")(3,"tr",25)(4,"th",27),m(5,"Student"),p(),c(6,"th",55),m(7,"Lessons Completed"),p(),c(8,"th",55),m(9,"Average Score"),p(),c(10,"th",27),m(11,"Last Active"),p(),c(12,"th",56),m(13,"Activity Details"),p()()(),c(14,"tbody"),me(15,_d,18,13,"tr",57,pd),p()()()),t&2){let e=d();l(15),he(e.progressStore.allStudents())}}function yd(t,r){if(t&1&&(c(0,"tr",84)(1,"td",87),m(2),p(),c(3,"td",88)(4,"span",89)(5,"span",90),m(6),p(),m(7),p()(),c(8,"td",91),m(9),p()()),t&2){let e=r.$implicit;l(2),Q(e.lessonTitle),l(2),s("ngClass",Wn(5,dd,e.status==="COMPLETED",e.status==="IN_PROGRESS",e.status==="NOT_STARTED")),l(2),$(" ",e.status==="COMPLETED"?"check_circle":e.status==="IN_PROGRESS"?"pending":"radio_button_unchecked"," "),l(),$(" ",e.status==="COMPLETED"?"Completed":e.status==="IN_PROGRESS"?"In Progress":"Not Started"," "),l(2),$(" ",e.score!==null&&e.score!==void 0?e.score+"%":"\u2014"," ")}}function vd(t,r){t&1&&(c(0,"tr")(1,"td",92),m(2,"No lesson activity registered yet."),p()())}function xd(t,r){if(t&1){let e=P();c(0,"div",37)(1,"div",65)(2,"div",66)(3,"div")(4,"h2",67),m(5),p(),c(6,"p",32),m(7,"LMS Progress Report & Lesson History"),p()(),c(8,"button",68),x("click",function(){_(e);let i=d();return b(i.closeModal())}),c(9,"span",69),m(10,"close"),p()()(),c(11,"div",70)(12,"div",71)(13,"div",72)(14,"span",73),m(15,"Lessons Completed"),p(),c(16,"span",74),m(17),p()(),c(18,"div",72)(19,"span",73),m(20,"Average Grade"),p(),c(21,"span",75),m(22),p()()(),c(23,"div",76)(24,"h4",77),m(25,"Lesson History"),p(),c(26,"div",78)(27,"table",79)(28,"thead")(29,"tr",80)(30,"th",81),m(31,"Lesson Title"),p(),c(32,"th",82),m(33,"Status"),p(),c(34,"th",83),m(35,"Score"),p()()(),c(36,"tbody"),me(37,yd,10,9,"tr",84,ud,!1,vd,3,0,"tr"),p()()()()(),c(40,"div",85)(41,"app-button",86),x("btnClick",function(){_(e);let i=d();return b(i.closeModal())}),m(42,"Close Report"),p()()()()}if(t&2){let e=d().progressStore.selectedStudentDetail();l(5),$("",e==null?null:e.studentName,"'s Learning Profile"),l(12),Q(e==null?null:e.totalLessonsCompleted),l(5),$("",e==null?null:e.averageScore,"%"),l(15),he(e==null?null:e.history)}}var zi=class t{contentStore=v(_n);classStore=v(Bn);progressStore=v(da);isModalOpen=Z(!1);ngOnInit(){this.contentStore.loadContent(),this.classStore.loadClasses(),this.progressStore.loadAllStudents()}inspectStudent(r){this.progressStore.loadStudentDetail(r),this.isModalOpen.set(!0)}closeModal(){this.isModalOpen.set(!1)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-analytics-dashboard"]],decls:76,vars:4,consts:[[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-8"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4","bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],[1,"flex","items-center","space-x-4"],[1,"w-16","h-16","bg-[#0ABAB5]/20","rounded-2xl","border-4","border-black","flex","items-center","justify-center"],[1,"material-icons","text-[#0ABAB5]","text-3xl"],[1,"text-3xl","font-black","text-black","tracking-tight"],[1,"text-gray-600","font-medium"],[1,"flex","space-x-3"],["variant","primary","icon","add_circle","routerLink","/teacher/lessons/new"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-8"],[1,"block"],[1,"p-6"],[1,"flex","items-center","space-x-3","mb-6"],[1,"w-10","h-10","bg-gray-100","rounded-xl","border-2","border-black","flex","items-center","justify-center"],[1,"material-icons","text-black"],[1,"text-xl","font-black","text-black"],[1,"space-y-4"],["routerLink","/teacher/content","title","View Published Lessons in Content Editor",1,"flex","justify-between","items-center","p-4","bg-gray-50","rounded-2xl","border-2","border-black","hover:bg-[#0ABAB5]/10","hover:translate-y-[-2px]","transition-all","duration-200","cursor-pointer","group"],[1,"font-bold","text-gray-600","group-hover:text-black"],[1,"bg-[#0ABAB5]","text-white","px-3","py-1","rounded-xl","font-black","border-2","border-black","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"],["routerLink","/teacher/content","title","View Draft Lessons in Content Editor",1,"flex","justify-between","items-center","p-4","bg-gray-50","rounded-2xl","border-2","border-black","hover:bg-[#0ABAB5]/10","hover:translate-y-[-2px]","transition-all","duration-200","cursor-pointer","group"],[1,"bg-white","text-black","px-3","py-1","rounded-xl","font-black","border-2","border-black","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"],[1,"block","lg:col-span-2"],[1,"overflow-x-auto"],[1,"w-full","text-left","border-collapse","min-w-[500px]"],[1,"border-b-4","border-black","bg-gray-100"],["scope","col",1,"p-4","font-black","text-gray-600","uppercase","tracking-wider","text-sm","rounded-tl-xl"],["scope","col",1,"p-4","font-black","text-gray-600","uppercase","tracking-wider","text-sm"],["scope","col",1,"p-4","font-black","text-gray-600","uppercase","tracking-wider","text-sm","text-right","rounded-tr-xl"],[1,"border-b-2","border-gray-100","hover:bg-gray-50","transition-colors","group"],[1,"p-6","border-b-4","border-black","bg-gray-50","flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4"],[1,"flex","items-center","space-x-3"],[1,"text-xs","text-gray-500","font-bold"],[1,"bg-indigo-500","text-white","px-3","py-1","rounded-xl","font-black","border-2","border-black","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","text-xs"],[1,"flex","flex-col","items-center","justify-center","py-12","space-y-3"],[1,"p-6","text-center","bg-red-50","text-red-600","font-bold","border-2","border-red-500","rounded-2xl"],[1,"text-center","py-8"],["role","dialog","aria-modal","true",1,"fixed","inset-0","bg-black/60","backdrop-blur-sm","flex","items-center","justify-center","z-50","p-4","animate-in","fade-in","duration-200"],[1,"p-4"],[1,"w-10","h-10","bg-[#0ABAB5]/20","rounded-xl","border-2","border-black","flex","items-center","justify-center","font-black","text-[#0ABAB5]"],[1,"font-bold","text-black"],[1,"p-4","font-bold","text-gray-600"],[1,"flex","items-center","space-x-2"],[1,"flex-1","h-2","bg-gray-200","rounded-full","overflow-hidden","border","border-gray-300","w-24"],[1,"h-full","bg-[#0ABAB5]"],[1,"text-sm","font-bold","text-gray-600"],[1,"p-4","text-right"],[1,"px-4","py-2","bg-white","text-black","font-bold","rounded-xl","border-2","border-black","hover:bg-black","hover:text-white","transition-colors","text-sm","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:shadow-none","hover:translate-y-[2px]","hover:translate-x-[2px]",3,"routerLink"],[1,"material-icons","animate-spin","text-[#0ABAB5]","text-4xl"],[1,"text-sm","text-gray-500","font-bold"],[1,"material-icons","text-3xl"],[1,"text-sm","mt-2"],[1,"material-icons","text-gray-400","text-5xl"],[1,"text-lg","font-black","text-black","mt-2"],[1,"text-gray-500","font-bold","text-sm","mt-1"],["scope","col",1,"p-4","font-black","text-gray-600","uppercase","tracking-wider","text-sm","text-center"],["scope","col",1,"p-4","font-black","text-gray-600","uppercase","tracking-wider","text-sm","text-right"],[1,"border-b-2","border-black/10","hover:bg-[#0ABAB5]/5","transition-colors"],[1,"p-4","font-bold","text-black","flex","items-center","space-x-3"],[1,"w-10","h-10","bg-indigo-100","rounded-full","border-2","border-black","flex","items-center","justify-center","font-black","text-indigo-600"],[1,"p-4","text-center"],[1,"bg-gray-100","border-2","border-black","px-3","py-1","rounded-xl","font-bold","text-sm"],[1,"px-3","py-1","rounded-xl","font-black","text-sm","border-2","border-black","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",3,"ngClass"],[1,"p-4","text-sm","text-gray-500","font-medium"],[1,"px-4","py-2","bg-[#0ABAB5]","text-white","font-black","rounded-xl","border-2","border-black","hover:bg-white","hover:text-black","transition-colors","text-xs","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:shadow-none","hover:translate-y-[2px]","hover:translate-x-[2px]",3,"click"],[1,"bg-white","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]","max-w-2xl","w-full","max-h-[85vh]","flex","flex-col","overflow-hidden","animate-in","fade-in","zoom-in-95","duration-200"],[1,"p-6","border-b-4","border-black","bg-indigo-50","flex","justify-between","items-center"],[1,"text-2xl","font-black","text-black"],["title","Close Modal",1,"w-10","h-10","rounded-xl","border-2","border-black","bg-white","hover:bg-red-500","hover:text-white","flex","items-center","justify-center","transition-colors","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:shadow-none","hover:translate-x-[2px]","hover:translate-y-[2px]",3,"click"],[1,"material-icons"],[1,"p-6","overflow-y-auto","space-y-6","flex-1"],[1,"grid","grid-cols-2","gap-4"],[1,"p-4","bg-gray-50","rounded-2xl","border-2","border-black","flex","flex-col","items-center","justify-center"],[1,"text-sm","font-bold","text-gray-500"],[1,"text-3xl","font-black","text-black","mt-1"],[1,"text-3xl","font-black","text-[#0ABAB5]","mt-1"],[1,"space-y-3"],[1,"text-lg","font-black","text-black"],[1,"border-2","border-black","rounded-2xl","overflow-hidden","bg-white"],[1,"w-full","text-left","border-collapse"],[1,"bg-gray-50","border-b-2","border-black","text-xs","font-bold","text-gray-500"],["scope","col",1,"p-3"],["scope","col",1,"p-3","text-center"],["scope","col",1,"p-3","text-right"],[1,"border-b","border-black/10","hover:bg-gray-50","text-sm","font-medium"],[1,"p-4","bg-gray-50","border-t-2","border-black","flex","justify-end"],["variant","secondary",3,"btnClick"],[1,"p-3","font-bold","text-black"],[1,"p-3","text-center"],[1,"px-2.5","py-0.5","rounded-full","text-xs","font-black","border-2","border-black","inline-flex","items-center","gap-1",3,"ngClass"],[1,"material-icons","text-xs"],[1,"p-3","text-right","font-black","text-black"],["colspan","3",1,"p-6","text-center","text-gray-500","font-bold"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),m(5,"insights"),p()(),c(6,"div")(7,"h1",5),m(8,"Analytics Dashboard"),p(),c(9,"p",6),m(10,"Overview of your content and classes"),p()()(),c(11,"div",7)(12,"app-button",8),m(13,"New Lesson"),p()()(),c(14,"div",9)(15,"app-card",10)(16,"div",11)(17,"div",12)(18,"div",13)(19,"span",14),m(20,"library_books"),p()(),c(21,"h3",15),m(22,"Content"),p()(),c(23,"div",16)(24,"div",17)(25,"span",18),m(26,"Published Lessons"),p(),c(27,"span",19),m(28),p()(),c(29,"div",20)(30,"span",18),m(31,"Draft Lessons"),p(),c(32,"span",21),m(33),p()()()()(),c(34,"app-card",22)(35,"div",11)(36,"div",12)(37,"div",13)(38,"span",14),m(39,"groups"),p()(),c(40,"h3",15),m(41,"Class Overview"),p()(),c(42,"div",23)(43,"table",24)(44,"thead")(45,"tr",25)(46,"th",26),m(47,"Class Name"),p(),c(48,"th",27),m(49,"Students"),p(),c(50,"th",27),m(51,"Avg Progress"),p(),c(52,"th",28),m(53,"Action"),p()()(),c(54,"tbody"),me(55,md,20,12,"tr",29,cd),p()()()()()(),c(57,"app-card",10)(58,"div",30)(59,"div",31)(60,"div",13)(61,"span",14),m(62,"assignment_ind"),p()(),c(63,"div")(64,"h3",15),m(65,"Student Performance Directory"),p(),c(66,"p",32),m(67,"Real-time learning stats from the PROGRESS CONTROLLER"),p()()(),c(68,"span",33),m(69," LIVE SYNCED "),p()(),c(70,"div",11),V(71,hd,5,0,"div",34)(72,fd,5,1,"div",35)(73,gd,7,0,"div",36)(74,bd,17,0,"div",23),p()()(),V(75,xd,43,4,"div",37)),e&2&&(l(28),$(" ",n.contentStore.publishedLessons().length," "),l(5),$(" ",n.contentStore.draftLessons().length," "),l(22),he(n.classStore.classes()),l(16),z(n.progressStore.loading()?71:n.progressStore.error()?72:n.progressStore.allStudents().length===0?73:74),l(4),z(n.isModalOpen()&&n.progressStore.selectedStudentDetail()?75:-1))},dependencies:[te,at,kt,wt,Et,Zt,Lr,sn],encapsulation:2})};var Vo=(t,r)=>({"bg-[#0ABAB5] text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]":t,"text-gray-600 hover:bg-gray-200":r}),ca=(t,r)=>({"bg-[#0ABAB5] text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]":t,"text-gray-600 hover:bg-gray-200":r}),Cd=()=>[1,2,3],pa=t=>["/teacher/lessons",t,"edit"],ua=(t,r)=>r.id;function wd(t,r){t&1&&F(0,"div",21)}function kd(t,r){t&1&&(c(0,"div",20),me(1,wd,1,0,"div",21,ln),p()),t&2&&(l(),he(Ct(0,Cd)))}function Td(t,r){if(t&1){let e=P();c(0,"app-card",24)(1,"div",25)(2,"div",26)(3,"div",27)(4,"span",28),m(5,"menu_book"),p()(),c(6,"app-badge",29),m(7),p()(),c(8,"h3",30),m(9),p(),c(10,"div",31)(11,"app-badge",32),m(12),p()(),c(13,"div",33)(14,"span",34),m(15),Vt(16,"date"),p(),c(17,"div",35)(18,"button",36)(19,"span",17),m(20,"edit"),p()(),c(21,"button",37),x("click",function(){let i=_(e).$implicit,o=d(3);return b(o.deleteLesson(i.id))}),c(22,"span",17),m(23,"delete"),p()()()()()()}if(t&2){let e=r.$implicit;l(6),s("variant",e.status==="PUBLISHED"?"success":"warning"),l(),$(" ",e.status," "),l(2),Q(e.title),l(3),Q(e.subject),l(3),$(" Updated ",tn(16,6,e.lastModified,"shortDate")," "),l(3),s("routerLink",oe(9,pa,e.id))}}function Sd(t,r){if(t&1&&(c(0,"div",20),me(1,Td,24,11,"app-card",24,ua),p()),t&2){let e=d(2);l(),he(e.filteredLessons())}}function Id(t,r){if(t&1){let e=P();c(0,"tr",43)(1,"td",44),m(2),p(),c(3,"td",45)(4,"span",46),m(5),p()(),c(6,"td",45)(7,"app-badge",29),m(8),p()(),c(9,"td",47),m(10),Vt(11,"date"),p(),c(12,"td",48)(13,"div",49)(14,"app-button",50),m(15," Edit "),p(),c(16,"app-button",51),x("btnClick",function(){let i=_(e).$implicit,o=d(3);return b(o.deleteLesson(i.id))}),m(17," Delete "),p()()()()}if(t&2){let e=r.$implicit;l(2),Q(e.title),l(3),$(" ",e.subject," "),l(2),s("variant",e.status==="PUBLISHED"?"success":"warning"),l(),$(" ",e.status," "),l(2),$(" ",tn(11,6,e.lastModified,"shortDate")," "),l(4),s("routerLink",oe(9,pa,e.id))}}function Ed(t,r){if(t&1&&(c(0,"div",22)(1,"div",38)(2,"table",39)(3,"thead")(4,"tr",40)(5,"th",41),m(6,"Lesson Title"),p(),c(7,"th",41),m(8,"Subject"),p(),c(9,"th",41),m(10,"Status"),p(),c(11,"th",41),m(12,"Last Modified"),p(),c(13,"th",42),m(14,"Actions"),p()()(),c(15,"tbody"),me(16,Id,18,11,"tr",43,ua),p()()()()),t&2){let e=d(2);l(16),he(e.filteredLessons())}}function Dd(t,r){t&1&&F(0,"app-empty-state",23)}function Md(t,r){if(t&1&&(V(0,Sd,3,0,"div",20)(1,Ed,18,0,"div",22),V(2,Dd,1,0,"app-empty-state",23)),t&2){let e=d();z(e.viewMode()==="grid"?0:1),l(2),z(e.filteredLessons().length===0?2:-1)}}var qi=class t{store=v(_n);viewMode=Z(localStorage.getItem("teacher_lessons_view_mode")||"grid");statusFilter=Z(localStorage.getItem("teacher_lessons_status_filter")||"ALL");filteredLessons=J(()=>{let r=this.statusFilter(),e=this.store.lessons();return r==="ALL"?e:e.filter(n=>n.status===r)});ngOnInit(){this.store.loadContent()}setViewMode(r){this.viewMode.set(r),localStorage.setItem("teacher_lessons_view_mode",r)}setStatusFilter(r){this.statusFilter.set(r),localStorage.setItem("teacher_lessons_status_filter",r)}deleteLesson(r){confirm("Are you sure you want to delete this lesson?")&&this.store.deleteLesson(r)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-content-editor"]],decls:38,vars:21,consts:[[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-8"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4","bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],[1,"flex","items-center","space-x-4"],[1,"w-16","h-16","bg-[#0ABAB5]/20","rounded-2xl","border-4","border-black","flex","items-center","justify-center"],[1,"material-icons","text-[#0ABAB5]","text-3xl"],[1,"text-3xl","font-black","text-black","tracking-tight"],[1,"text-gray-600","font-medium"],["variant","primary","icon","add_circle","routerLink","/teacher/lessons/new"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4","bg-white","p-4","rounded-2xl","border-4","border-black","shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"],[1,"flex","flex-wrap","items-center","gap-4"],[1,"font-black","text-black","text-lg"],[1,"flex","space-x-1.5","bg-gray-100","p-1","rounded-xl","border-2","border-black","inline-flex"],["title","Show All Lessons",1,"px-3","py-1.5","rounded-lg","font-bold","transition-all","duration-200","text-xs","font-black",3,"click","ngClass"],["title","Show Published Lessons",1,"px-3","py-1.5","rounded-lg","font-bold","transition-all","duration-200","text-xs","font-black",3,"click","ngClass"],["title","Show Draft Lessons",1,"px-3","py-1.5","rounded-lg","font-bold","transition-all","duration-200","text-xs","font-black",3,"click","ngClass"],[1,"flex","space-x-2","bg-gray-100","p-1.5","rounded-xl","border-2","border-black","inline-flex"],["title","Grid View",1,"p-2","rounded-lg","font-bold","transition-all","duration-200","flex","items-center","gap-1",3,"click","ngClass"],[1,"material-icons","text-sm"],[1,"text-xs","font-black"],["title","List View",1,"p-2","rounded-lg","font-bold","transition-all","duration-200","flex","items-center","gap-1",3,"click","ngClass"],[1,"grid","grid-cols-1","md:grid-cols-2","lg:grid-cols-3","gap-6"],[1,"h-64","bg-gray-200","rounded-3xl","border-4","border-gray-300","animate-pulse"],[1,"bg-white","border-4","border-black","rounded-3xl","overflow-hidden","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],["title","No Lessons Found","description","Try selecting a different status filter or create a new lesson to start building your curriculum.","icon","menu_book"],[1,"block","group"],[1,"p-6"],[1,"flex","justify-between","items-start","mb-4"],[1,"w-12","h-12","bg-gray-100","rounded-xl","border-2","border-black","flex","items-center","justify-center","group-hover:bg-[#0ABAB5]/20","transition-colors"],[1,"material-icons","text-black","group-hover:text-[#0ABAB5]","transition-colors"],[3,"variant"],[1,"text-xl","font-black","text-black","mb-2","line-clamp-2"],[1,"flex","items-center","space-x-2","mb-6"],["variant","primary","icon","category"],[1,"flex","items-center","justify-between","pt-4","border-t-2","border-gray-100"],[1,"text-sm","text-gray-500","font-medium"],[1,"flex","space-x-2"],["title","Edit Lesson",1,"w-8","h-8","rounded-full","bg-gray-100","flex","items-center","justify-center","hover:bg-black","hover:text-white","transition-colors",3,"routerLink"],["title","Delete Lesson",1,"w-8","h-8","rounded-full","bg-gray-100","flex","items-center","justify-center","hover:bg-red-500","hover:text-white","transition-colors",3,"click"],[1,"overflow-x-auto"],[1,"w-full","border-collapse","text-left"],[1,"bg-gray-100","border-b-4","border-black"],["scope","col",1,"p-4","font-black","text-black","text-sm","uppercase","tracking-wider"],["scope","col",1,"p-4","font-black","text-black","text-sm","uppercase","tracking-wider","text-right"],[1,"border-b-2","border-black/10","hover:bg-[#0ABAB5]/5","transition-colors"],[1,"p-4","font-bold","text-black"],[1,"p-4"],[1,"inline-flex","items-center","gap-1","text-xs","font-black","bg-[#0ABAB5]/10","text-[#0ABAB5]","border-2","border-[#0ABAB5]","px-2.5","py-0.5","rounded-full"],[1,"p-4","text-sm","text-gray-500","font-medium"],[1,"p-4","text-right"],[1,"flex","justify-end","gap-2"],["size","sm","variant","secondary","icon","edit",3,"routerLink"],["size","sm","variant","danger","icon","delete",3,"btnClick"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),m(5,"edit_document"),p()(),c(6,"div")(7,"h1",5),m(8,"Content Editor"),p(),c(9,"p",6),m(10,"Manage and organize your lessons"),p()()(),c(11,"div")(12,"app-button",7),m(13,"New Lesson"),p()()(),c(14,"div",8)(15,"div",9)(16,"span",10),m(17,"My Lessons"),p(),c(18,"div",11)(19,"button",12),x("click",function(){return n.setStatusFilter("ALL")}),m(20," All "),p(),c(21,"button",13),x("click",function(){return n.setStatusFilter("PUBLISHED")}),m(22," Published "),p(),c(23,"button",14),x("click",function(){return n.setStatusFilter("DRAFT")}),m(24," Drafts "),p()()(),c(25,"div",15)(26,"button",16),x("click",function(){return n.setViewMode("grid")}),c(27,"span",17),m(28,"grid_view"),p(),c(29,"span",18),m(30,"Grid"),p()(),c(31,"button",19),x("click",function(){return n.setViewMode("list")}),c(32,"span",17),m(33,"format_list_bulleted"),p(),c(34,"span",18),m(35,"List"),p()()()(),V(36,kd,3,1,"div",20)(37,Md,3,2),p()),e&2&&(l(19),s("ngClass",Pe(6,Vo,n.statusFilter()==="ALL",n.statusFilter()!=="ALL")),l(2),s("ngClass",Pe(9,Vo,n.statusFilter()==="PUBLISHED",n.statusFilter()!=="PUBLISHED")),l(2),s("ngClass",Pe(12,Vo,n.statusFilter()==="DRAFT",n.statusFilter()!=="DRAFT")),l(3),s("ngClass",Pe(15,ca,n.viewMode()==="grid",n.viewMode()!=="grid")),l(5),s("ngClass",Pe(18,ca,n.viewMode()==="list",n.viewMode()!=="list")),l(5),z(n.store.loading()?36:37))},dependencies:[te,at,kt,wt,Et,Zt,Rn,Bi,sn],encapsulation:2})};var ma=(t,r)=>r.id;function Ld(t,r){t&1&&(c(0,"div",12)(1,"span",25),m(2,"route"),p(),c(3,"p",26),m(4,"Your path is empty"),p(),c(5,"p",27),m(6,"Add lessons from the library to start building."),p()())}function Pd(t,r){if(t&1&&(c(0,"app-badge",35),m(1),p()),t&2){let e=d().$implicit,n=d(2);l(),Q(n.getLessonTitle(e.prerequisiteId))}}function Fd(t,r){t&1&&(c(0,"span",36),m(1,"None"),p())}function Rd(t,r){if(t&1){let e=P();c(0,"div",29)(1,"div",30),m(2),p(),c(3,"div",31)(4,"div")(5,"h3",32),m(6),p(),c(7,"div",33)(8,"span",34),m(9,"Prerequisite:"),p(),V(10,Pd,2,1,"app-badge",35)(11,Fd,2,0,"span",36),p()(),c(12,"div",37)(13,"button",38),x("click",function(){let i=_(e).$index,o=d(2);return b(o.moveUp(i))}),c(14,"span",39),m(15,"arrow_upward"),p()(),c(16,"button",38),x("click",function(){let i=_(e).$index,o=d(2);return b(o.moveDown(i))}),c(17,"span",39),m(18,"arrow_downward"),p()(),c(19,"button",40),x("click",function(){let i=_(e).$index,o=d(2);return b(o.removeNode(i))}),c(20,"span",39),m(21,"delete"),p()()()()()}if(t&2){let e=r.$implicit,n=r.$index,i=d(2);l(2),$(" ",n+1," "),l(4),Q(e.title),l(4),z(e.prerequisiteId?10:11),l(3),s("disabled",n===0),l(3),s("disabled",n===i.pathNodes().length-1)}}function Bd(t,r){if(t&1&&(c(0,"div",13),F(1,"div",28),me(2,Rd,22,5,"div",29,ma),p()),t&2){let e=d();l(2),he(e.pathNodes())}}function Od(t,r){if(t&1){let e=P();c(0,"div",41),x("click",function(){let i=_(e).$implicit,o=d();return b(o.addLessonToPath(i))})("keydown.enter",function(){let i=_(e).$implicit,o=d();return b(o.addLessonToPath(i))})("keydown.space",function(){let i=_(e).$implicit,o=d();return b(o.addLessonToPath(i))}),c(1,"div",42)(2,"h4",43),m(3),p(),c(4,"span",44),m(5,"add_circle"),p()(),c(6,"p",45),m(7),p()()}if(t&2){let e=r.$implicit;D("aria-label","Add "+e.title+" to path"),l(3),Q(e.title),l(4),Q(e.subject)}}var Ai=class t{store=v(_n);router=v(Dn);route=v(En);notificationService=v(ea);pathName="";pathNodes=Z([]);addLessonToPath(r){let e={id:Math.random().toString(),lessonId:r.id,title:r.title,order:this.pathNodes().length,prerequisiteId:this.pathNodes().length>0?this.pathNodes()[this.pathNodes().length-1].lessonId:void 0};this.pathNodes.update(n=>[...n,e]),this.notificationService.info(`Added "${r.title}" to path.`)}removeNode(r){this.pathNodes.update(e=>{let n=[...e];return n.splice(r,1),n.map((i,o)=>ue(G({},i),{order:o,prerequisiteId:o>0?n[o-1].lessonId:void 0}))})}moveUp(r){r!==0&&this.pathNodes.update(e=>{let n=[...e];return[n[r-1],n[r]]=[n[r],n[r-1]],n.map((i,o)=>ue(G({},i),{order:o,prerequisiteId:o>0?n[o-1].lessonId:void 0}))})}moveDown(r){r!==this.pathNodes().length-1&&this.pathNodes.update(e=>{let n=[...e];return[n[r+1],n[r]]=[n[r],n[r+1]],n.map((i,o)=>ue(G({},i),{order:o,prerequisiteId:o>0?n[o-1].lessonId:void 0}))})}getLessonTitle(r){return this.store.lessons().find(e=>e.id===r)?.title||"Unknown Lesson"}savePath(){if(!this.pathName){this.notificationService.error("Please enter a path title.");return}if(this.pathNodes().length===0){this.notificationService.error("Please add at least one lesson to the path.");return}this.notificationService.success("Learning path saved successfully!"),this.router.navigate(["/teacher/content"])}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-path-builder"]],decls:37,vars:2,consts:[[1,"p-6","max-w-6xl","mx-auto","space-y-8","font-sans","text-black"],[1,"flex","items-center","justify-between","mb-8"],[1,"text-4xl","font-black","tracking-tight","uppercase","italic"],[1,"text-gray-600","font-bold","mt-2","italic"],[1,"flex","gap-4"],["variant","secondary",3,"click"],["variant","primary",3,"click"],[1,"material-icons","ml-2"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-8"],[1,"lg:col-span-2","space-y-6"],[1,"bg-white","border-4","border-black","rounded-3xl","p-8","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]","relative"],[1,"text-2xl","font-black","uppercase","tracking-tight","mb-8"],[1,"text-center","py-12","border-4","border-dashed","border-black","rounded-2xl","bg-gray-50"],[1,"space-y-4","relative"],[1,"space-y-6"],["title","Lesson Library"],[1,"space-y-4","max-h-[600px]","overflow-y-auto","pr-2"],["tabindex","0","role","button",1,"p-4","border-4","border-black","rounded-xl","bg-white","hover:bg-[#0ABAB5]/5","transition-colors","cursor-pointer","group","focus:outline-none","focus:ring-4","focus:ring-[#0ABAB5]/50"],["title","Path Settings"],[1,"space-y-4"],["for","pathTitle",1,"block","text-xs","font-black","uppercase","tracking-widest","text-gray-500","mb-2"],["id","pathTitle","type","text","placeholder","e.g. Algebra Fundamentals",1,"w-full","px-4","py-3","border-4","border-black","rounded-xl","font-bold","focus:outline-none","focus:bg-[#0ABAB5]/5",3,"ngModelChange","ngModel"],[1,"p-4","bg-yellow-50","border-2","border-black","rounded-xl","border-dashed"],[1,"text-xs","font-bold","text-gray-600","italic"],[1,"material-icons","text-sm","align-middle","mr-1"],[1,"material-icons","text-6xl","text-gray-300","mb-4"],[1,"text-xl","font-black","text-gray-400","uppercase","tracking-tight"],[1,"text-gray-400","font-bold","mt-2","italic"],[1,"absolute","left-6","top-0","bottom-0","w-1","bg-black/10"],[1,"relative","flex","items-center","gap-6","group"],[1,"z-10","w-12","h-12","rounded-full","border-4","border-black","bg-white","flex","items-center","justify-center","font-black","text-xl","shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]","group-hover:bg-[#0ABAB5]","group-hover:text-white","transition-colors"],[1,"flex-1","bg-white","border-4","border-black","rounded-2xl","p-4","flex","items-center","justify-between","shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]","hover:translate-x-2","transition-transform"],[1,"font-black","text-lg"],[1,"flex","items-center","gap-2","mt-1"],[1,"text-xs","font-black","uppercase","tracking-widest","text-gray-400"],["variant","secondary","size","sm"],[1,"text-xs","font-bold","text-gray-400","italic"],[1,"flex","gap-2","opacity-0","group-hover:opacity-100","transition-opacity"],[1,"p-2","hover:bg-gray-100","rounded-lg","disabled:opacity-30",3,"click","disabled"],[1,"material-icons"],[1,"p-2","hover:bg-red-50","text-red-500","rounded-lg",3,"click"],["tabindex","0","role","button",1,"p-4","border-4","border-black","rounded-xl","bg-white","hover:bg-[#0ABAB5]/5","transition-colors","cursor-pointer","group","focus:outline-none","focus:ring-4","focus:ring-[#0ABAB5]/50",3,"click","keydown.enter","keydown.space"],[1,"flex","justify-between","items-start"],[1,"font-black","text-sm","leading-tight"],[1,"material-icons","text-[#0ABAB5]","opacity-0","group-hover:opacity-100","transition-opacity"],[1,"text-[10px]","font-black","uppercase","tracking-widest","text-gray-400","mt-2"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div")(3,"h1",2),m(4,"Learning Path Builder"),p(),c(5,"p",3),m(6,"Design the journey for your students."),p()(),c(7,"div",4)(8,"app-button",5),x("click",function(){return n.router.navigate(["/teacher/content"])}),m(9,"Cancel"),p(),c(10,"app-button",6),x("click",function(){return n.savePath()}),m(11,"Save Path "),c(12,"span",7),m(13,"save"),p()()()(),c(14,"div",8)(15,"div",9)(16,"div",10)(17,"h2",11),m(18,"Path Sequence"),p(),V(19,Ld,7,0,"div",12)(20,Bd,4,0,"div",13),p()(),c(21,"div",14)(22,"app-card",15)(23,"div",16),me(24,Od,8,3,"div",17,ma),p()(),c(26,"app-card",18)(27,"div",19)(28,"div")(29,"label",20),m(30,"Path Title"),p(),c(31,"input",21),xt("ngModelChange",function(o){return vt(n.pathName,o)||(n.pathName=o),o}),p()(),c(32,"div",22)(33,"p",23)(34,"span",24),m(35,"info"),p(),m(36," Prerequisites are automatically set to the previous lesson in the sequence by default. "),p()()()()()()()),e&2&&(l(19),z(n.pathNodes().length===0?19:20),l(5),he(n.store.lessons()),l(7),yt("ngModel",n.pathName))},dependencies:[te,tt,ft,et,st,Et,Zt,Rn],encapsulation:2})};var Ni=new WeakMap,ha=(()=>{class t{_appRef;_injector=v(Bt);_environmentInjector=v(wr);load(e){let n=this._appRef=this._appRef||this._injector.get(Do),i=Ni.get(n);i||(i={loaders:new Set,refs:[]},Ni.set(n,i),n.onDestroy(()=>{Ni.get(n)?.refs.forEach(o=>o.destroy()),Ni.delete(n)})),i.loaders.has(e)||(i.loaders.add(e),i.refs.push(Mr(e,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var zo;function Vd(){if(zo==null){let t=typeof document<"u"?document.head:null;zo=!!(t&&(t.createShadowRoot||t.attachShadow))}return zo}function Hi(t){if(Vd()){let r=t.getRootNode?t.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&r instanceof ShadowRoot)return r}return null}function oi(t){return t.composedPath?t.composedPath()[0]:t.target}function fa(t){return t.buttons===0||t.detail===0}function ga(t){let r=t.touches&&t.touches[0]||t.changedTouches&&t.changedTouches[0];return!!r&&r.identifier===-1&&(r.radiusX==null||r.radiusX===1)&&(r.radiusY==null||r.radiusY===1)}function $i(t,r=0){return zd(t)?Number(t):arguments.length===2?r:0}function zd(t){return!isNaN(parseFloat(t))&&!isNaN(Number(t))}function Ht(t){return t instanceof Ot?t.nativeElement:t}var qo;try{qo=typeof Intl<"u"&&Intl.v8BreakIterator}catch{qo=!1}var Ao=(()=>{class t{_platformId=v(Tn);isBrowser=this._platformId?qe(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||qo)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var qd=new ae("cdk-dir-doc",{providedIn:"root",factory:()=>v(_t)}),Ad=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Nd(t){let r=t?.toLowerCase()||"";return r==="auto"&&typeof navigator<"u"&&navigator?.language?Ad.test(navigator.language)?"rtl":"ltr":r==="rtl"?"rtl":"ltr"}var No=(()=>{class t{get value(){return this.valueSignal()}valueSignal=Z("ltr");change=new I;constructor(){let e=v(qd,{optional:!0});if(e){let n=e.body?e.body.dir:null,i=e.documentElement?e.documentElement.dir:null;this.valueSignal.set(Nd(n||i||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var Hd=20,_a=(()=>{class t{_ngZone=v(Be);_platform=v(Ao);_renderer=v(Sn).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new Ce;_scrolledCount=0;scrollContainers=new Map;register(e){this.scrollContainers.has(e)||this.scrollContainers.set(e,e.elementScrolled().subscribe(()=>this._scrolled.next(e)))}deregister(e){let n=this.scrollContainers.get(e);n&&(n.unsubscribe(),this.scrollContainers.delete(e))}scrolled(e=Hd){return this._platform.isBrowser?new Un(n=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let i=e>0?this._scrolled.pipe(To(e)).subscribe(n):this._scrolled.subscribe(n);return this._scrolledCount++,()=>{i.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):$e()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((e,n)=>this.deregister(n)),this._scrolled.complete()}ancestorScrolled(e,n){let i=this.getAncestorScrollContainers(e);return this.scrolled(n).pipe(vr(o=>!o||i.indexOf(o)>-1))}getAncestorScrollContainers(e){let n=[];return this.scrollContainers.forEach((i,o)=>{this._scrollableContainsElement(o,e)&&n.push(o)}),n}_scrollableContainsElement(e,n){let i=Ht(n),o=e.getElementRef().nativeElement;do if(i==o)return!0;while(i=i.parentElement);return!1}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var $d=20,Ho=(()=>{class t{_platform=v(Ao);_listeners;_viewportSize=null;_change=new Ce;_document=v(_t);constructor(){let e=v(Be),n=v(Sn).createRenderer(null,null);e.runOutsideAngular(()=>{if(this._platform.isBrowser){let i=o=>this._change.next(o);this._listeners=[n.listen("window","resize",i),n.listen("window","orientationchange",i)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(e=>e()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let e={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),e}getViewportRect(){let e=this.getViewportScrollPosition(),{width:n,height:i}=this.getViewportSize();return{top:e.top,left:e.left,bottom:e.top+i,right:e.left+n,height:i,width:n}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let e=this._document,n=this._getWindow(),i=e.documentElement,o=i.getBoundingClientRect(),a=-o.top||e.body?.scrollTop||n.scrollY||i.scrollTop||0,u=-o.left||e.body?.scrollLeft||n.scrollX||i.scrollLeft||0;return{top:a,left:u}}change(e=$d){return e>0?this._change.pipe(To(e)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let e=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:e.innerWidth,height:e.innerHeight}:{width:0,height:0}}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();var ba=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({})}return t})();var $o={},ji=class t{_appId=v(kr);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(r,e=!1){return this._appId!=="ng"&&(r+=this._appId),$o.hasOwnProperty(r)||($o[r]=0),`${r}${e?t._infix+"-":""}${$o[r]++}`}static \u0275fac=function(e){return new(e||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})};function ya(t){return Array.isArray(t)?t:[t]}function Qo(t){let r=t.cloneNode(!0),e=r.querySelectorAll("[id]"),n=t.nodeName.toLowerCase();r.removeAttribute("id");for(let i=0;i<e.length;i++)e[i].removeAttribute("id");return n==="canvas"?Ca(t,r):(n==="input"||n==="select"||n==="textarea")&&xa(t,r),va("canvas",t,r,Ca),va("input, textarea, select",t,r,xa),r}function va(t,r,e,n){let i=r.querySelectorAll(t);if(i.length){let o=e.querySelectorAll(t);for(let a=0;a<i.length;a++)n(i[a],o[a])}}var jd=0;function xa(t,r){r.type!=="file"&&(r.value=t.value),r.type==="radio"&&r.name&&(r.name=`mat-clone-${r.name}-${jd++}`)}function Ca(t,r){let e=r.getContext("2d");if(e)try{e.drawImage(t,0,0)}catch{}}function Xo(t){let r=t.getBoundingClientRect();return{top:r.top,right:r.right,bottom:r.bottom,left:r.left,width:r.width,height:r.height,x:r.x,y:r.y}}function Go(t,r,e){let{top:n,bottom:i,left:o,right:a}=t;return e>=n&&e<=i&&r>=o&&r<=a}function Ud(t,r){let e=r.left<t.left,n=r.left+r.width>t.right,i=r.top<t.top,o=r.top+r.height>t.bottom;return e||n||i||o}function li(t,r,e){t.top+=r,t.bottom=t.top+t.height,t.left+=e,t.right=t.left+t.width}function wa(t,r,e,n){let{top:i,right:o,bottom:a,left:u,width:h,height:f}=t,y=h*r,S=f*r;return n>i-S&&n<a+S&&e>u-y&&e<o+y}var Ui=class{_document;positions=new Map;constructor(r){this._document=r}clear(){this.positions.clear()}cache(r){this.clear(),this.positions.set(this._document,{scrollPosition:this.getViewportScrollPosition()}),r.forEach(e=>{this.positions.set(e,{scrollPosition:{top:e.scrollTop,left:e.scrollLeft},clientRect:Xo(e)})})}handleScroll(r){let e=oi(r),n=this.positions.get(e);if(!n)return null;let i=n.scrollPosition,o,a;if(e===this._document){let f=this.getViewportScrollPosition();o=f.top,a=f.left}else o=e.scrollTop,a=e.scrollLeft;let u=i.top-o,h=i.left-a;return this.positions.forEach((f,y)=>{f.clientRect&&e!==y&&e.contains(y)&&li(f.clientRect,u,h)}),i.top=o,i.left=a,{top:u,left:h}}getViewportScrollPosition(){return{top:window.scrollY,left:window.scrollX}}};function Ba(t,r){let e=t.rootNodes;if(e.length===1&&e[0].nodeType===r.ELEMENT_NODE)return e[0];let n=r.createElement("div");return e.forEach(i=>n.appendChild(i)),n}function Jo(t,r,e){for(let n in r)if(r.hasOwnProperty(n)){let i=r[n];i?t.setProperty(n,i,e?.has(n)?"important":""):t.removeProperty(n)}return t}function On(t,r){let e=r?"":"none";Jo(t.style,{"touch-action":r?"":"none","-webkit-user-drag":r?"":"none","-webkit-tap-highlight-color":r?"":"transparent","user-select":e,"-ms-user-select":e,"-webkit-user-select":e,"-moz-user-select":e})}function ka(t,r,e){Jo(t.style,{position:r?"":"fixed",top:r?"":"0",opacity:r?"":"0",left:r?"":"-999em"},e)}function Qi(t,r){return r&&r!="none"?t+" "+r:t}function Ta(t,r){t.style.width=`${r.width}px`,t.style.height=`${r.height}px`,t.style.transform=si(r.left,r.top)}function si(t,r){return`translate3d(${Math.round(t)}px, ${Math.round(r)}px, 0)`}var ri={capture:!0},jo={passive:!1,capture:!0},Qd=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275cmp=E({type:t,selectors:[["ng-component"]],hostAttrs:["cdk-drag-resets-container",""],decls:0,vars:0,template:function(n,i){},styles:[`@layer cdk-resets {
  .cdk-drag-preview {
    background: none;
    border: none;
    padding: 0;
    color: inherit;
    inset: auto;
  }
}
.cdk-drag-placeholder *,
.cdk-drag-preview * {
  pointer-events: none !important;
}
`],encapsulation:2,changeDetection:0})}return t})(),Ki=(()=>{class t{_ngZone=v(Be);_document=v(_t);_styleLoader=v(ha);_renderer=v(Sn).createRenderer(null,null);_cleanupDocumentTouchmove;_scroll=new Ce;_dropInstances=new Set;_dragInstances=new Set;_activeDragInstances=Z([]);_globalListeners;_draggingPredicate=e=>e.isDragging();_domNodesToDirectives=null;pointerMove=new Ce;pointerUp=new Ce;constructor(){}registerDropContainer(e){this._dropInstances.has(e)||this._dropInstances.add(e)}registerDragItem(e){this._dragInstances.add(e),this._dragInstances.size===1&&this._ngZone.runOutsideAngular(()=>{this._cleanupDocumentTouchmove?.(),this._cleanupDocumentTouchmove=this._renderer.listen(this._document,"touchmove",this._persistentTouchmoveListener,jo)})}removeDropContainer(e){this._dropInstances.delete(e)}removeDragItem(e){this._dragInstances.delete(e),this.stopDragging(e),this._dragInstances.size===0&&this._cleanupDocumentTouchmove?.()}startDragging(e,n){if(!(this._activeDragInstances().indexOf(e)>-1)&&(this._styleLoader.load(Qd),this._activeDragInstances.update(i=>[...i,e]),this._activeDragInstances().length===1)){let i=n.type.startsWith("touch"),o=u=>this.pointerUp.next(u),a=[["scroll",u=>this._scroll.next(u),ri],["selectstart",this._preventDefaultWhileDragging,jo]];i?a.push(["touchend",o,ri],["touchcancel",o,ri]):a.push(["mouseup",o,ri]),i||a.push(["mousemove",u=>this.pointerMove.next(u),jo]),this._ngZone.runOutsideAngular(()=>{this._globalListeners=a.map(([u,h,f])=>this._renderer.listen(this._document,u,h,f))})}}stopDragging(e){this._activeDragInstances.update(n=>{let i=n.indexOf(e);return i>-1?(n.splice(i,1),[...n]):n}),this._activeDragInstances().length===0&&this._clearGlobalListeners()}isDragging(e){return this._activeDragInstances().indexOf(e)>-1}scrolled(e){let n=[this._scroll];return e&&e!==this._document&&n.push(new Un(i=>this._ngZone.runOutsideAngular(()=>{let o=this._renderer.listen(e,"scroll",a=>{this._activeDragInstances().length&&i.next(a)},ri);return()=>{o()}}))),gi(...n)}registerDirectiveNode(e,n){this._domNodesToDirectives??=new WeakMap,this._domNodesToDirectives.set(e,n)}removeDirectiveNode(e){this._domNodesToDirectives?.delete(e)}getDragDirectiveForNode(e){return this._domNodesToDirectives?.get(e)||null}ngOnDestroy(){this._dragInstances.forEach(e=>this.removeDragItem(e)),this._dropInstances.forEach(e=>this.removeDropContainer(e)),this._domNodesToDirectives=null,this._clearGlobalListeners(),this.pointerMove.complete(),this.pointerUp.complete()}_preventDefaultWhileDragging=e=>{this._activeDragInstances().length>0&&e.preventDefault()};_persistentTouchmoveListener=e=>{this._activeDragInstances().length>0&&(this._activeDragInstances().some(this._draggingPredicate)&&e.preventDefault(),this.pointerMove.next(e))};_clearGlobalListeners(){this._globalListeners?.forEach(e=>e()),this._globalListeners=void 0}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})();function Sa(t){let r=t.toLowerCase().indexOf("ms")>-1?1:1e3;return parseFloat(t)*r}function Gd(t){let r=getComputedStyle(t),e=Uo(r,"transition-property"),n=e.find(u=>u==="transform"||u==="all");if(!n)return 0;let i=e.indexOf(n),o=Uo(r,"transition-duration"),a=Uo(r,"transition-delay");return Sa(o[i])+Sa(a[i])}function Uo(t,r){return t.getPropertyValue(r).split(",").map(n=>n.trim())}var Wd=new Set(["position"]),Wo=class{_document;_rootElement;_direction;_initialDomRect;_previewTemplate;_previewClass;_pickupPositionOnPage;_initialTransform;_zIndex;_renderer;_previewEmbeddedView=null;_preview;get element(){return this._preview}constructor(r,e,n,i,o,a,u,h,f,y){this._document=r,this._rootElement=e,this._direction=n,this._initialDomRect=i,this._previewTemplate=o,this._previewClass=a,this._pickupPositionOnPage=u,this._initialTransform=h,this._zIndex=f,this._renderer=y}attach(r){this._preview=this._createPreview(),r.appendChild(this._preview),Ia(this._preview)&&this._preview.showPopover()}destroy(){this._preview.remove(),this._previewEmbeddedView?.destroy(),this._preview=this._previewEmbeddedView=null}setTransform(r){this._preview.style.transform=r}getBoundingClientRect(){return this._preview.getBoundingClientRect()}addClass(r){this._preview.classList.add(r)}getTransitionDuration(){return Gd(this._preview)}addEventListener(r,e){return this._renderer.listen(this._preview,r,e)}_createPreview(){let r=this._previewTemplate,e=this._previewClass,n=r?r.template:null,i;if(n&&r){let o=r.matchSize?this._initialDomRect:null,a=r.viewContainer.createEmbeddedView(n,r.context);a.detectChanges(),i=Ba(a,this._document),this._previewEmbeddedView=a,r.matchSize?Ta(i,o):i.style.transform=si(this._pickupPositionOnPage.x,this._pickupPositionOnPage.y)}else i=Qo(this._rootElement),Ta(i,this._initialDomRect),this._initialTransform&&(i.style.transform=this._initialTransform);return Jo(i.style,{"pointer-events":"none",margin:Ia(i)?"0 auto 0 0":"0",position:"fixed",top:"0",left:"0","z-index":this._zIndex+""},Wd),On(i,!1),i.classList.add("cdk-drag-preview"),i.setAttribute("popover","manual"),i.setAttribute("dir",this._direction),e&&(Array.isArray(e)?e.forEach(o=>i.classList.add(o)):i.classList.add(e)),i}};function Ia(t){return"showPopover"in t}var Kd={passive:!0},Ea={passive:!1},Yd={passive:!1,capture:!0},Zd=800,Da="cdk-drag-placeholder",Ma=new Set(["position"]);function Oa(t,r,e={dragStartThreshold:5,pointerDirectionChangeThreshold:5}){let n=t.get(Eo,null,{optional:!0})||t.get(Sn).createRenderer(null,null);return new Ko(r,e,t.get(_t),t.get(Be),t.get(Ho),t.get(Ki),n)}var Ko=class{_config;_document;_ngZone;_viewportRuler;_dragDropRegistry;_renderer;_rootElementCleanups;_cleanupShadowRootSelectStart;_preview=null;_previewContainer;_placeholderRef=null;_placeholder;_pickupPositionInElement;_pickupPositionOnPage;_marker;_anchor=null;_passiveTransform={x:0,y:0};_activeTransform={x:0,y:0};_initialTransform;_hasStartedDragging=Z(!1);_hasMoved=!1;_initialContainer;_initialIndex;_parentPositions;_moveEvents=new Ce;_pointerDirectionDelta;_pointerPositionAtLastDirectionChange;_lastKnownPointerPosition;_rootElement;_ownerSVGElement=null;_rootElementTapHighlight;_pointerMoveSubscription=yn.EMPTY;_pointerUpSubscription=yn.EMPTY;_scrollSubscription=yn.EMPTY;_resizeSubscription=yn.EMPTY;_lastTouchEventTime;_dragStartTime;_boundaryElement=null;_nativeInteractionsEnabled=!0;_initialDomRect;_previewRect;_boundaryRect;_previewTemplate;_placeholderTemplate;_handles=[];_disabledHandles=new Set;_dropContainer;_direction="ltr";_parentDragRef=null;_cachedShadowRoot;lockAxis=null;dragStartDelay=0;previewClass;scale=1;get disabled(){return this._disabled||!!(this._dropContainer&&this._dropContainer.disabled)}set disabled(r){r!==this._disabled&&(this._disabled=r,this._toggleNativeDragInteractions(),this._handles.forEach(e=>On(e,r)))}_disabled=!1;beforeStarted=new Ce;started=new Ce;released=new Ce;ended=new Ce;entered=new Ce;exited=new Ce;dropped=new Ce;moved=this._moveEvents;data;constrainPosition;constructor(r,e,n,i,o,a,u){this._config=e,this._document=n,this._ngZone=i,this._viewportRuler=o,this._dragDropRegistry=a,this._renderer=u,this.withRootElement(r).withParent(e.parentDragRef||null),this._parentPositions=new Ui(n),a.registerDragItem(this)}getPlaceholderElement(){return this._placeholder}getRootElement(){return this._rootElement}getVisibleElement(){return this.isDragging()?this.getPlaceholderElement():this.getRootElement()}withHandles(r){this._handles=r.map(n=>Ht(n)),this._handles.forEach(n=>On(n,this.disabled)),this._toggleNativeDragInteractions();let e=new Set;return this._disabledHandles.forEach(n=>{this._handles.indexOf(n)>-1&&e.add(n)}),this._disabledHandles=e,this}withPreviewTemplate(r){return this._previewTemplate=r,this}withPlaceholderTemplate(r){return this._placeholderTemplate=r,this}withRootElement(r){let e=Ht(r);if(e!==this._rootElement){this._removeRootElementListeners();let n=this._renderer;this._rootElementCleanups=this._ngZone.runOutsideAngular(()=>[n.listen(e,"mousedown",this._pointerDown,Ea),n.listen(e,"touchstart",this._pointerDown,Kd),n.listen(e,"dragstart",this._nativeDragStart,Ea)]),this._initialTransform=void 0,this._rootElement=e}return typeof SVGElement<"u"&&this._rootElement instanceof SVGElement&&(this._ownerSVGElement=this._rootElement.ownerSVGElement),this}withBoundaryElement(r){return this._boundaryElement=r?Ht(r):null,this._resizeSubscription.unsubscribe(),r&&(this._resizeSubscription=this._viewportRuler.change(10).subscribe(()=>this._containInsideBoundaryOnResize())),this}withParent(r){return this._parentDragRef=r,this}dispose(){this._removeRootElementListeners(),this.isDragging()&&this._rootElement?.remove(),this._marker?.remove(),this._destroyPreview(),this._destroyPlaceholder(),this._dragDropRegistry.removeDragItem(this),this._removeListeners(),this.beforeStarted.complete(),this.started.complete(),this.released.complete(),this.ended.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this._moveEvents.complete(),this._handles=[],this._disabledHandles.clear(),this._dropContainer=void 0,this._resizeSubscription.unsubscribe(),this._parentPositions.clear(),this._boundaryElement=this._rootElement=this._ownerSVGElement=this._placeholderTemplate=this._previewTemplate=this._marker=this._parentDragRef=null}isDragging(){return this._hasStartedDragging()&&this._dragDropRegistry.isDragging(this)}reset(){this._rootElement.style.transform=this._initialTransform||"",this._activeTransform={x:0,y:0},this._passiveTransform={x:0,y:0}}resetToBoundary(){if(this._boundaryElement&&this._rootElement&&Ud(this._boundaryElement.getBoundingClientRect(),this._rootElement.getBoundingClientRect())){let r=this._boundaryElement.getBoundingClientRect(),e=this._rootElement.getBoundingClientRect(),n=0,i=0;e.left<r.left?n=r.left-e.left:e.right>r.right&&(n=r.right-e.right),e.top<r.top?i=r.top-e.top:e.bottom>r.bottom&&(i=r.bottom-e.bottom);let o=this._activeTransform.x,a=this._activeTransform.y,u=o+n,h=a+i;this._rootElement.style.transform=si(u,h),this._activeTransform={x:u,y:h},this._passiveTransform={x:u,y:h}}}disableHandle(r){!this._disabledHandles.has(r)&&this._handles.indexOf(r)>-1&&(this._disabledHandles.add(r),On(r,!0))}enableHandle(r){this._disabledHandles.has(r)&&(this._disabledHandles.delete(r),On(r,this.disabled))}withDirection(r){return this._direction=r,this}_withDropContainer(r){this._dropContainer=r}getFreeDragPosition(){let r=this.isDragging()?this._activeTransform:this._passiveTransform;return{x:r.x,y:r.y}}setFreeDragPosition(r){return this._activeTransform={x:0,y:0},this._passiveTransform.x=r.x,this._passiveTransform.y=r.y,this._dropContainer||this._applyRootElementTransform(r.x,r.y),this}withPreviewContainer(r){return this._previewContainer=r,this}_sortFromLastPointerPosition(){let r=this._lastKnownPointerPosition;r&&this._dropContainer&&this._updateActiveDropContainer(this._getConstrainedPointerPosition(r),r)}_removeListeners(){this._pointerMoveSubscription.unsubscribe(),this._pointerUpSubscription.unsubscribe(),this._scrollSubscription.unsubscribe(),this._cleanupShadowRootSelectStart?.(),this._cleanupShadowRootSelectStart=void 0}_destroyPreview(){this._preview?.destroy(),this._preview=null}_destroyPlaceholder(){this._anchor?.remove(),this._placeholder?.remove(),this._placeholderRef?.destroy(),this._placeholder=this._anchor=this._placeholderRef=null}_pointerDown=r=>{if(this.beforeStarted.next(),this._handles.length){let e=this._getTargetHandle(r);e&&!this._disabledHandles.has(e)&&!this.disabled&&this._initializeDragSequence(e,r)}else this.disabled||this._initializeDragSequence(this._rootElement,r)};_pointerMove=r=>{let e=this._getPointerPositionOnPage(r);if(!this._hasStartedDragging()){let i=Math.abs(e.x-this._pickupPositionOnPage.x),o=Math.abs(e.y-this._pickupPositionOnPage.y);if(i+o>=this._config.dragStartThreshold){let u=Date.now()>=this._dragStartTime+this._getDragStartDelay(r),h=this._dropContainer;if(!u){this._endDragSequence(r);return}(!h||!h.isDragging()&&!h.isReceiving())&&(r.cancelable&&r.preventDefault(),this._hasStartedDragging.set(!0),this._ngZone.run(()=>this._startDragSequence(r)))}return}r.cancelable&&r.preventDefault();let n=this._getConstrainedPointerPosition(e);if(this._hasMoved=!0,this._lastKnownPointerPosition=e,this._updatePointerDirectionDelta(n),this._dropContainer)this._updateActiveDropContainer(n,e);else{let i=this.constrainPosition?this._initialDomRect:this._pickupPositionOnPage,o=this._activeTransform;o.x=n.x-i.x+this._passiveTransform.x,o.y=n.y-i.y+this._passiveTransform.y,this._applyRootElementTransform(o.x,o.y)}this._moveEvents.observers.length&&this._ngZone.run(()=>{this._moveEvents.next({source:this,pointerPosition:n,event:r,distance:this._getDragDistance(n),delta:this._pointerDirectionDelta})})};_pointerUp=r=>{this._endDragSequence(r)};_endDragSequence(r){if(this._dragDropRegistry.isDragging(this)&&(this._removeListeners(),this._dragDropRegistry.stopDragging(this),this._toggleNativeDragInteractions(),this._handles&&(this._rootElement.style.webkitTapHighlightColor=this._rootElementTapHighlight),!!this._hasStartedDragging()))if(this.released.next({source:this,event:r}),this._dropContainer)this._dropContainer._stopScrolling(),this._animatePreviewToPlaceholder().then(()=>{this._cleanupDragArtifacts(r),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this)});else{this._passiveTransform.x=this._activeTransform.x;let e=this._getPointerPositionOnPage(r);this._passiveTransform.y=this._activeTransform.y,this._ngZone.run(()=>{this.ended.next({source:this,distance:this._getDragDistance(e),dropPoint:e,event:r})}),this._cleanupCachedDimensions(),this._dragDropRegistry.stopDragging(this)}}_startDragSequence(r){ai(r)&&(this._lastTouchEventTime=Date.now()),this._toggleNativeDragInteractions();let e=this._getShadowRoot(),n=this._dropContainer;if(e&&this._ngZone.runOutsideAngular(()=>{this._cleanupShadowRootSelectStart=this._renderer.listen(e,"selectstart",Xd,Yd)}),n){let i=this._rootElement,o=i.parentNode,a=this._placeholder=this._createPlaceholderElement(),u=this._marker=this._marker||this._document.createComment("");o.insertBefore(u,i),this._initialTransform=i.style.transform||"",this._preview=new Wo(this._document,this._rootElement,this._direction,this._initialDomRect,this._previewTemplate||null,this.previewClass||null,this._pickupPositionOnPage,this._initialTransform,this._config.zIndex||1e3,this._renderer),this._preview.attach(this._getPreviewInsertionPoint(o,e)),ka(i,!1,Ma),this._document.body.appendChild(o.replaceChild(a,i)),this.started.next({source:this,event:r}),n.start(),this._initialContainer=n,this._initialIndex=n.getItemIndex(this)}else this.started.next({source:this,event:r}),this._initialContainer=this._initialIndex=void 0;this._parentPositions.cache(n?n.getScrollableParents():[])}_initializeDragSequence(r,e){this._parentDragRef&&e.stopPropagation();let n=this.isDragging(),i=ai(e),o=!i&&e.button!==0,a=this._rootElement,u=oi(e),h=!i&&this._lastTouchEventTime&&this._lastTouchEventTime+Zd>Date.now(),f=i?ga(e):fa(e);if(u&&u.draggable&&e.type==="mousedown"&&e.preventDefault(),n||o||h||f)return;if(this._handles.length){let N=a.style;this._rootElementTapHighlight=N.webkitTapHighlightColor||"",N.webkitTapHighlightColor="transparent"}this._hasMoved=!1,this._hasStartedDragging.set(this._hasMoved),this._removeListeners(),this._initialDomRect=this._rootElement.getBoundingClientRect(),this._pointerMoveSubscription=this._dragDropRegistry.pointerMove.subscribe(this._pointerMove),this._pointerUpSubscription=this._dragDropRegistry.pointerUp.subscribe(this._pointerUp),this._scrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(N=>this._updateOnScroll(N)),this._boundaryElement&&(this._boundaryRect=Xo(this._boundaryElement));let y=this._previewTemplate;this._pickupPositionInElement=y&&y.template&&!y.matchSize?{x:0,y:0}:this._getPointerPositionInElement(this._initialDomRect,r,e);let S=this._pickupPositionOnPage=this._lastKnownPointerPosition=this._getPointerPositionOnPage(e);this._pointerDirectionDelta={x:0,y:0},this._pointerPositionAtLastDirectionChange={x:S.x,y:S.y},this._dragStartTime=Date.now(),this._dragDropRegistry.startDragging(this,e)}_cleanupDragArtifacts(r){ka(this._rootElement,!0,Ma),this._marker.parentNode.replaceChild(this._rootElement,this._marker),this._destroyPreview(),this._destroyPlaceholder(),this._initialDomRect=this._boundaryRect=this._previewRect=this._initialTransform=void 0,this._ngZone.run(()=>{let e=this._dropContainer,n=e.getItemIndex(this),i=this._getPointerPositionOnPage(r),o=this._getDragDistance(i),a=e._isOverContainer(i.x,i.y);this.ended.next({source:this,distance:o,dropPoint:i,event:r}),this.dropped.next({item:this,currentIndex:n,previousIndex:this._initialIndex,container:e,previousContainer:this._initialContainer,isPointerOverContainer:a,distance:o,dropPoint:i,event:r}),e.drop(this,n,this._initialIndex,this._initialContainer,a,o,i,r),this._dropContainer=this._initialContainer})}_updateActiveDropContainer({x:r,y:e},{x:n,y:i}){let o=this._initialContainer._getSiblingContainerFromPosition(this,r,e);!o&&this._dropContainer!==this._initialContainer&&this._initialContainer._isOverContainer(r,e)&&(o=this._initialContainer),o&&o!==this._dropContainer&&this._ngZone.run(()=>{let a=this._dropContainer.getItemIndex(this),u=this._dropContainer.getItemAtIndex(a+1)?.getVisibleElement()||null;this.exited.next({item:this,container:this._dropContainer}),this._dropContainer.exit(this),this._conditionallyInsertAnchor(o,this._dropContainer,u),this._dropContainer=o,this._dropContainer.enter(this,r,e,o===this._initialContainer&&o.sortingDisabled?this._initialIndex:void 0),this.entered.next({item:this,container:o,currentIndex:o.getItemIndex(this)})}),this.isDragging()&&(this._dropContainer._startScrollingIfNecessary(n,i),this._dropContainer._sortItem(this,r,e,this._pointerDirectionDelta),this.constrainPosition?this._applyPreviewTransform(r,e):this._applyPreviewTransform(r-this._pickupPositionInElement.x,e-this._pickupPositionInElement.y))}_animatePreviewToPlaceholder(){if(!this._hasMoved)return Promise.resolve();let r=this._placeholder.getBoundingClientRect();this._preview.addClass("cdk-drag-animating"),this._applyPreviewTransform(r.left,r.top);let e=this._preview.getTransitionDuration();return e===0?Promise.resolve():this._ngZone.runOutsideAngular(()=>new Promise(n=>{let i=u=>{(!u||this._preview&&oi(u)===this._preview.element&&u.propertyName==="transform")&&(a(),n(),clearTimeout(o))},o=setTimeout(i,e*1.5),a=this._preview.addEventListener("transitionend",i)}))}_createPlaceholderElement(){let r=this._placeholderTemplate,e=r?r.template:null,n;return e?(this._placeholderRef=r.viewContainer.createEmbeddedView(e,r.context),this._placeholderRef.detectChanges(),n=Ba(this._placeholderRef,this._document)):n=Qo(this._rootElement),n.style.pointerEvents="none",n.classList.add(Da),n}_getPointerPositionInElement(r,e,n){let i=e===this._rootElement?null:e,o=i?i.getBoundingClientRect():r,a=ai(n)?n.targetTouches[0]:n,u=this._getViewportScrollPosition(),h=a.pageX-o.left-u.left,f=a.pageY-o.top-u.top;return{x:o.left-r.left+h,y:o.top-r.top+f}}_getPointerPositionOnPage(r){let e=this._getViewportScrollPosition(),n=ai(r)?r.touches[0]||r.changedTouches[0]||{pageX:0,pageY:0}:r,i=n.pageX-e.left,o=n.pageY-e.top;if(this._ownerSVGElement){let a=this._ownerSVGElement.getScreenCTM();if(a){let u=this._ownerSVGElement.createSVGPoint();return u.x=i,u.y=o,u.matrixTransform(a.inverse())}}return{x:i,y:o}}_getConstrainedPointerPosition(r){let e=this._dropContainer?this._dropContainer.lockAxis:null,{x:n,y:i}=this.constrainPosition?this.constrainPosition(r,this,this._initialDomRect,this._pickupPositionInElement):r;if(this.lockAxis==="x"||e==="x"?i=this._pickupPositionOnPage.y-(this.constrainPosition?this._pickupPositionInElement.y:0):(this.lockAxis==="y"||e==="y")&&(n=this._pickupPositionOnPage.x-(this.constrainPosition?this._pickupPositionInElement.x:0)),this._boundaryRect){let{x:o,y:a}=this.constrainPosition?{x:0,y:0}:this._pickupPositionInElement,u=this._boundaryRect,{width:h,height:f}=this._getPreviewRect(),y=u.top+a,S=u.bottom-(f-a),N=u.left+o,B=u.right-(h-o);n=La(n,N,B),i=La(i,y,S)}return{x:n,y:i}}_updatePointerDirectionDelta(r){let{x:e,y:n}=r,i=this._pointerDirectionDelta,o=this._pointerPositionAtLastDirectionChange,a=Math.abs(e-o.x),u=Math.abs(n-o.y);return a>this._config.pointerDirectionChangeThreshold&&(i.x=e>o.x?1:-1,o.x=e),u>this._config.pointerDirectionChangeThreshold&&(i.y=n>o.y?1:-1,o.y=n),i}_toggleNativeDragInteractions(){if(!this._rootElement||!this._handles)return;let r=this._handles.length>0||!this.isDragging();r!==this._nativeInteractionsEnabled&&(this._nativeInteractionsEnabled=r,On(this._rootElement,r))}_removeRootElementListeners(){this._rootElementCleanups?.forEach(r=>r()),this._rootElementCleanups=void 0}_applyRootElementTransform(r,e){let n=1/this.scale,i=si(r*n,e*n),o=this._rootElement.style;this._initialTransform==null&&(this._initialTransform=o.transform&&o.transform!="none"?o.transform:""),o.transform=Qi(i,this._initialTransform)}_applyPreviewTransform(r,e){let n=this._previewTemplate?.template?void 0:this._initialTransform,i=si(r,e);this._preview.setTransform(Qi(i,n))}_getDragDistance(r){let e=this._pickupPositionOnPage;return e?{x:r.x-e.x,y:r.y-e.y}:{x:0,y:0}}_cleanupCachedDimensions(){this._boundaryRect=this._previewRect=void 0,this._parentPositions.clear()}_containInsideBoundaryOnResize(){let{x:r,y:e}=this._passiveTransform;if(r===0&&e===0||this.isDragging()||!this._boundaryElement)return;let n=this._rootElement.getBoundingClientRect(),i=this._boundaryElement.getBoundingClientRect();if(i.width===0&&i.height===0||n.width===0&&n.height===0)return;let o=i.left-n.left,a=n.right-i.right,u=i.top-n.top,h=n.bottom-i.bottom;i.width>n.width?(o>0&&(r+=o),a>0&&(r-=a)):r=0,i.height>n.height?(u>0&&(e+=u),h>0&&(e-=h)):e=0,(r!==this._passiveTransform.x||e!==this._passiveTransform.y)&&this.setFreeDragPosition({y:e,x:r})}_getDragStartDelay(r){let e=this.dragStartDelay;return typeof e=="number"?e:ai(r)?e.touch:e?e.mouse:0}_updateOnScroll(r){let e=this._parentPositions.handleScroll(r);if(e){let n=oi(r);this._boundaryRect&&n!==this._boundaryElement&&n.contains(this._boundaryElement)&&li(this._boundaryRect,e.top,e.left),this._pickupPositionOnPage.x+=e.left,this._pickupPositionOnPage.y+=e.top,this._dropContainer||(this._activeTransform.x-=e.left,this._activeTransform.y-=e.top,this._applyRootElementTransform(this._activeTransform.x,this._activeTransform.y))}}_getViewportScrollPosition(){return this._parentPositions.positions.get(this._document)?.scrollPosition||this._parentPositions.getViewportScrollPosition()}_getShadowRoot(){return this._cachedShadowRoot===void 0&&(this._cachedShadowRoot=Hi(this._rootElement)),this._cachedShadowRoot}_getPreviewInsertionPoint(r,e){let n=this._previewContainer||"global";if(n==="parent")return r;if(n==="global"){let i=this._document;return e||i.fullscreenElement||i.webkitFullscreenElement||i.mozFullScreenElement||i.msFullscreenElement||i.body}return Ht(n)}_getPreviewRect(){return(!this._previewRect||!this._previewRect.width&&!this._previewRect.height)&&(this._previewRect=this._preview?this._preview.getBoundingClientRect():this._initialDomRect),this._previewRect}_nativeDragStart=r=>{if(this._handles.length){let e=this._getTargetHandle(r);e&&!this._disabledHandles.has(e)&&!this.disabled&&r.preventDefault()}else this.disabled||r.preventDefault()};_getTargetHandle(r){return this._handles.find(e=>r.target&&(r.target===e||e.contains(r.target)))}_conditionallyInsertAnchor(r,e,n){if(r===this._initialContainer)this._anchor?.remove(),this._anchor=null;else if(e===this._initialContainer&&e.hasAnchor){let i=this._anchor??=Qo(this._placeholder);i.classList.remove(Da),i.classList.add("cdk-drag-anchor"),i.style.transform="",n?n.before(i):Ht(e.element).appendChild(i)}}};function La(t,r,e){return Math.max(r,Math.min(e,t))}function ai(t){return t.type[0]==="t"}function Xd(t){t.preventDefault()}function Vn(t,r,e){let n=Pa(r,t.length-1),i=Pa(e,t.length-1);if(n===i)return;let o=t[n],a=i<n?-1:1;for(let u=n;u!==i;u+=a)t[u]=t[u+a];t[i]=o}function Pa(t,r){return Math.max(0,Math.min(r,t))}var Gi=class{_dragDropRegistry;_element;_sortPredicate;_itemPositions=[];_activeDraggables;orientation="vertical";direction="ltr";constructor(r){this._dragDropRegistry=r}_previousSwap={drag:null,delta:0,overlaps:!1};start(r){this.withItems(r)}sort(r,e,n,i){let o=this._itemPositions,a=this._getItemIndexFromPointerPosition(r,e,n,i);if(a===-1&&o.length>0)return null;let u=this.orientation==="horizontal",h=o.findIndex(H=>H.drag===r),f=o[a],y=o[h].clientRect,S=f.clientRect,N=h>a?1:-1,B=this._getItemOffsetPx(y,S,N),q=this._getSiblingOffsetPx(h,o,N),j=o.slice();return Vn(o,h,a),o.forEach((H,pe)=>{if(j[pe]===H)return;let ke=H.drag===r,xe=ke?B:q,He=ke?r.getPlaceholderElement():H.drag.getRootElement();H.offset+=xe;let dt=Math.round(H.offset*(1/H.drag.scale));u?(He.style.transform=Qi(`translate3d(${dt}px, 0, 0)`,H.initialTransform),li(H.clientRect,0,xe)):(He.style.transform=Qi(`translate3d(0, ${dt}px, 0)`,H.initialTransform),li(H.clientRect,xe,0))}),this._previousSwap.overlaps=Go(S,e,n),this._previousSwap.drag=f.drag,this._previousSwap.delta=u?i.x:i.y,{previousIndex:h,currentIndex:a}}enter(r,e,n,i){let o=this._activeDraggables,a=o.indexOf(r),u=r.getPlaceholderElement();a>-1&&o.splice(a,1);let h=i==null||i<0?this._getItemIndexFromPointerPosition(r,e,n):i,f=o[h];if(f===r&&(f=o[h+1]),!f&&(h==null||h===-1||h<o.length-1)&&this._shouldEnterAsFirstChild(e,n)&&(f=o[0]),f&&!this._dragDropRegistry.isDragging(f)){let y=f.getRootElement();y.parentElement.insertBefore(u,y),o.splice(h,0,r)}else this._element.appendChild(u),o.push(r);u.style.transform="",this._cacheItemPositions()}withItems(r){this._activeDraggables=r.slice(),this._cacheItemPositions()}withSortPredicate(r){this._sortPredicate=r}reset(){this._activeDraggables?.forEach(r=>{let e=r.getRootElement();if(e){let n=this._itemPositions.find(i=>i.drag===r)?.initialTransform;e.style.transform=n||""}}),this._itemPositions=[],this._activeDraggables=[],this._previousSwap.drag=null,this._previousSwap.delta=0,this._previousSwap.overlaps=!1}getActiveItemsSnapshot(){return this._activeDraggables}getItemIndex(r){return this._getVisualItemPositions().findIndex(e=>e.drag===r)}getItemAtIndex(r){return this._getVisualItemPositions()[r]?.drag||null}updateOnScroll(r,e){this._itemPositions.forEach(({clientRect:n})=>{li(n,r,e)}),this._itemPositions.forEach(({drag:n})=>{this._dragDropRegistry.isDragging(n)&&n._sortFromLastPointerPosition()})}withElementContainer(r){this._element=r}_cacheItemPositions(){let r=this.orientation==="horizontal";this._itemPositions=this._activeDraggables.map(e=>{let n=e.getVisibleElement();return{drag:e,offset:0,initialTransform:n.style.transform||"",clientRect:Xo(n)}}).sort((e,n)=>r?e.clientRect.left-n.clientRect.left:e.clientRect.top-n.clientRect.top)}_getVisualItemPositions(){return this.orientation==="horizontal"&&this.direction==="rtl"?this._itemPositions.slice().reverse():this._itemPositions}_getItemOffsetPx(r,e,n){let i=this.orientation==="horizontal",o=i?e.left-r.left:e.top-r.top;return n===-1&&(o+=i?e.width-r.width:e.height-r.height),o}_getSiblingOffsetPx(r,e,n){let i=this.orientation==="horizontal",o=e[r].clientRect,a=e[r+n*-1],u=o[i?"width":"height"]*n;if(a){let h=i?"left":"top",f=i?"right":"bottom";n===-1?u-=a.clientRect[h]-o[f]:u+=o[h]-a.clientRect[f]}return u}_shouldEnterAsFirstChild(r,e){if(!this._activeDraggables.length)return!1;let n=this._itemPositions,i=this.orientation==="horizontal";if(n[0].drag!==this._activeDraggables[0]){let a=n[n.length-1].clientRect;return i?r>=a.right:e>=a.bottom}else{let a=n[0].clientRect;return i?r<=a.left:e<=a.top}}_getItemIndexFromPointerPosition(r,e,n,i){let o=this.orientation==="horizontal",a=this._itemPositions.findIndex(({drag:u,clientRect:h})=>{if(u===r)return!1;if(i){let f=o?i.x:i.y;if(u===this._previousSwap.drag&&this._previousSwap.overlaps&&f===this._previousSwap.delta)return!1}return o?e>=Math.floor(h.left)&&e<Math.floor(h.right):n>=Math.floor(h.top)&&n<Math.floor(h.bottom)});return a===-1||!this._sortPredicate(a,r)?-1:a}},Yo=class{_document;_dragDropRegistry;_element;_sortPredicate;_rootNode;_activeItems;_previousSwap={drag:null,deltaX:0,deltaY:0,overlaps:!1};_relatedNodes=[];constructor(r,e){this._document=r,this._dragDropRegistry=e}start(r){let e=this._element.childNodes;this._relatedNodes=[];for(let n=0;n<e.length;n++){let i=e[n];this._relatedNodes.push([i,i.nextSibling])}this.withItems(r)}sort(r,e,n,i){let o=this._getItemIndexFromPointerPosition(r,e,n),a=this._previousSwap;if(o===-1||this._activeItems[o]===r)return null;let u=this._activeItems[o];if(a.drag===u&&a.overlaps&&a.deltaX===i.x&&a.deltaY===i.y)return null;let h=this.getItemIndex(r),f=r.getPlaceholderElement(),y=u.getRootElement();o>h?y.after(f):y.before(f),Vn(this._activeItems,h,o);let S=this._getRootNode().elementFromPoint(e,n);return a.deltaX=i.x,a.deltaY=i.y,a.drag=u,a.overlaps=y===S||y.contains(S),{previousIndex:h,currentIndex:o}}enter(r,e,n,i){let o=this._activeItems.indexOf(r);o>-1&&this._activeItems.splice(o,1);let a=i==null||i<0?this._getItemIndexFromPointerPosition(r,e,n):i;a===-1&&(a=this._getClosestItemIndexToPointer(r,e,n));let u=this._activeItems[a];u&&!this._dragDropRegistry.isDragging(u)?(this._activeItems.splice(a,0,r),u.getRootElement().before(r.getPlaceholderElement())):(this._activeItems.push(r),this._element.appendChild(r.getPlaceholderElement()))}withItems(r){this._activeItems=r.slice()}withSortPredicate(r){this._sortPredicate=r}reset(){let r=this._element,e=this._previousSwap;for(let n=this._relatedNodes.length-1;n>-1;n--){let[i,o]=this._relatedNodes[n];i.parentNode===r&&i.nextSibling!==o&&(o===null?r.appendChild(i):o.parentNode===r&&r.insertBefore(i,o))}this._relatedNodes=[],this._activeItems=[],e.drag=null,e.deltaX=e.deltaY=0,e.overlaps=!1}getActiveItemsSnapshot(){return this._activeItems}getItemIndex(r){return this._activeItems.indexOf(r)}getItemAtIndex(r){return this._activeItems[r]||null}updateOnScroll(){this._activeItems.forEach(r=>{this._dragDropRegistry.isDragging(r)&&r._sortFromLastPointerPosition()})}withElementContainer(r){r!==this._element&&(this._element=r,this._rootNode=void 0)}_getItemIndexFromPointerPosition(r,e,n){let i=this._getRootNode().elementFromPoint(Math.floor(e),Math.floor(n)),o=i?this._activeItems.findIndex(a=>{let u=a.getRootElement();return i===u||u.contains(i)}):-1;return o===-1||!this._sortPredicate(o,r)?-1:o}_getRootNode(){return this._rootNode||(this._rootNode=Hi(this._element)||this._document),this._rootNode}_getClosestItemIndexToPointer(r,e,n){if(this._activeItems.length===0)return-1;if(this._activeItems.length===1)return 0;let i=1/0,o=-1;for(let a=0;a<this._activeItems.length;a++){let u=this._activeItems[a];if(u!==r){let{x:h,y:f}=u.getRootElement().getBoundingClientRect(),y=Math.hypot(e-h,n-f);y<i&&(i=y,o=a)}}return o}},Fa=.05,Va=.05,Mt=(function(t){return t[t.NONE=0]="NONE",t[t.UP=1]="UP",t[t.DOWN=2]="DOWN",t})(Mt||{}),ut=(function(t){return t[t.NONE=0]="NONE",t[t.LEFT=1]="LEFT",t[t.RIGHT=2]="RIGHT",t})(ut||{});function za(t,r){return new Zo(r,t.get(Ki),t.get(_t),t.get(Be),t.get(Ho))}var Zo=class{_dragDropRegistry;_ngZone;_viewportRuler;element;disabled=!1;sortingDisabled=!1;lockAxis=null;autoScrollDisabled=!1;autoScrollStep=2;hasAnchor=!1;enterPredicate=()=>!0;sortPredicate=()=>!0;beforeStarted=new Ce;entered=new Ce;exited=new Ce;dropped=new Ce;sorted=new Ce;receivingStarted=new Ce;receivingStopped=new Ce;data;_container;_isDragging=!1;_parentPositions;_sortStrategy;_domRect;_draggables=[];_siblings=[];_activeSiblings=new Set;_viewportScrollSubscription=yn.EMPTY;_verticalScrollDirection=Mt.NONE;_horizontalScrollDirection=ut.NONE;_scrollNode;_stopScrollTimers=new Ce;_cachedShadowRoot=null;_document;_scrollableElements=[];_initialScrollSnap;_direction="ltr";constructor(r,e,n,i,o){this._dragDropRegistry=e,this._ngZone=i,this._viewportRuler=o;let a=this.element=Ht(r);this._document=n,this.withOrientation("vertical").withElementContainer(a),e.registerDropContainer(this),this._parentPositions=new Ui(n)}dispose(){this._stopScrolling(),this._stopScrollTimers.complete(),this._viewportScrollSubscription.unsubscribe(),this.beforeStarted.complete(),this.entered.complete(),this.exited.complete(),this.dropped.complete(),this.sorted.complete(),this.receivingStarted.complete(),this.receivingStopped.complete(),this._activeSiblings.clear(),this._scrollNode=null,this._parentPositions.clear(),this._dragDropRegistry.removeDropContainer(this)}isDragging(){return this._isDragging}start(){this._draggingStarted(),this._notifyReceivingSiblings()}enter(r,e,n,i){this._draggingStarted(),i==null&&this.sortingDisabled&&(i=this._draggables.indexOf(r)),this._sortStrategy.enter(r,e,n,i),this._cacheParentPositions(),this._notifyReceivingSiblings(),this.entered.next({item:r,container:this,currentIndex:this.getItemIndex(r)})}exit(r){this._reset(),this.exited.next({item:r,container:this})}drop(r,e,n,i,o,a,u,h={}){this._reset(),this.dropped.next({item:r,currentIndex:e,previousIndex:n,container:this,previousContainer:i,isPointerOverContainer:o,distance:a,dropPoint:u,event:h})}withItems(r){let e=this._draggables;return this._draggables=r,r.forEach(n=>n._withDropContainer(this)),this.isDragging()&&(e.filter(i=>i.isDragging()).every(i=>r.indexOf(i)===-1)?this._reset():this._sortStrategy.withItems(this._draggables)),this}withDirection(r){return this._direction=r,this._sortStrategy instanceof Gi&&(this._sortStrategy.direction=r),this}connectedTo(r){return this._siblings=r.slice(),this}withOrientation(r){if(r==="mixed")this._sortStrategy=new Yo(this._document,this._dragDropRegistry);else{let e=new Gi(this._dragDropRegistry);e.direction=this._direction,e.orientation=r,this._sortStrategy=e}return this._sortStrategy.withElementContainer(this._container),this._sortStrategy.withSortPredicate((e,n)=>this.sortPredicate(e,n,this)),this}withScrollableParents(r){let e=this._container;return this._scrollableElements=r.indexOf(e)===-1?[e,...r]:r.slice(),this}withElementContainer(r){if(r===this._container)return this;let e=Ht(this.element),n=this._scrollableElements.indexOf(this._container),i=this._scrollableElements.indexOf(r);return n>-1&&this._scrollableElements.splice(n,1),i>-1&&this._scrollableElements.splice(i,1),this._sortStrategy&&this._sortStrategy.withElementContainer(r),this._cachedShadowRoot=null,this._scrollableElements.unshift(r),this._container=r,this}getScrollableParents(){return this._scrollableElements}getItemIndex(r){return this._isDragging?this._sortStrategy.getItemIndex(r):this._draggables.indexOf(r)}getItemAtIndex(r){return this._isDragging?this._sortStrategy.getItemAtIndex(r):this._draggables[r]||null}isReceiving(){return this._activeSiblings.size>0}_sortItem(r,e,n,i){if(this.sortingDisabled||!this._domRect||!wa(this._domRect,Fa,e,n))return;let o=this._sortStrategy.sort(r,e,n,i);o&&this.sorted.next({previousIndex:o.previousIndex,currentIndex:o.currentIndex,container:this,item:r})}_startScrollingIfNecessary(r,e){if(this.autoScrollDisabled)return;let n,i=Mt.NONE,o=ut.NONE;if(this._parentPositions.positions.forEach((a,u)=>{u===this._document||!a.clientRect||n||wa(a.clientRect,Fa,r,e)&&([i,o]=Jd(u,a.clientRect,this._direction,r,e),(i||o)&&(n=u))}),!i&&!o){let{width:a,height:u}=this._viewportRuler.getViewportSize(),h={width:a,height:u,top:0,right:a,bottom:u,left:0};i=qa(h,e),o=Aa(h,r),n=window}n&&(i!==this._verticalScrollDirection||o!==this._horizontalScrollDirection||n!==this._scrollNode)&&(this._verticalScrollDirection=i,this._horizontalScrollDirection=o,this._scrollNode=n,(i||o)&&n?this._ngZone.runOutsideAngular(this._startScrollInterval):this._stopScrolling())}_stopScrolling(){this._stopScrollTimers.next()}_draggingStarted(){let r=this._container.style;this.beforeStarted.next(),this._isDragging=!0,this._initialScrollSnap=r.msScrollSnapType||r.scrollSnapType||"",r.scrollSnapType=r.msScrollSnapType="none",this._sortStrategy.start(this._draggables),this._cacheParentPositions(),this._viewportScrollSubscription.unsubscribe(),this._listenToScrollEvents()}_cacheParentPositions(){this._parentPositions.cache(this._scrollableElements),this._domRect=this._parentPositions.positions.get(this._container).clientRect}_reset(){this._isDragging=!1;let r=this._container.style;r.scrollSnapType=r.msScrollSnapType=this._initialScrollSnap,this._siblings.forEach(e=>e._stopReceiving(this)),this._sortStrategy.reset(),this._stopScrolling(),this._viewportScrollSubscription.unsubscribe(),this._parentPositions.clear()}_startScrollInterval=()=>{this._stopScrolling(),yr(0,wo).pipe(Rt(this._stopScrollTimers)).subscribe(()=>{let r=this._scrollNode,e=this.autoScrollStep;this._verticalScrollDirection===Mt.UP?r.scrollBy(0,-e):this._verticalScrollDirection===Mt.DOWN&&r.scrollBy(0,e),this._horizontalScrollDirection===ut.LEFT?r.scrollBy(-e,0):this._horizontalScrollDirection===ut.RIGHT&&r.scrollBy(e,0)})};_isOverContainer(r,e){return this._domRect!=null&&Go(this._domRect,r,e)}_getSiblingContainerFromPosition(r,e,n){return this._siblings.find(i=>i._canReceive(r,e,n))}_canReceive(r,e,n){if(!this._domRect||!Go(this._domRect,e,n)||!this.enterPredicate(r,this))return!1;let i=this._getShadowRoot().elementFromPoint(e,n);return i?i===this._container||this._container.contains(i):!1}_startReceiving(r,e){let n=this._activeSiblings;!n.has(r)&&e.every(i=>this.enterPredicate(i,this)||this._draggables.indexOf(i)>-1)&&(n.add(r),this._cacheParentPositions(),this._listenToScrollEvents(),this.receivingStarted.next({initiator:r,receiver:this,items:e}))}_stopReceiving(r){this._activeSiblings.delete(r),this._viewportScrollSubscription.unsubscribe(),this.receivingStopped.next({initiator:r,receiver:this})}_listenToScrollEvents(){this._viewportScrollSubscription=this._dragDropRegistry.scrolled(this._getShadowRoot()).subscribe(r=>{if(this.isDragging()){let e=this._parentPositions.handleScroll(r);e&&this._sortStrategy.updateOnScroll(e.top,e.left)}else this.isReceiving()&&this._cacheParentPositions()})}_getShadowRoot(){if(!this._cachedShadowRoot){let r=Hi(this._container);this._cachedShadowRoot=r||this._document}return this._cachedShadowRoot}_notifyReceivingSiblings(){let r=this._sortStrategy.getActiveItemsSnapshot().filter(e=>e.isDragging());this._siblings.forEach(e=>e._startReceiving(this,r))}};function qa(t,r){let{top:e,bottom:n,height:i}=t,o=i*Va;return r>=e-o&&r<=e+o?Mt.UP:r>=n-o&&r<=n+o?Mt.DOWN:Mt.NONE}function Aa(t,r){let{left:e,right:n,width:i}=t,o=i*Va;return r>=e-o&&r<=e+o?ut.LEFT:r>=n-o&&r<=n+o?ut.RIGHT:ut.NONE}function Jd(t,r,e,n,i){let o=qa(r,i),a=Aa(r,n),u=Mt.NONE,h=ut.NONE;if(o){let f=t.scrollTop;o===Mt.UP?f>0&&(u=Mt.UP):t.scrollHeight-f>t.clientHeight&&(u=Mt.DOWN)}if(a){let f=t.scrollLeft;e==="rtl"?a===ut.RIGHT?f<0&&(h=ut.RIGHT):t.scrollWidth+f>t.clientWidth&&(h=ut.LEFT):a===ut.LEFT?f>0&&(h=ut.LEFT):t.scrollWidth-f>t.clientWidth&&(h=ut.RIGHT)}return[u,h]}var ec=(()=>{class t{_injector=v(Bt);constructor(){}createDrag(e,n){return Oa(this._injector,e,n)}createDropList(e){return za(this._injector,e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),Wi=new ae("CDK_DRAG_PARENT");var Na=new ae("CdkDragHandle"),Ha=(()=>{class t{element=v(Ot);_parentDrag=v(Wi,{optional:!0,skipSelf:!0});_dragDropRegistry=v(Ki);_stateChanges=new Ce;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._stateChanges.next(this)}_disabled=!1;constructor(){this._parentDrag?._addHandle(this)}ngAfterViewInit(){if(!this._parentDrag){let e=this.element.nativeElement.parentElement;for(;e;){let n=this._dragDropRegistry.getDragDirectiveForNode(e);if(n){this._parentDrag=n,n._addHandle(this);break}e=e.parentElement}}}ngOnDestroy(){this._parentDrag?._removeHandle(this),this._stateChanges.complete()}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["","cdkDragHandle",""]],hostAttrs:[1,"cdk-drag-handle"],inputs:{disabled:[2,"cdkDragHandleDisabled","disabled",w]},features:[le([{provide:Na,useExisting:t}])]})}return t})(),$a=new ae("CDK_DRAG_CONFIG"),ja=new ae("CdkDropList"),zn=(()=>{class t{element=v(Ot);dropContainer=v(ja,{optional:!0,skipSelf:!0});_ngZone=v(Be);_viewContainerRef=v(Gn);_dir=v(No,{optional:!0});_changeDetectorRef=v(Yn);_selfHandle=v(Na,{optional:!0,self:!0});_parentDrag=v(Wi,{optional:!0,skipSelf:!0});_dragDropRegistry=v(Ki);_destroyed=new Ce;_handles=new br([]);_previewTemplate=null;_placeholderTemplate=null;_dragRef;data;lockAxis=null;rootElementSelector;boundaryElement;dragStartDelay;freeDragPosition;get disabled(){return this._disabled||!!(this.dropContainer&&this.dropContainer.disabled)}set disabled(e){this._disabled=e,this._dragRef.disabled=this._disabled}_disabled=!1;constrainPosition;previewClass;previewContainer;scale=1;started=new I;released=new I;ended=new I;entered=new I;exited=new I;dropped=new I;moved=new Un(e=>{let n=this._dragRef.moved.pipe(wn(i=>({source:this,pointerPosition:i.pointerPosition,event:i.event,delta:i.delta,distance:i.distance}))).subscribe(e);return()=>{n.unsubscribe()}});_injector=v(Bt);constructor(){let e=this.dropContainer,n=v($a,{optional:!0});this._dragRef=Oa(this._injector,this.element,{dragStartThreshold:n&&n.dragStartThreshold!=null?n.dragStartThreshold:5,pointerDirectionChangeThreshold:n&&n.pointerDirectionChangeThreshold!=null?n.pointerDirectionChangeThreshold:5,zIndex:n?.zIndex}),this._dragRef.data=this,this._dragDropRegistry.registerDirectiveNode(this.element.nativeElement,this),n&&this._assignDefaults(n),e&&(e.addItem(this),e._dropListRef.beforeStarted.pipe(Rt(this._destroyed)).subscribe(()=>{this._dragRef.scale=this.scale})),this._syncInputs(this._dragRef),this._handleEvents(this._dragRef)}getPlaceholderElement(){return this._dragRef.getPlaceholderElement()}getRootElement(){return this._dragRef.getRootElement()}reset(){this._dragRef.reset()}resetToBoundary(){this._dragRef.resetToBoundary()}getFreeDragPosition(){return this._dragRef.getFreeDragPosition()}setFreeDragPosition(e){this._dragRef.setFreeDragPosition(e)}ngAfterViewInit(){Qn(()=>{this._updateRootElement(),this._setupHandlesListener(),this._dragRef.scale=this.scale,this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition)},{injector:this._injector})}ngOnChanges(e){let n=e.rootElementSelector,i=e.freeDragPosition;n&&!n.firstChange&&this._updateRootElement(),this._dragRef.scale=this.scale,i&&!i.firstChange&&this.freeDragPosition&&this._dragRef.setFreeDragPosition(this.freeDragPosition)}ngOnDestroy(){this.dropContainer&&this.dropContainer.removeItem(this),this._dragDropRegistry.removeDirectiveNode(this.element.nativeElement),this._ngZone.runOutsideAngular(()=>{this._handles.complete(),this._destroyed.next(),this._destroyed.complete(),this._dragRef.dispose()})}_addHandle(e){let n=this._handles.getValue();n.push(e),this._handles.next(n)}_removeHandle(e){let n=this._handles.getValue(),i=n.indexOf(e);i>-1&&(n.splice(i,1),this._handles.next(n))}_setPreviewTemplate(e){this._previewTemplate=e}_resetPreviewTemplate(e){e===this._previewTemplate&&(this._previewTemplate=null)}_setPlaceholderTemplate(e){this._placeholderTemplate=e}_resetPlaceholderTemplate(e){e===this._placeholderTemplate&&(this._placeholderTemplate=null)}_updateRootElement(){let e=this.element.nativeElement,n=e;this.rootElementSelector&&(n=e.closest!==void 0?e.closest(this.rootElementSelector):e.parentElement?.closest(this.rootElementSelector)),this._dragRef.withRootElement(n||e)}_getBoundaryElement(){let e=this.boundaryElement;return e?typeof e=="string"?this.element.nativeElement.closest(e):Ht(e):null}_syncInputs(e){e.beforeStarted.subscribe(()=>{if(!e.isDragging()){let n=this._dir,i=this.dragStartDelay,o=this._placeholderTemplate?{template:this._placeholderTemplate.templateRef,context:this._placeholderTemplate.data,viewContainer:this._viewContainerRef}:null,a=this._previewTemplate?{template:this._previewTemplate.templateRef,context:this._previewTemplate.data,matchSize:this._previewTemplate.matchSize,viewContainer:this._viewContainerRef}:null;e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.scale=this.scale,e.dragStartDelay=typeof i=="object"&&i?i:$i(i),e.constrainPosition=this.constrainPosition,e.previewClass=this.previewClass,e.withBoundaryElement(this._getBoundaryElement()).withPlaceholderTemplate(o).withPreviewTemplate(a).withPreviewContainer(this.previewContainer||"global"),n&&e.withDirection(n.value)}}),e.beforeStarted.pipe(xr(1)).subscribe(()=>{if(this._parentDrag){e.withParent(this._parentDrag._dragRef);return}let n=this.element.nativeElement.parentElement;for(;n;){let i=this._dragDropRegistry.getDragDirectiveForNode(n);if(i){e.withParent(i._dragRef);break}n=n.parentElement}})}_handleEvents(e){e.started.subscribe(n=>{this.started.emit({source:this,event:n.event}),this._changeDetectorRef.markForCheck()}),e.released.subscribe(n=>{this.released.emit({source:this,event:n.event})}),e.ended.subscribe(n=>{this.ended.emit({source:this,distance:n.distance,dropPoint:n.dropPoint,event:n.event}),this._changeDetectorRef.markForCheck()}),e.entered.subscribe(n=>{this.entered.emit({container:n.container.data,item:this,currentIndex:n.currentIndex})}),e.exited.subscribe(n=>{this.exited.emit({container:n.container.data,item:this})}),e.dropped.subscribe(n=>{this.dropped.emit({previousIndex:n.previousIndex,currentIndex:n.currentIndex,previousContainer:n.previousContainer.data,container:n.container.data,isPointerOverContainer:n.isPointerOverContainer,item:this,distance:n.distance,dropPoint:n.dropPoint,event:n.event})})}_assignDefaults(e){let{lockAxis:n,dragStartDelay:i,constrainPosition:o,previewClass:a,boundaryElement:u,draggingDisabled:h,rootElementSelector:f,previewContainer:y}=e;this.disabled=h??!1,this.dragStartDelay=i||0,this.lockAxis=n||null,o&&(this.constrainPosition=o),a&&(this.previewClass=a),u&&(this.boundaryElement=u),f&&(this.rootElementSelector=f),y&&(this.previewContainer=y)}_setupHandlesListener(){this._handles.pipe(kn(e=>{let n=e.map(i=>i.element);this._selfHandle&&this.rootElementSelector&&n.push(this.element),this._dragRef.withHandles(n)}),pt(e=>gi(...e.map(n=>n._stateChanges.pipe(bi(n))))),Rt(this._destroyed)).subscribe(e=>{let n=this._dragRef,i=e.element.nativeElement;e.disabled?n.disableHandle(i):n.enableHandle(i)})}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["","cdkDrag",""]],hostAttrs:[1,"cdk-drag"],hostVars:4,hostBindings:function(n,i){n&2&&bt("cdk-drag-disabled",i.disabled)("cdk-drag-dragging",i._dragRef.isDragging())},inputs:{data:[0,"cdkDragData","data"],lockAxis:[0,"cdkDragLockAxis","lockAxis"],rootElementSelector:[0,"cdkDragRootElement","rootElementSelector"],boundaryElement:[0,"cdkDragBoundary","boundaryElement"],dragStartDelay:[0,"cdkDragStartDelay","dragStartDelay"],freeDragPosition:[0,"cdkDragFreeDragPosition","freeDragPosition"],disabled:[2,"cdkDragDisabled","disabled",w],constrainPosition:[0,"cdkDragConstrainPosition","constrainPosition"],previewClass:[0,"cdkDragPreviewClass","previewClass"],previewContainer:[0,"cdkDragPreviewContainer","previewContainer"],scale:[2,"cdkDragScale","scale",se]},outputs:{started:"cdkDragStarted",released:"cdkDragReleased",ended:"cdkDragEnded",entered:"cdkDragEntered",exited:"cdkDragExited",dropped:"cdkDragDropped",moved:"cdkDragMoved"},exportAs:["cdkDrag"],features:[le([{provide:Wi,useExisting:t}]),So]})}return t})(),Ra=new ae("CdkDropListGroup");var qn=(()=>{class t{element=v(Ot);_changeDetectorRef=v(Yn);_scrollDispatcher=v(_a);_dir=v(No,{optional:!0});_group=v(Ra,{optional:!0,skipSelf:!0});_latestSortedRefs;_destroyed=new Ce;_scrollableParentsResolved=!1;static _dropLists=[];_dropListRef;connectedTo=[];data;orientation="vertical";id=v(ji).getId("cdk-drop-list-");lockAxis=null;get disabled(){return this._disabled||!!this._group&&this._group.disabled}set disabled(e){this._dropListRef.disabled=this._disabled=e}_disabled=!1;sortingDisabled=!1;enterPredicate=()=>!0;sortPredicate=()=>!0;autoScrollDisabled=!1;autoScrollStep;elementContainerSelector=null;hasAnchor=!1;dropped=new I;entered=new I;exited=new I;sorted=new I;_unsortedItems=new Set;constructor(){let e=v($a,{optional:!0}),n=v(Bt);this._dropListRef=za(n,this.element),this._dropListRef.data=this,e&&this._assignDefaults(e),this._dropListRef.enterPredicate=(i,o)=>this.enterPredicate(i.data,o.data),this._dropListRef.sortPredicate=(i,o,a)=>this.sortPredicate(i,o.data,a.data),this._setupInputSyncSubscription(this._dropListRef),this._handleEvents(this._dropListRef),t._dropLists.push(this),this._group&&this._group._items.add(this)}addItem(e){this._unsortedItems.add(e),e._dragRef._withDropContainer(this._dropListRef),this._dropListRef.isDragging()&&this._syncItemsWithRef(this.getSortedItems().map(n=>n._dragRef))}removeItem(e){if(this._unsortedItems.delete(e),this._latestSortedRefs){let n=this._latestSortedRefs.indexOf(e._dragRef);n>-1&&(this._latestSortedRefs.splice(n,1),this._syncItemsWithRef(this._latestSortedRefs))}}getSortedItems(){return Array.from(this._unsortedItems).sort((e,n)=>e._dragRef.getVisibleElement().compareDocumentPosition(n._dragRef.getVisibleElement())&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)}ngOnDestroy(){let e=t._dropLists.indexOf(this);e>-1&&t._dropLists.splice(e,1),this._group&&this._group._items.delete(this),this._latestSortedRefs=void 0,this._unsortedItems.clear(),this._dropListRef.dispose(),this._destroyed.next(),this._destroyed.complete()}_setupInputSyncSubscription(e){this._dir&&this._dir.change.pipe(bi(this._dir.value),Rt(this._destroyed)).subscribe(n=>e.withDirection(n)),e.beforeStarted.subscribe(()=>{let n=ya(this.connectedTo).map(i=>{if(typeof i=="string"){let o=t._dropLists.find(a=>a.id===i);return o}return i});if(this._group&&this._group._items.forEach(i=>{n.indexOf(i)===-1&&n.push(i)}),!this._scrollableParentsResolved){let i=this._scrollDispatcher.getAncestorScrollContainers(this.element).map(o=>o.getElementRef().nativeElement);this._dropListRef.withScrollableParents(i),this._scrollableParentsResolved=!0}if(this.elementContainerSelector){let i=this.element.nativeElement.querySelector(this.elementContainerSelector);e.withElementContainer(i)}e.disabled=this.disabled,e.lockAxis=this.lockAxis,e.sortingDisabled=this.sortingDisabled,e.autoScrollDisabled=this.autoScrollDisabled,e.autoScrollStep=$i(this.autoScrollStep,2),e.hasAnchor=this.hasAnchor,e.connectedTo(n.filter(i=>i&&i!==this).map(i=>i._dropListRef)).withOrientation(this.orientation)})}_handleEvents(e){e.beforeStarted.subscribe(()=>{this._syncItemsWithRef(this.getSortedItems().map(n=>n._dragRef)),this._changeDetectorRef.markForCheck()}),e.entered.subscribe(n=>{this.entered.emit({container:this,item:n.item.data,currentIndex:n.currentIndex})}),e.exited.subscribe(n=>{this.exited.emit({container:this,item:n.item.data}),this._changeDetectorRef.markForCheck()}),e.sorted.subscribe(n=>{this.sorted.emit({previousIndex:n.previousIndex,currentIndex:n.currentIndex,container:this,item:n.item.data})}),e.dropped.subscribe(n=>{this.dropped.emit({previousIndex:n.previousIndex,currentIndex:n.currentIndex,previousContainer:n.previousContainer.data,container:n.container.data,item:n.item.data,isPointerOverContainer:n.isPointerOverContainer,distance:n.distance,dropPoint:n.dropPoint,event:n.event}),this._changeDetectorRef.markForCheck()}),gi(e.receivingStarted,e.receivingStopped).subscribe(()=>this._changeDetectorRef.markForCheck())}_assignDefaults(e){let{lockAxis:n,draggingDisabled:i,sortingDisabled:o,listAutoScrollDisabled:a,listOrientation:u}=e;this.disabled=i??!1,this.sortingDisabled=o??!1,this.autoScrollDisabled=a??!1,this.orientation=u||"vertical",this.lockAxis=n||null}_syncItemsWithRef(e){this._latestSortedRefs=e,this._dropListRef.withItems(e)}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["","cdkDropList",""],["cdk-drop-list"]],hostAttrs:[1,"cdk-drop-list"],hostVars:7,hostBindings:function(n,i){n&2&&(D("id",i.id),bt("cdk-drop-list-disabled",i.disabled)("cdk-drop-list-dragging",i._dropListRef.isDragging())("cdk-drop-list-receiving",i._dropListRef.isReceiving()))},inputs:{connectedTo:[0,"cdkDropListConnectedTo","connectedTo"],data:[0,"cdkDropListData","data"],orientation:[0,"cdkDropListOrientation","orientation"],id:"id",lockAxis:[0,"cdkDropListLockAxis","lockAxis"],disabled:[2,"cdkDropListDisabled","disabled",w],sortingDisabled:[2,"cdkDropListSortingDisabled","sortingDisabled",w],enterPredicate:[0,"cdkDropListEnterPredicate","enterPredicate"],sortPredicate:[0,"cdkDropListSortPredicate","sortPredicate"],autoScrollDisabled:[2,"cdkDropListAutoScrollDisabled","autoScrollDisabled",w],autoScrollStep:[0,"cdkDropListAutoScrollStep","autoScrollStep"],elementContainerSelector:[0,"cdkDropListElementContainer","elementContainerSelector"],hasAnchor:[2,"cdkDropListHasAnchor","hasAnchor",w]},outputs:{dropped:"cdkDropListDropped",entered:"cdkDropListEntered",exited:"cdkDropListExited",sorted:"cdkDropListSorted"},exportAs:["cdkDropList"],features:[le([{provide:Ra,useValue:void 0},{provide:ja,useExisting:t}])]})}return t})(),tc=new ae("CdkDragPreview"),Yi=(()=>{class t{templateRef=v(Io);_drag=v(Wi,{optional:!0});data;matchSize=!1;constructor(){this._drag?._setPreviewTemplate(this)}ngOnDestroy(){this._drag?._resetPreviewTemplate(this)}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["ng-template","cdkDragPreview",""]],inputs:{data:"data",matchSize:[2,"matchSize","matchSize",w]},features:[le([{provide:tc,useExisting:t}])]})}return t})();var Zi=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({providers:[ec],imports:[ba]})}return t})();var Xi=class t{getLearningPath(r){return $e({id:r,name:"Demo Path",description:"Example learning path",status:"draft",lessons:[]})}createLearningPath(r){return console.log("POST",r),$e({success:!0})}updateLearningPath(r,e){return console.log("PUT",r,e),$e({success:!0})}static \u0275fac=function(e){return new(e||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})};var Ji=(t,r)=>r.id;function nc(t,r){if(t&1&&(c(0,"option",8),m(1),p()),t&2){let e=r.$implicit;s("value",e.id),l(),$(" ",e.title," ")}}function ic(t,r){if(t&1&&(c(0,"option",19),m(1),p()),t&2){let e=r.$implicit,n=r.$index,i=d().$index;s("value",e.id)("disabled",n>=i),l(),$(" ",e.title," ")}}function oc(t,r){if(t&1){let e=P();c(0,"div",11)(1,"div",15)(2,"span"),m(3),p(),c(4,"button",9),x("click",function(){let i=_(e).$index,o=d();return b(o.removeLesson(i))}),m(5,"X"),p()(),c(6,"div",16)(7,"label",17),m(8,"Prerequisites"),p(),c(9,"select",18),x("change",function(i){let o=_(e).$index,a=d();return b(a.onPrereqChange(o,i))}),me(10,ic,2,3,"option",19,Ji),p()()()}if(t&2){let e=r.$implicit,n=r.$index,i=d();l(3),Q(e.title),l(4),s("for",Mo("prereq-",n)),l(2),s("id",Mo("prereq-",n)),l(),he(i.selectedLessons)}}function rc(t,r){if(t&1&&(c(0,"div",22),m(1),p()),t&2){let e=d().$implicit;l(),$(" Prerequisites: ",e.prerequisites.join(", ")," ")}}function ac(t,r){if(t&1&&(c(0,"div",14),F(1,"div",20),c(2,"div",21)(3,"strong"),m(4),p(),V(5,rc,2,1,"div",22),p()()),t&2){let e=r.$implicit;l(4),Q(e.title),l(),z(e.prerequisites.length>0?5:-1)}}var di=class t{fb=v(Mi);learningPathService=v(Xi);form;allLessons=[{id:"1",title:"Lesson 1",prerequisites:[]},{id:"2",title:"Lesson 2",prerequisites:[]},{id:"3",title:"Lesson 3",prerequisites:[]}];selectedLessons=[];ngOnInit(){this.form=this.fb.group({name:["",Ln.required],description:[""]})}addLesson(r){r&&(this.selectedLessons.find(e=>e.id===r.id)||this.selectedLessons.push(ue(G({},r),{prerequisites:[]})))}removeLesson(r){this.selectedLessons.splice(r,1)}drop(r){Vn(this.selectedLessons,r.previousIndex,r.currentIndex)}setPrerequisites(r,e){let n=e.filter(i=>this.selectedLessons.findIndex(a=>a.id===i)<r);this.selectedLessons[r].prerequisites=n}onPrereqChange(r,e){let n=e.target,i=Array.from(n.selectedOptions).map(o=>o.value);this.setPrerequisites(r,i)}saveDraft(){let r={name:this.form.value.name,description:this.form.value.description,lessons:this.selectedLessons.map(e=>({id:e.id,title:e.title,prerequisites:e.prerequisites})),status:"draft"};this.learningPathService.createLearningPath(r).subscribe()}publish(){let r={name:this.form.value.name,description:this.form.value.description,lessons:this.selectedLessons.map(e=>({id:e.id,title:e.title,prerequisites:e.prerequisites})),status:"published"};this.learningPathService.createLearningPath(r).subscribe()}addSelectedLesson(r){if(!r)return;let e=this.allLessons.find(n=>n.id===r)??null;this.addLesson(e)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-learning-path-editor"]],decls:35,vars:1,consts:[["lessonSelect",""],[1,"container"],[1,"form-section",3,"formGroup"],["for","name"],["id","name","type","text","formControlName","name"],["for","description"],["id","description","formControlName","description"],[1,"add-lesson"],[3,"value"],[3,"click"],["cdkDropList","",1,"lesson-list",3,"cdkDropListDropped"],["cdkDrag","",1,"lesson-item"],[1,"actions"],[1,"preview"],[1,"preview-item"],[1,"lesson-header"],[1,"prereq"],[3,"for"],["multiple","",3,"change","id"],[3,"value","disabled"],[1,"circle"],[1,"preview-content"],[1,"preview-prereq"]],template:function(e,n){if(e&1){let i=P();c(0,"div",1)(1,"h2"),m(2,"Learning Path Builder"),p(),c(3,"form",2)(4,"label",3),m(5,"Name *"),p(),F(6,"input",4),c(7,"label",5),m(8,"Description"),p(),F(9,"textarea",6),p(),F(10,"hr"),c(11,"div",7)(12,"h3"),m(13,"Add Lesson"),p(),c(14,"select",null,0),me(16,nc,2,2,"option",8,Ji),p(),c(18,"button",9),x("click",function(){_(i);let a=Se(15);return b(n.addSelectedLesson(a.value))}),m(19," Add "),p()(),c(20,"h3"),m(21,"Path"),p(),c(22,"div",10),x("cdkDropListDropped",function(a){return n.drop(a)}),me(23,oc,12,5,"div",11,Ji),p(),c(25,"div",12)(26,"button",9),x("click",function(){return n.saveDraft()}),m(27,"Save Draft"),p(),c(28,"button",9),x("click",function(){return n.publish()}),m(29,"Publish"),p()(),c(30,"div",13)(31,"h3"),m(32,"Learning Path Preview"),p(),me(33,ac,6,2,"div",14,Ji),p()()}e&2&&(l(3),s("formGroup",n.form),l(13),he(n.allLessons),l(7),he(n.selectedLessons),l(10),he(n.selectedLessons))},dependencies:[te,Li,Si,Pn,Fn,ft,et,Ti,Ei,Ii,Zi,qn,zn],styles:[".container[_ngcontent-%COMP%]{padding:20px;max-width:900px;margin:0 auto}.form-section[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:10px}input[_ngcontent-%COMP%], textarea[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{padding:8px;border:1px solid #ccc;border-radius:6px}.lesson-list[_ngcontent-%COMP%]{margin-top:20px;display:flex;flex-direction:column;gap:10px}.lesson-item[_ngcontent-%COMP%]{padding:12px;border:1px solid #ddd;border-radius:8px;background:#fff;cursor:move}.lesson-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;font-weight:700}.prereq[_ngcontent-%COMP%]{margin-top:10px}.actions[_ngcontent-%COMP%]{margin-top:20px;display:flex;gap:10px}.preview[_ngcontent-%COMP%]{margin-top:30px;border-left:3px solid #ccc;padding-left:20px}.preview-item[_ngcontent-%COMP%]{position:relative;margin-bottom:20px}.circle[_ngcontent-%COMP%]{width:12px;height:12px;background:#3b82f6;border-radius:50%;position:absolute;left:-27px;top:5px}.preview-content[_ngcontent-%COMP%]{background:#f5f5f5;padding:10px;border-radius:8px}.preview-prereq[_ngcontent-%COMP%]{margin-top:5px;font-size:14px;color:#666}"]})};var eo=(()=>{class t extends De{modelValue=Z(void 0);$filled=J(()=>Wt(this.modelValue()));writeModelValue(e){this.modelValue.set(e)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275dir=Oe({type:t,features:[L]})}return t})();var Lt=(()=>{class t extends eo{required=ee(void 0,{transform:w});invalid=ee(void 0,{transform:w});disabled=ee(void 0,{transform:w});name=ee();_disabled=Z(!1);$disabled=J(()=>this.disabled()||this._disabled());onModelChange=()=>{};onModelTouched=()=>{};writeDisabledState(e){this._disabled.set(e)}writeControlValue(e,n){}writeValue(e){this.writeControlValue(e,this.writeModelValue.bind(this))}registerOnChange(e){this.onModelChange=e}registerOnTouched(e){this.onModelTouched=e}setDisabledState(e){this.writeDisabledState(e),this.cd.markForCheck()}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275dir=Oe({type:t,inputs:{required:[1,"required"],invalid:[1,"invalid"],disabled:[1,"disabled"],name:[1,"name"]},features:[L]})}return t})();var Qa=`
    /*!
* Quill Editor v1.3.3
* https://quilljs.com/
* Copyright (c) 2014, Jason Chen
* Copyright (c) 2013, salesforce.com
*/
    .ql-container {
        box-sizing: border-box;
        font-family: Helvetica, Arial, sans-serif;
        font-size: 13px;
        height: 100%;
        margin: 0;
        position: relative;
    }
    .ql-container.ql-disabled .ql-tooltip {
        visibility: hidden;
    }
    .ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {
        pointer-events: none;
    }
    .ql-clipboard {
        inset-inline-start: -100000px;
        height: 1px;
        overflow-y: hidden;
        position: absolute;
        top: 50%;
    }
    .ql-clipboard p {
        margin: 0;
        padding: 0;
    }
    .ql-editor {
        box-sizing: border-box;
        line-height: 1.42;
        height: 100%;
        outline: none;
        overflow-y: auto;
        padding: 12px 15px;
        tab-size: 4;
        -moz-tab-size: 4;
        text-align: left;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    .ql-editor > * {
        cursor: text;
    }
    .ql-editor p,
    .ql-editor ol,
    .ql-editor ul,
    .ql-editor pre,
    .ql-editor blockquote,
    .ql-editor h1,
    .ql-editor h2,
    .ql-editor h3,
    .ql-editor h4,
    .ql-editor h5,
    .ql-editor h6 {
        margin: 0;
        padding: 0;
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol,
    .ql-editor ul {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol > li,
    .ql-editor ul > li {
        list-style-type: none;
    }
    .ql-editor ul > li::before {
        content: '\\2022';
    }
    .ql-editor ul[data-checked='true'],
    .ql-editor ul[data-checked='false'] {
        pointer-events: none;
    }
    .ql-editor ul[data-checked='true'] > li *,
    .ql-editor ul[data-checked='false'] > li * {
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before,
    .ql-editor ul[data-checked='false'] > li::before {
        color: #777;
        cursor: pointer;
        pointer-events: all;
    }
    .ql-editor ul[data-checked='true'] > li::before {
        content: '\\2611';
    }
    .ql-editor ul[data-checked='false'] > li::before {
        content: '\\2610';
    }
    .ql-editor li::before {
        display: inline-block;
        white-space: nowrap;
        width: 1.2rem;
    }
    .ql-editor li:not(.ql-direction-rtl)::before {
        margin-inline-start: -1.5rem;
        margin-inline-end: 0.3rem;
        text-align: right;
    }
    .ql-editor li.ql-direction-rtl::before {
        margin-inline-start: 0.3rem;
        margin-inline-end: -1.5rem;
    }
    .ql-editor ol li:not(.ql-direction-rtl),
    .ql-editor ul li:not(.ql-direction-rtl) {
        padding-inline-start: 1.5rem;
    }
    .ql-editor ol li.ql-direction-rtl,
    .ql-editor ul li.ql-direction-rtl {
        padding-inline-end: 1.5rem;
    }
    .ql-editor ol li {
        counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
        counter-increment: list-0;
    }
    .ql-editor ol li:before {
        content: counter(list-0, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-increment: list-1;
    }
    .ql-editor ol li.ql-indent-1:before {
        content: counter(list-1, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-1 {
        counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-2 {
        counter-increment: list-2;
    }
    .ql-editor ol li.ql-indent-2:before {
        content: counter(list-2, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-2 {
        counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-3 {
        counter-increment: list-3;
    }
    .ql-editor ol li.ql-indent-3:before {
        content: counter(list-3, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-3 {
        counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-4 {
        counter-increment: list-4;
    }
    .ql-editor ol li.ql-indent-4:before {
        content: counter(list-4, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-4 {
        counter-reset: list-5 list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-5 {
        counter-increment: list-5;
    }
    .ql-editor ol li.ql-indent-5:before {
        content: counter(list-5, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-5 {
        counter-reset: list-6 list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-6 {
        counter-increment: list-6;
    }
    .ql-editor ol li.ql-indent-6:before {
        content: counter(list-6, decimal) '. ';
    }
    .ql-editor ol li.ql-indent-6 {
        counter-reset: list-7 list-8 list-9;
    }
    .ql-editor ol li.ql-indent-7 {
        counter-increment: list-7;
    }
    .ql-editor ol li.ql-indent-7:before {
        content: counter(list-7, lower-alpha) '. ';
    }
    .ql-editor ol li.ql-indent-7 {
        counter-reset: list-8 list-9;
    }
    .ql-editor ol li.ql-indent-8 {
        counter-increment: list-8;
    }
    .ql-editor ol li.ql-indent-8:before {
        content: counter(list-8, lower-roman) '. ';
    }
    .ql-editor ol li.ql-indent-8 {
        counter-reset: list-9;
    }
    .ql-editor ol li.ql-indent-9 {
        counter-increment: list-9;
    }
    .ql-editor ol li.ql-indent-9:before {
        content: counter(list-9, decimal) '. ';
    }
    .ql-editor .ql-video {
        display: block;
        max-width: 100%;
    }
    .ql-editor .ql-video.ql-align-center {
        margin: 0 auto;
    }
    .ql-editor .ql-video.ql-align-right {
        margin: 0 0 0 auto;
    }
    .ql-editor .ql-bg-black {
        background: #000;
    }
    .ql-editor .ql-bg-red {
        background: #e60000;
    }
    .ql-editor .ql-bg-orange {
        background: #f90;
    }
    .ql-editor .ql-bg-yellow {
        background: #ff0;
    }
    .ql-editor .ql-bg-green {
        background: #008a00;
    }
    .ql-editor .ql-bg-blue {
        background: #06c;
    }
    .ql-editor .ql-bg-purple {
        background: #93f;
    }
    .ql-editor .ql-color-white {
        color: #fff;
    }
    .ql-editor .ql-color-red {
        color: #e60000;
    }
    .ql-editor .ql-color-orange {
        color: #f90;
    }
    .ql-editor .ql-color-yellow {
        color: #ff0;
    }
    .ql-editor .ql-color-green {
        color: #008a00;
    }
    .ql-editor .ql-color-blue {
        color: #06c;
    }
    .ql-editor .ql-color-purple {
        color: #93f;
    }
    .ql-editor .ql-font-serif {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-editor .ql-font-monospace {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-editor .ql-size-small {
        font-size: 0.75rem;
    }
    .ql-editor .ql-size-large {
        font-size: 1.5rem;
    }
    .ql-editor .ql-size-huge {
        font-size: 2.5rem;
    }
    .ql-editor .ql-direction-rtl {
        direction: rtl;
        text-align: inherit;
    }
    .ql-editor .ql-align-center {
        text-align: center;
    }
    .ql-editor .ql-align-justify {
        text-align: justify;
    }
    .ql-editor .ql-align-right {
        text-align: right;
    }
    .ql-editor.ql-blank::before {
        color: dt('form.field.placeholder.color');
        content: attr(data-placeholder);
        font-style: italic;
        inset-inline-start: 15px;
        pointer-events: none;
        position: absolute;
        inset-inline-end: 15px;
    }
    .ql-snow.ql-toolbar:after,
    .ql-snow .ql-toolbar:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow.ql-toolbar button,
    .ql-snow .ql-toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        display: inline-block;
        float: left;
        height: 24px;
        padding-block: 3px;
        padding-inline: 5px;
        width: 28px;
    }
    .ql-snow.ql-toolbar button svg,
    .ql-snow .ql-toolbar button svg {
        float: left;
        height: 100%;
    }
    .ql-snow.ql-toolbar button:active:hover,
    .ql-snow .ql-toolbar button:active:hover {
        outline: none;
    }
    .ql-snow.ql-toolbar input.ql-image[type='file'],
    .ql-snow .ql-toolbar input.ql-image[type='file'] {
        display: none;
    }
    .ql-snow.ql-toolbar button:hover,
    .ql-snow .ql-toolbar button:hover,
    .ql-snow.ql-toolbar button:focus,
    .ql-snow .ql-toolbar button:focus,
    .ql-snow.ql-toolbar button.ql-active,
    .ql-snow .ql-toolbar button.ql-active,
    .ql-snow.ql-toolbar .ql-picker-label:hover,
    .ql-snow .ql-toolbar .ql-picker-label:hover,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active,
    .ql-snow.ql-toolbar .ql-picker-item:hover,
    .ql-snow .ql-toolbar .ql-picker-item:hover,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected {
        color: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill,
    .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill {
        fill: #06c;
    }
    .ql-snow.ql-toolbar button:hover .ql-stroke,
    .ql-snow .ql-toolbar button:hover .ql-stroke,
    .ql-snow.ql-toolbar button:focus .ql-stroke,
    .ql-snow .ql-toolbar button:focus .ql-stroke,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .ql-snow .ql-toolbar button.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke,
    .ql-snow.ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar button:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow .ql-toolbar button:focus .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter,
    .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter,
    .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter {
        stroke: #06c;
    }
    @media (pointer: coarse) {
        .ql-snow.ql-toolbar button:hover:not(.ql-active),
        .ql-snow .ql-toolbar button:hover:not(.ql-active) {
            color: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-fill,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke.ql-fill {
            fill: #444;
        }
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke,
        .ql-snow.ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter,
        .ql-snow .ql-toolbar button:hover:not(.ql-active) .ql-stroke-miter {
            stroke: #444;
        }
    }
    .ql-snow {
        box-sizing: border-box;
    }
    .ql-snow * {
        box-sizing: border-box;
    }
    .ql-snow .ql-hidden {
        display: none;
    }
    .ql-snow .ql-out-bottom,
    .ql-snow .ql-out-top {
        visibility: hidden;
    }
    .ql-snow .ql-tooltip {
        position: absolute;
        transform: translateY(10px);
    }
    .ql-snow .ql-tooltip a {
        cursor: pointer;
        text-decoration: none;
    }
    .ql-snow .ql-tooltip.ql-flip {
        transform: translateY(-10px);
    }
    .ql-snow .ql-formats {
        display: inline-block;
        vertical-align: middle;
    }
    .ql-snow .ql-formats:after {
        clear: both;
        content: '';
        display: table;
    }
    .ql-snow .ql-stroke {
        fill: none;
        stroke: #444;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 2;
    }
    .ql-snow .ql-stroke-miter {
        fill: none;
        stroke: #444;
        stroke-miterlimit: 10;
        stroke-width: 2;
    }
    .ql-snow .ql-fill,
    .ql-snow .ql-stroke.ql-fill {
        fill: #444;
    }
    .ql-snow .ql-empty {
        fill: none;
    }
    .ql-snow .ql-even {
        fill-rule: evenodd;
    }
    .ql-snow .ql-thin,
    .ql-snow .ql-stroke.ql-thin {
        stroke-width: 1;
    }
    .ql-snow .ql-transparent {
        opacity: 0.4;
    }
    .ql-snow .ql-direction svg:last-child {
        display: none;
    }
    .ql-snow .ql-direction.ql-active svg:last-child {
        display: inline;
    }
    .ql-snow .ql-direction.ql-active svg:first-child {
        display: none;
    }
    .ql-snow .ql-editor h1 {
        font-size: 2rem;
    }
    .ql-snow .ql-editor h2 {
        font-size: 1.5rem;
    }
    .ql-snow .ql-editor h3 {
        font-size: 1.17rem;
    }
    .ql-snow .ql-editor h4 {
        font-size: 1rem;
    }
    .ql-snow .ql-editor h5 {
        font-size: 0.83rem;
    }
    .ql-snow .ql-editor h6 {
        font-size: 0.67rem;
    }
    .ql-snow .ql-editor a {
        text-decoration: underline;
    }
    .ql-snow .ql-editor blockquote {
        border-inline-start: 4px solid #ccc;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding-inline-start: 16px;
    }
    .ql-snow .ql-editor code,
    .ql-snow .ql-editor pre {
        background: #f0f0f0;
        border-radius: 3px;
    }
    .ql-snow .ql-editor pre {
        white-space: pre-wrap;
        margin-block-end: 5px;
        margin-block-start: 5px;
        padding: 5px 10px;
    }
    .ql-snow .ql-editor code {
        font-size: 85%;
        padding: 2px 4px;
    }
    .ql-snow .ql-editor pre.ql-syntax {
        background: #23241f;
        color: #f8f8f2;
        overflow: visible;
    }
    .ql-snow .ql-editor img {
        max-width: 100%;
    }
    .ql-snow .ql-picker {
        color: #444;
        display: inline-block;
        float: left;
        inset-inline-start: 0;
        font-size: 14px;
        font-weight: 500;
        height: 24px;
        position: relative;
        vertical-align: middle;
    }
    .ql-snow .ql-picker-label {
        cursor: pointer;
        display: inline-block;
        height: 100%;
        padding-inline-start: 8px;
        padding-inline-end: 2px;
        position: relative;
        width: 100%;
    }
    .ql-snow .ql-picker-label::before {
        display: inline-block;
        line-height: 22px;
    }
    .ql-snow .ql-picker-options {
        background: #fff;
        display: none;
        min-width: 100%;
        padding: 4px 8px;
        position: absolute;
        white-space: nowrap;
    }
    .ql-snow .ql-picker-options .ql-picker-item {
        cursor: pointer;
        display: block;
        padding-block-end: 5px;
        padding-block-start: 5px;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: #ccc;
        z-index: 2;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: #ccc;
    }
    .ql-snow .ql-picker.ql-expanded .ql-picker-options {
        display: block;
        margin-block-start: -1px;
        top: 100%;
        z-index: 1;
    }
    .ql-snow .ql-color-picker,
    .ql-snow .ql-icon-picker {
        width: 28px;
    }
    .ql-snow .ql-color-picker .ql-picker-label,
    .ql-snow .ql-icon-picker .ql-picker-label {
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-label svg,
    .ql-snow .ql-icon-picker .ql-picker-label svg {
        inset-inline-end: 4px;
    }
    .ql-snow .ql-icon-picker .ql-picker-options {
        padding: 4px 0;
    }
    .ql-snow .ql-icon-picker .ql-picker-item {
        height: 24px;
        width: 24px;
        padding: 2px 4px;
    }
    .ql-snow .ql-color-picker .ql-picker-options {
        padding: 3px 5px;
        width: 152px;
    }
    .ql-snow .ql-color-picker .ql-picker-item {
        border: 1px solid transparent;
        float: left;
        height: 16px;
        margin: 2px;
        padding: 0;
        width: 16px;
    }
    .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) svg {
        position: absolute;
        margin-block-start: -9px;
        inset-inline-end: 0;
        top: 50%;
        width: 18px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-label]:not([data-label=''])::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-label]:not([data-label=''])::before {
        content: attr(data-label);
    }
    .ql-snow .ql-picker.ql-header {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        content: 'Heading 1';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        content: 'Heading 2';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        content: 'Heading 3';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        content: 'Heading 4';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        content: 'Heading 5';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        content: 'Heading 6';
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
        font-size: 2rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
        font-size: 1.5rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
        font-size: 1.17rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
        font-size: 1rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
        font-size: 0.83rem;
    }
    .ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
        font-size: 0.67rem;
    }
    .ql-snow .ql-picker.ql-font {
        width: 108px;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item::before {
        content: 'Sans Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        content: 'Serif';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        content: 'Monospace';
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
        font-family:
            Georgia,
            Times New Roman,
            serif;
    }
    .ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
        font-family:
            Monaco,
            Courier New,
            monospace;
    }
    .ql-snow .ql-picker.ql-size {
        width: 98px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item::before {
        content: 'Normal';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        content: 'Small';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        content: 'Large';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        content: 'Huge';
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
        font-size: 10px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
        font-size: 18px;
    }
    .ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
        font-size: 32px;
    }
    .ql-snow .ql-color-picker.ql-background .ql-picker-item {
        background: #fff;
    }
    .ql-snow .ql-color-picker.ql-color .ql-picker-item {
        background: #000;
    }
    .ql-toolbar.ql-snow {
        border: 1px solid #ccc;
        box-sizing: border-box;
        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        padding: 8px;
    }
    .ql-toolbar.ql-snow .ql-formats {
        margin-inline-end: 15px;
    }
    .ql-toolbar.ql-snow .ql-picker-label {
        border: 1px solid transparent;
    }
    .ql-toolbar.ql-snow .ql-picker-options {
        border: 1px solid transparent;
        box-shadow: rgba(0, 0, 0, 0.2) 0 2px 8px;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        border-color: #ccc;
    }
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item.ql-selected,
    .ql-toolbar.ql-snow .ql-color-picker .ql-picker-item:hover {
        border-color: #000;
    }
    .ql-toolbar.ql-snow + .ql-container.ql-snow {
        border-block-start: 0;
    }
    .ql-snow .ql-tooltip {
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 0 5px #ddd;
        color: #444;
        padding: 5px 12px;
        white-space: nowrap;
    }
    .ql-snow .ql-tooltip::before {
        content: 'Visit URL:';
        line-height: 26px;
        margin-inline-end: 8px;
    }
    .ql-snow .ql-tooltip input[type='text'] {
        display: none;
        border: 1px solid #ccc;
        font-size: 13px;
        height: 26px;
        margin: 0;
        padding: 3px 5px;
        width: 170px;
    }
    .ql-snow .ql-tooltip a.ql-preview {
        display: inline-block;
        max-width: 200px;
        overflow-x: hidden;
        text-overflow: ellipsis;
        vertical-align: top;
    }
    .ql-snow .ql-tooltip a.ql-action::after {
        border-inline-end: 1px solid #ccc;
        content: 'Edit';
        margin-inline-start: 16px;
        padding-inline-end: 8px;
    }
    .ql-snow .ql-tooltip a.ql-remove::before {
        content: 'Remove';
        margin-inline-start: 8px;
    }
    .ql-snow .ql-tooltip a {
        line-height: 26px;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-preview,
    .ql-snow .ql-tooltip.ql-editing a.ql-remove {
        display: none;
    }
    .ql-snow .ql-tooltip.ql-editing input[type='text'] {
        display: inline-block;
    }
    .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
        border-inline-end: 0;
        content: 'Save';
        padding-inline-end: 0;
    }
    .ql-snow .ql-tooltip[data-mode='link']::before {
        content: 'Enter link:';
    }
    .ql-snow .ql-tooltip[data-mode='formula']::before {
        content: 'Enter formula:';
    }
    .ql-snow .ql-tooltip[data-mode='video']::before {
        content: 'Enter video:';
    }
    .ql-snow a {
        color: #06c;
    }
    .ql-container.ql-snow {
        border: 1px solid #ccc;
    }

    .p-editor {
        display: block;
    }

    .p-editor .p-editor-toolbar {
        background: dt('editor.toolbar.background');
        border-start-end-radius: dt('editor.toolbar.border.radius');
        border-start-start-radius: dt('editor.toolbar.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow {
        border: 1px solid dt('editor.toolbar.border.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-stroke {
        stroke: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-fill {
        fill: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label {
        border: 0 none;
        color: dt('editor.toolbar.item.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker .ql-picker-label:hover .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-label .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options {
        background: dt('editor.overlay.background');
        border: 1px solid dt('editor.overlay.border.color');
        box-shadow: dt('editor.overlay.shadow');
        border-radius: dt('editor.overlay.border.radius');
        padding: dt('editor.overlay.padding');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item {
        color: dt('editor.overlay.option.color');
        border-radius: dt('editor.overlay.option.border.radius');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options .ql-picker-item:hover {
        background: dt('editor.overlay.option.focus.background');
        color: dt('editor.overlay.option.focus.color');
    }

    .p-editor .p-editor-toolbar.ql-snow .ql-picker.ql-expanded:not(.ql-color-picker, .ql-icon-picker) .ql-picker-item {
        padding: dt('editor.overlay.option.padding');
    }

    .p-editor .p-editor-content {
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .p-editor-content.ql-snow {
        border: 1px solid dt('editor.content.border.color');
    }

    .p-editor .p-editor-content .ql-editor {
        background: dt('editor.content.background');
        color: dt('editor.content.color');
        border-end-end-radius: dt('editor.content.border.radius');
        border-end-start-radius: dt('editor.content.border.radius');
    }

    .p-editor .ql-snow.ql-toolbar button:hover,
    .p-editor .ql-snow.ql-toolbar button:focus {
        color: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-stroke,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-stroke {
        stroke: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button:hover .ql-fill,
    .p-editor .ql-snow.ql-toolbar button:focus .ql-fill {
        fill: dt('editor.toolbar.item.hover.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected {
        color: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke {
        stroke: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill {
        fill: dt('editor.toolbar.item.active.color');
    }

    .p-editor .ql-snow.ql-toolbar button.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-picker-label,
    .p-editor .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-picker-label {
        color: dt('editor.toolbar.item.active.color');
    }
`;var lc=["header"],sc=[[["p-header"]]],dc=["p-header"];function cc(t,r){t&1&&U(0)}function pc(t,r){if(t&1&&(c(0,"div",2),Ne(1),g(2,cc,1,0,"ng-container",3),p()),t&2){let e=d();C(e.cx("toolbar")),s("pBind",e.ptm("toolbar")),l(2),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate)}}function uc(t,r){if(t&1&&(c(0,"div",2)(1,"span",4)(2,"select",5)(3,"option",6),m(4,"Heading"),p(),c(5,"option",7),m(6,"Subheading"),p(),c(7,"option",8),m(8,"Normal"),p()(),c(9,"select",9)(10,"option",8),m(11,"Sans Serif"),p(),c(12,"option",10),m(13,"Serif"),p(),c(14,"option",11),m(15,"Monospace"),p()()(),c(16,"span",4),F(17,"button",12)(18,"button",13)(19,"button",14),p(),c(20,"span",4),F(21,"select",15)(22,"select",16),p(),c(23,"span",4),F(24,"button",17)(25,"button",18),c(26,"select",19),F(27,"option",8),c(28,"option",20),m(29,"center"),p(),c(30,"option",21),m(31,"right"),p(),c(32,"option",22),m(33,"justify"),p()()(),c(34,"span",4),F(35,"button",23)(36,"button",24)(37,"button",25),p(),c(38,"span",4),F(39,"button",26),p()()),t&2){let e=d();C(e.cx("toolbar")),s("pBind",e.ptm("toolbar")),l(),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("header")),l(),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("select")),l(),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("bold")),l(),s("pBind",e.ptm("italic")),l(),s("pBind",e.ptm("underline")),l(),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("color")),l(),s("pBind",e.ptm("background")),l(),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("list")),l(),s("pBind",e.ptm("list")),l(),s("pBind",e.ptm("select")),l(),s("pBind",e.ptm("option")),l(),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("option")),l(2),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("link")),l(),s("pBind",e.ptm("image")),l(),s("pBind",e.ptm("codeBlock")),l(),s("pBind",e.ptm("formats")),l(),s("pBind",e.ptm("clean"))}}var mc={root:({instance:t})=>["p-editor",{"p-invalid":t.invalid()}],toolbar:"p-editor-toolbar",content:"p-editor-content"},Ga=(()=>{class t extends fe{name="editor";style=Qa;classes=mc;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Wa=new ae("EDITOR_INSTANCE"),hc={provide:lt,useExisting:ot(()=>to),multi:!0},to=(()=>{class t extends Lt{componentName="Editor";$pcEditor=v(Wa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}style;styleClass;placeholder;formats;modules;bounds;scrollingContainer;debug;get readonly(){return this._readonly}set readonly(e){this._readonly=e,this.quill&&(this._readonly?this.quill.disable():this.quill.enable())}onEditorInit=new I;onTextChange=new I;onSelectionChange=new I;onEditorChange=new I;onFocus=new I;onBlur=new I;toolbar;value;delayedCommand=null;_readonly=!1;quill;dynamicQuill;headerTemplate;templates;_headerTemplate;get isAttachedQuillEditorToDOM(){return this.quillElements?.editorElement?.isConnected}quillElements;focusListener=null;blurListener=null;_componentStyle=v(Ga);constructor(){super(),Qn(()=>{this.initQuillElements(),this.initQuillEditor()})}onAfterContentInit(){this.templates.forEach(e=>{e.getType()==="header"&&(this.headerTemplate=e.template)})}writeControlValue(e){if(this.value=e,this.quill)if(e){let n=()=>{this.quill.setContents(this.quill.clipboard.convert(this.dynamicQuill.version.startsWith("2")?{html:this.value}:this.value))};this.isAttachedQuillEditorToDOM?n():this.delayedCommand=n}else{let n=()=>{this.quill.setText("")};this.isAttachedQuillEditorToDOM?n():this.delayedCommand=n}}getQuill(){return this.quill}initQuillEditor(){Pr(this.platformId)||(this.dynamicQuill?this.createQuillEditor():import("./chunk-ICMICW2U.js").then(e=>{this.dynamicQuill=e.default,this.createQuillEditor()}).catch(e=>console.error(e.message)))}createQuillEditor(){this.initQuillElements();let{toolbarElement:e,editorElement:n}=this.quillElements,i={toolbar:e},o=this.modules?G(G({},i),this.modules):i;this.quill=new this.dynamicQuill(n,{modules:o,placeholder:this.placeholder,readOnly:this.readonly,theme:"snow",formats:this.formats,bounds:this.bounds,debug:this.debug,scrollingContainer:this.scrollingContainer});let a=this.dynamicQuill.version.startsWith("2");this.value&&this.quill.setContents(this.quill.clipboard.convert(a?{html:this.value}:this.value)),this.quill.on("text-change",(h,f,y)=>{if(y==="user"){let S=a?this.quill.getSemanticHTML():Ee(n,".ql-editor")?.innerHTML,N=this.quill.getText().trim();S==="<p><br></p>"&&(S=null),this.onTextChange.emit({htmlValue:S,textValue:N,delta:h,source:y}),this.onModelChange(S),this.onModelTouched()}}),this.quill.on("selection-change",(h,f,y)=>{this.onSelectionChange.emit({range:h,oldRange:f,source:y})}),this.quill.on("editor-change",(h,...f)=>{this.onEditorChange.emit({eventName:h,args:f})});let u=this.quill.root;this.focusListener=()=>{this.onFocus.emit({source:"user"})},this.blurListener=()=>{this.onBlur.emit({source:"user"})},u.addEventListener("focus",this.focusListener),u.addEventListener("blur",this.blurListener),this.onEditorInit.emit({editor:this.quill})}onDestroy(){if(this.quill&&this.quill.root){let e=this.quill.root;this.focusListener&&(e.removeEventListener("focus",this.focusListener),this.focusListener=null),this.blurListener&&(e.removeEventListener("blur",this.blurListener),this.blurListener=null)}}initQuillElements(){this.quillElements||(this.quillElements={editorElement:Ee(this.el.nativeElement,'div[data-pc-section="content"]'),toolbarElement:Ee(this.el.nativeElement,'div[data-pc-section="toolbar"]')})}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=E({type:t,selectors:[["p-editor"]],contentQueries:function(n,i,o){if(n&1&&Re(o,Xr,5)(o,lc,4)(o,Me,4),n&2){let a;k(a=T())&&(i.toolbar=a.first),k(a=T())&&(i.headerTemplate=a.first),k(a=T())&&(i.templates=a)}},hostVars:2,hostBindings:function(n,i){n&2&&C(i.cn(i.cx("root"),i.styleClass))},inputs:{style:"style",styleClass:"styleClass",placeholder:"placeholder",formats:"formats",modules:"modules",bounds:"bounds",scrollingContainer:"scrollingContainer",debug:"debug",readonly:"readonly"},outputs:{onEditorInit:"onInit",onTextChange:"onTextChange",onSelectionChange:"onSelectionChange",onEditorChange:"onEditorChange",onFocus:"onFocus",onBlur:"onBlur"},features:[le([hc,Ga,{provide:Wa,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:dc,decls:3,vars:6,consts:[[3,"class","pBind",4,"ngIf"],[3,"ngStyle","pBind"],[3,"pBind"],[4,"ngTemplateOutlet"],[1,"ql-formats",3,"pBind"],[1,"ql-header",3,"pBind"],["value","1",3,"pBind"],["value","2",3,"pBind"],["selected","",3,"pBind"],[1,"ql-font",3,"pBind"],["value","serif",3,"pBind"],["value","monospace",3,"pBind"],["aria-label","Bold","type","button",1,"ql-bold",3,"pBind"],["aria-label","Italic","type","button",1,"ql-italic",3,"pBind"],["aria-label","Underline","type","button",1,"ql-underline",3,"pBind"],[1,"ql-color",3,"pBind"],[1,"ql-background",3,"pBind"],["value","ordered","aria-label","Ordered List","type","button",1,"ql-list",3,"pBind"],["value","bullet","aria-label","Unordered List","type","button",1,"ql-list",3,"pBind"],[1,"ql-align",3,"pBind"],["value","center",3,"pBind"],["value","right",3,"pBind"],["value","justify",3,"pBind"],["aria-label","Insert Link","type","button",1,"ql-link",3,"pBind"],["aria-label","Insert Image","type","button",1,"ql-image",3,"pBind"],["aria-label","Insert Code Block","type","button",1,"ql-code-block",3,"pBind"],["aria-label","Remove Styles","type","button",1,"ql-clean",3,"pBind"]],template:function(n,i){n&1&&(Ge(sc),g(0,pc,3,4,"div",0)(1,uc,40,33,"div",0),F(2,"div",1)),n&2&&(s("ngIf",i.toolbar||i.headerTemplate||i._headerTemplate),l(),s("ngIf",!i.toolbar&&!i.headerTemplate&&!i._headerTemplate),l(),C(i.cx("content")),s("ngStyle",i.style)("pBind",i.ptm("content")))},dependencies:[te,ze,Le,rt,ie,Ve,A],encapsulation:2,changeDetection:0})}return t})(),Ka=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[to,ie,ie]})}return t})();var de=(()=>{class t{static zindex=1e3;static calculatedScrollbarWidth=null;static calculatedScrollbarHeight=null;static browser;static addClass(e,n){e&&n&&(e.classList?e.classList.add(n):e.className+=" "+n)}static addMultipleClasses(e,n){if(e&&n)if(e.classList){let i=n.trim().split(" ");for(let o=0;o<i.length;o++)e.classList.add(i[o])}else{let i=n.split(" ");for(let o=0;o<i.length;o++)e.className+=" "+i[o]}}static removeClass(e,n){e&&n&&(e.classList?e.classList.remove(n):e.className=e.className.replace(new RegExp("(^|\\b)"+n.split(" ").join("|")+"(\\b|$)","gi")," "))}static removeMultipleClasses(e,n){e&&n&&[n].flat().filter(Boolean).forEach(i=>i.split(" ").forEach(o=>this.removeClass(e,o)))}static hasClass(e,n){return e&&n?e.classList?e.classList.contains(n):new RegExp("(^| )"+n+"( |$)","gi").test(e.className):!1}static siblings(e){return Array.prototype.filter.call(e.parentNode.children,function(n){return n!==e})}static find(e,n){return Array.from(e.querySelectorAll(n))}static findSingle(e,n){return this.isElement(e)?e.querySelector(n):null}static index(e){let n=e.parentNode.childNodes,i=0;for(var o=0;o<n.length;o++){if(n[o]==e)return i;n[o].nodeType==1&&i++}return-1}static indexWithinGroup(e,n){let i=e.parentNode?e.parentNode.childNodes:[],o=0;for(var a=0;a<i.length;a++){if(i[a]==e)return o;i[a].attributes&&i[a].attributes[n]&&i[a].nodeType==1&&o++}return-1}static appendOverlay(e,n,i="self"){i!=="self"&&e&&n&&this.appendChild(e,n)}static alignOverlay(e,n,i="self",o=!0){e&&n&&(o&&(e.style.minWidth=`${t.getOuterWidth(n)}px`),i==="self"?this.relativePosition(e,n):this.absolutePosition(e,n))}static relativePosition(e,n,i=!0){let o=xe=>{if(xe)return getComputedStyle(xe).getPropertyValue("position")==="relative"?xe:o(xe.parentElement)},a=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),u=n.offsetHeight,h=n.getBoundingClientRect(),f=this.getWindowScrollTop(),y=this.getWindowScrollLeft(),S=this.getViewport(),B=o(e)?.getBoundingClientRect()||{top:-1*f,left:-1*y},q,j,H="top";h.top+u+a.height>S.height?(q=h.top-B.top-a.height,H="bottom",h.top+q<0&&(q=-1*h.top)):(q=u+h.top-B.top,H="top");let pe=h.left+a.width-S.width,ke=h.left-B.left;if(a.width>S.width?j=(h.left-B.left)*-1:pe>0?j=ke-pe:j=h.left-B.left,e.style.top=q+"px",e.style.left=j+"px",e.style.transformOrigin=H,i){let xe=Vr(/-anchor-gutter$/)?.value;e.style.marginTop=H==="bottom"?`calc(${xe??"2px"} * -1)`:xe??""}}static absolutePosition(e,n,i=!0){let o=e.offsetParent?{width:e.offsetWidth,height:e.offsetHeight}:this.getHiddenElementDimensions(e),a=o.height,u=o.width,h=n.offsetHeight,f=n.offsetWidth,y=n.getBoundingClientRect(),S=this.getWindowScrollTop(),N=this.getWindowScrollLeft(),B=this.getViewport(),q,j;y.top+h+a>B.height?(q=y.top+S-a,e.style.transformOrigin="bottom",q<0&&(q=S)):(q=h+y.top+S,e.style.transformOrigin="top"),y.left+u>B.width?j=Math.max(0,y.left+N+f-u):j=y.left+N,e.style.top=q+"px",e.style.left=j+"px",i&&(e.style.marginTop=origin==="bottom"?"calc(var(--p-anchor-gutter) * -1)":"calc(var(--p-anchor-gutter))")}static getParents(e,n=[]){return e.parentNode===null?n:this.getParents(e.parentNode,n.concat([e.parentNode]))}static getScrollableParents(e){let n=[];if(e){let i=this.getParents(e),o=/(auto|scroll)/,a=u=>{let h=window.getComputedStyle(u,null);return o.test(h.getPropertyValue("overflow"))||o.test(h.getPropertyValue("overflowX"))||o.test(h.getPropertyValue("overflowY"))};for(let u of i){let h=u.nodeType===1&&u.dataset.scrollselectors;if(h){let f=h.split(",");for(let y of f){let S=this.findSingle(u,y);S&&a(S)&&n.push(S)}}u.nodeType!==9&&a(u)&&n.push(u)}}return n}static getHiddenElementOuterHeight(e){e.style.visibility="hidden",e.style.display="block";let n=e.offsetHeight;return e.style.display="none",e.style.visibility="visible",n}static getHiddenElementOuterWidth(e){e.style.visibility="hidden",e.style.display="block";let n=e.offsetWidth;return e.style.display="none",e.style.visibility="visible",n}static getHiddenElementDimensions(e){let n={};return e.style.visibility="hidden",e.style.display="block",n.width=e.offsetWidth,n.height=e.offsetHeight,e.style.display="none",e.style.visibility="visible",n}static scrollInView(e,n){let i=getComputedStyle(e).getPropertyValue("borderTopWidth"),o=i?parseFloat(i):0,a=getComputedStyle(e).getPropertyValue("paddingTop"),u=a?parseFloat(a):0,h=e.getBoundingClientRect(),y=n.getBoundingClientRect().top+document.body.scrollTop-(h.top+document.body.scrollTop)-o-u,S=e.scrollTop,N=e.clientHeight,B=this.getOuterHeight(n);y<0?e.scrollTop=S+y:y+B>N&&(e.scrollTop=S+y-N+B)}static fadeIn(e,n){e.style.opacity=0;let i=+new Date,o=0,a=function(){o=+e.style.opacity.replace(",",".")+(new Date().getTime()-i)/n,e.style.opacity=o,i=+new Date,+o<1&&(window.requestAnimationFrame?window.requestAnimationFrame(a):setTimeout(a,16))};a()}static fadeOut(e,n){var i=1,o=50,a=n,u=o/a;let h=setInterval(()=>{i=i-u,i<=0&&(i=0,clearInterval(h)),e.style.opacity=i},o)}static getWindowScrollTop(){let e=document.documentElement;return(window.pageYOffset||e.scrollTop)-(e.clientTop||0)}static getWindowScrollLeft(){let e=document.documentElement;return(window.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}static matches(e,n){var i=Element.prototype,o=i.matches||i.webkitMatchesSelector||i.mozMatchesSelector||i.msMatchesSelector||function(a){return[].indexOf.call(document.querySelectorAll(a),this)!==-1};return o.call(e,n)}static getOuterWidth(e,n){let i=e.offsetWidth;if(n){let o=getComputedStyle(e);i+=parseFloat(o.marginLeft)+parseFloat(o.marginRight)}return i}static getHorizontalPadding(e){let n=getComputedStyle(e);return parseFloat(n.paddingLeft)+parseFloat(n.paddingRight)}static getHorizontalMargin(e){let n=getComputedStyle(e);return parseFloat(n.marginLeft)+parseFloat(n.marginRight)}static innerWidth(e){let n=e.offsetWidth,i=getComputedStyle(e);return n+=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),n}static width(e){let n=e.offsetWidth,i=getComputedStyle(e);return n-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight),n}static getInnerHeight(e){let n=e.offsetHeight,i=getComputedStyle(e);return n+=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom),n}static getOuterHeight(e,n){let i=e.offsetHeight;if(n){let o=getComputedStyle(e);i+=parseFloat(o.marginTop)+parseFloat(o.marginBottom)}return i}static getHeight(e){let n=e.offsetHeight,i=getComputedStyle(e);return n-=parseFloat(i.paddingTop)+parseFloat(i.paddingBottom)+parseFloat(i.borderTopWidth)+parseFloat(i.borderBottomWidth),n}static getWidth(e){let n=e.offsetWidth,i=getComputedStyle(e);return n-=parseFloat(i.paddingLeft)+parseFloat(i.paddingRight)+parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth),n}static getViewport(){let e=window,n=document,i=n.documentElement,o=n.getElementsByTagName("body")[0],a=e.innerWidth||i.clientWidth||o.clientWidth,u=e.innerHeight||i.clientHeight||o.clientHeight;return{width:a,height:u}}static getOffset(e){var n=e.getBoundingClientRect();return{top:n.top+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0),left:n.left+(window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0)}}static replaceElementWith(e,n){let i=e.parentNode;if(!i)throw"Can't replace element";return i.replaceChild(n,e)}static getUserAgent(){if(navigator&&this.isClient())return navigator.userAgent}static isIE(){var e=window.navigator.userAgent,n=e.indexOf("MSIE ");if(n>0)return!0;var i=e.indexOf("Trident/");if(i>0){var o=e.indexOf("rv:");return!0}var a=e.indexOf("Edge/");return a>0}static isIOS(){return/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream}static isAndroid(){return/(android)/i.test(navigator.userAgent)}static isTouchDevice(){return"ontouchstart"in window||navigator.maxTouchPoints>0}static appendChild(e,n){if(this.isElement(n))n.appendChild(e);else if(n&&n.el&&n.el.nativeElement)n.el.nativeElement.appendChild(e);else throw"Cannot append "+n+" to "+e}static removeChild(e,n){if(this.isElement(n))n.removeChild(e);else if(n.el&&n.el.nativeElement)n.el.nativeElement.removeChild(e);else throw"Cannot remove "+e+" from "+n}static removeElement(e){"remove"in Element.prototype?e.remove():e.parentNode?.removeChild(e)}static isElement(e){return typeof HTMLElement=="object"?e instanceof HTMLElement:e&&typeof e=="object"&&e!==null&&e.nodeType===1&&typeof e.nodeName=="string"}static calculateScrollbarWidth(e){if(e){let n=getComputedStyle(e);return e.offsetWidth-e.clientWidth-parseFloat(n.borderLeftWidth)-parseFloat(n.borderRightWidth)}else{if(this.calculatedScrollbarWidth!==null)return this.calculatedScrollbarWidth;let n=document.createElement("div");n.className="p-scrollbar-measure",document.body.appendChild(n);let i=n.offsetWidth-n.clientWidth;return document.body.removeChild(n),this.calculatedScrollbarWidth=i,i}}static calculateScrollbarHeight(){if(this.calculatedScrollbarHeight!==null)return this.calculatedScrollbarHeight;let e=document.createElement("div");e.className="p-scrollbar-measure",document.body.appendChild(e);let n=e.offsetHeight-e.clientHeight;return document.body.removeChild(e),this.calculatedScrollbarWidth=n,n}static invokeElementMethod(e,n,i){e[n].apply(e,i)}static clearSelection(){if(window.getSelection&&window.getSelection())window.getSelection()?.empty?window.getSelection()?.empty():window.getSelection()?.removeAllRanges&&(window.getSelection()?.rangeCount||0)>0&&(window.getSelection()?.getRangeAt(0)?.getClientRects()?.length||0)>0&&window.getSelection()?.removeAllRanges();else if(document.selection&&document.selection.empty)try{document.selection.empty()}catch{}}static getBrowser(){if(!this.browser){let e=this.resolveUserAgent();this.browser={},e.browser&&(this.browser[e.browser]=!0,this.browser.version=e.version),this.browser.chrome?this.browser.webkit=!0:this.browser.webkit&&(this.browser.safari=!0)}return this.browser}static resolveUserAgent(){let e=navigator.userAgent.toLowerCase(),n=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[];return{browser:n[1]||"",version:n[2]||"0"}}static isInteger(e){return Number.isInteger?Number.isInteger(e):typeof e=="number"&&isFinite(e)&&Math.floor(e)===e}static isHidden(e){return!e||e.offsetParent===null}static isVisible(e){return e&&e.offsetParent!=null}static isExist(e){return e!==null&&typeof e<"u"&&e.nodeName&&e.parentNode}static focus(e,n){e&&document.activeElement!==e&&e.focus(n)}static getFocusableSelectorString(e=""){return`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-inputtext:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e},
        .p-button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${e}`}static getFocusableElements(e,n=""){let i=this.find(e,this.getFocusableSelectorString(n)),o=[];for(let a of i){let u=getComputedStyle(a);this.isVisible(a)&&u.display!="none"&&u.visibility!="hidden"&&o.push(a)}return o}static getFocusableElement(e,n=""){let i=this.findSingle(e,this.getFocusableSelectorString(n));if(i){let o=getComputedStyle(i);if(this.isVisible(i)&&o.display!="none"&&o.visibility!="hidden")return i}return null}static getFirstFocusableElement(e,n=""){let i=this.getFocusableElements(e,n);return i.length>0?i[0]:null}static getLastFocusableElement(e,n){let i=this.getFocusableElements(e,n);return i.length>0?i[i.length-1]:null}static getNextFocusableElement(e,n=!1){let i=t.getFocusableElements(e),o=0;if(i&&i.length>0){let a=i.indexOf(i[0].ownerDocument.activeElement);n?a==-1||a===0?o=i.length-1:o=a-1:a!=-1&&a!==i.length-1&&(o=a+1)}return i[o]}static generateZIndex(){return this.zindex=this.zindex||999,++this.zindex}static getSelection(){return window.getSelection?window.getSelection()?.toString():document.getSelection?document.getSelection()?.toString():document.selection?document.selection.createRange().text:null}static getTargetElement(e,n){if(!e)return null;switch(e){case"document":return document;case"window":return window;case"@next":return n?.nextElementSibling;case"@prev":return n?.previousElementSibling;case"@parent":return n?.parentElement;case"@grandparent":return n?.parentElement?.parentElement;default:let i=typeof e;if(i==="string")return document.querySelector(e);if(i==="object"&&e.hasOwnProperty("nativeElement"))return this.isExist(e.nativeElement)?e.nativeElement:void 0;let a=(u=>!!(u&&u.constructor&&u.call&&u.apply))(e)?e():e;return a&&a.nodeType===9||this.isExist(a)?a:null}}static isClient(){return!!(typeof window<"u"&&window.document&&window.document.createElement)}static getAttribute(e,n){if(e){let i=e.getAttribute(n);return isNaN(i)?i==="true"||i==="false"?i==="true":i:+i}}static calculateBodyScrollbarWidth(){return window.innerWidth-document.documentElement.offsetWidth}static blockBodyScroll(e="p-overflow-hidden"){document.body.style.setProperty("--scrollbar-width",this.calculateBodyScrollbarWidth()+"px"),this.addClass(document.body,e)}static unblockBodyScroll(e="p-overflow-hidden"){document.body.style.removeProperty("--scrollbar-width"),this.removeClass(document.body,e)}static createElement(e,n={},...i){if(e){let o=document.createElement(e);return this.setAttributes(o,n),o.append(...i),o}}static setAttribute(e,n="",i){this.isElement(e)&&i!==null&&i!==void 0&&e.setAttribute(n,i)}static setAttributes(e,n={}){if(this.isElement(e)){let i=(o,a)=>{let u=e?.$attrs?.[o]?[e?.$attrs?.[o]]:[];return[a].flat().reduce((h,f)=>{if(f!=null){let y=typeof f;if(y==="string"||y==="number")h.push(f);else if(y==="object"){let S=Array.isArray(f)?i(o,f):Object.entries(f).map(([N,B])=>o==="style"&&(B||B===0)?`${N.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}:${B}`:B?N:void 0);h=S.length?h.concat(S.filter(N=>!!N)):h}}return h},u)};Object.entries(n).forEach(([o,a])=>{if(a!=null){let u=o.match(/^on(.+)/);u?e.addEventListener(u[1].toLowerCase(),a):o==="pBind"?this.setAttributes(e,a):(a=o==="class"?[...new Set(i("class",a))].join(" ").trim():o==="style"?i("style",a).join(";").trim():a,(e.$attrs=e.$attrs||{})&&(e.$attrs[o]=a),e.setAttribute(o,a))}})}}static isFocusableElement(e,n=""){return this.isElement(e)?e.matches(`button:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [href][clientHeight][clientWidth]:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                input:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                select:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                textarea:not([tabindex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [tabIndex]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n},
                [contenteditable]:not([tabIndex = "-1"]):not([disabled]):not([style*="display:none"]):not([hidden])${n}`):!1}}return t})();function ci(){Br({variableName:Oo("scrollbar.width").name})}function xn(){Or({variableName:Oo("scrollbar.width").name})}var rn=class{element;listener;scrollableParents;constructor(r,e=()=>{}){this.element=r,this.listener=e}bindScrollListener(){this.scrollableParents=de.getScrollableParents(this.element);for(let r=0;r<this.scrollableParents.length;r++)this.scrollableParents[r].addEventListener("scroll",this.listener)}unbindScrollListener(){if(this.scrollableParents)for(let r=0;r<this.scrollableParents.length;r++)this.scrollableParents[r].removeEventListener("scroll",this.listener)}destroy(){this.unbindScrollListener(),this.element=null,this.listener=null,this.scrollableParents=null}};var Xt=(()=>{class t extends De{autofocus=!1;focused=!1;platformId=v(Tn);document=v(_t);host=v(Ot);onAfterContentChecked(){this.autofocus===!1?this.host.nativeElement.removeAttribute("autofocus"):this.host.nativeElement.setAttribute("autofocus",!0),this.focused||this.autoFocus()}onAfterViewChecked(){this.focused||this.autoFocus()}autoFocus(){qe(this.platformId)&&this.autofocus&&setTimeout(()=>{let e=de.getFocusableElements(this.host?.nativeElement);e.length===0&&this.host.nativeElement.focus(),e.length>0&&e[0].focus(),this.focused=!0})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275dir=Oe({type:t,selectors:[["","pAutoFocus",""]],inputs:{autofocus:[0,"pAutoFocus","autofocus"]},features:[L]})}return t})();var Ya=`
    .p-badge {
        display: inline-flex;
        border-radius: dt('badge.border.radius');
        align-items: center;
        justify-content: center;
        padding: dt('badge.padding');
        background: dt('badge.primary.background');
        color: dt('badge.primary.color');
        font-size: dt('badge.font.size');
        font-weight: dt('badge.font.weight');
        min-width: dt('badge.min.width');
        height: dt('badge.height');
    }

    .p-badge-dot {
        width: dt('badge.dot.size');
        min-width: dt('badge.dot.size');
        height: dt('badge.dot.size');
        border-radius: 50%;
        padding: 0;
    }

    .p-badge-circle {
        padding: 0;
        border-radius: 50%;
    }

    .p-badge-secondary {
        background: dt('badge.secondary.background');
        color: dt('badge.secondary.color');
    }

    .p-badge-success {
        background: dt('badge.success.background');
        color: dt('badge.success.color');
    }

    .p-badge-info {
        background: dt('badge.info.background');
        color: dt('badge.info.color');
    }

    .p-badge-warn {
        background: dt('badge.warn.background');
        color: dt('badge.warn.color');
    }

    .p-badge-danger {
        background: dt('badge.danger.background');
        color: dt('badge.danger.color');
    }

    .p-badge-contrast {
        background: dt('badge.contrast.background');
        color: dt('badge.contrast.color');
    }

    .p-badge-sm {
        font-size: dt('badge.sm.font.size');
        min-width: dt('badge.sm.min.width');
        height: dt('badge.sm.height');
    }

    .p-badge-lg {
        font-size: dt('badge.lg.font.size');
        min-width: dt('badge.lg.min.width');
        height: dt('badge.lg.height');
    }

    .p-badge-xl {
        font-size: dt('badge.xl.font.size');
        min-width: dt('badge.xl.min.width');
        height: dt('badge.xl.height');
    }
`;var gc=`
    ${Ya}

    /* For PrimeNG (directive)*/
    .p-overlay-badge {
        position: relative;
    }

    .p-overlay-badge > .p-badge {
        position: absolute;
        top: 0;
        inset-inline-end: 0;
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
        margin: 0;
    }
`,_c={root:({instance:t})=>{let r=typeof t.value=="function"?t.value():t.value,e=typeof t.size=="function"?t.size():t.size,n=typeof t.badgeSize=="function"?t.badgeSize():t.badgeSize,i=typeof t.severity=="function"?t.severity():t.severity;return["p-badge p-component",{"p-badge-circle":Wt(r)&&String(r).length===1,"p-badge-dot":ti(r),"p-badge-sm":e==="small"||n==="small","p-badge-lg":e==="large"||n==="large","p-badge-xl":e==="xlarge"||n==="xlarge","p-badge-info":i==="info","p-badge-success":i==="success","p-badge-warn":i==="warn","p-badge-danger":i==="danger","p-badge-secondary":i==="secondary","p-badge-contrast":i==="contrast"}]}},Za=(()=>{class t extends fe{name="badge";style=gc;classes=_c;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Xa=new ae("BADGE_INSTANCE");var er=(()=>{class t extends De{componentName="Badge";$pcBadge=v(Xa,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass=ee();badgeSize=ee();size=ee();severity=ee();value=ee();badgeDisabled=ee(!1,{transform:w});_componentStyle=v(Za);get dataP(){return this.cn({circle:this.value()!=null&&String(this.value()).length===1,empty:this.value()==null,disabled:this.badgeDisabled(),[this.severity()]:this.severity(),[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-badge"]],hostVars:5,hostBindings:function(n,i){n&2&&(D("data-p",i.dataP),C(i.cn(i.cx("root"),i.styleClass())),je("display",i.badgeDisabled()?"none":null))},inputs:{styleClass:[1,"styleClass"],badgeSize:[1,"badgeSize"],size:[1,"size"],severity:[1,"severity"],value:[1,"value"],badgeDisabled:[1,"badgeDisabled"]},features:[le([Za,{provide:Xa,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:1,vars:1,template:function(n,i){n&1&&m(0),n&2&&Q(i.value())},dependencies:[te,ie,Ve],encapsulation:2,changeDetection:0})}return t})(),no=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[er,ie,ie]})}return t})();var yc=["*"],vc={root:"p-fluid"},Ja=(()=>{class t extends fe{name="fluid";classes=vc;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var el=new ae("FLUID_INSTANCE"),An=(()=>{class t extends De{componentName="Fluid";$pcFluid=v(el,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}_componentStyle=v(Ja);static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-fluid"]],hostVars:2,hostBindings:function(n,i){n&2&&C(i.cx("root"))},features:[le([Ja,{provide:el,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:yc,decls:1,vars:0,template:function(n,i){n&1&&(Ge(),Ne(0))},dependencies:[te],encapsulation:2,changeDetection:0})}return t})();var xc=["data-p-icon","angle-double-left"],tl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-double-left"]],features:[L],attrs:xc,decls:1,vars:0,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M5.71602 11.164C5.80782 11.2021 5.9063 11.2215 6.00569 11.221C6.20216 11.2301 6.39427 11.1612 6.54025 11.0294C6.68191 10.8875 6.76148 10.6953 6.76148 10.4948C6.76148 10.2943 6.68191 10.1021 6.54025 9.96024L3.51441 6.9344L6.54025 3.90855C6.624 3.76126 6.65587 3.59011 6.63076 3.42254C6.60564 3.25498 6.525 3.10069 6.40175 2.98442C6.2785 2.86815 6.11978 2.79662 5.95104 2.7813C5.78229 2.76598 5.61329 2.80776 5.47112 2.89994L1.97123 6.39983C1.82957 6.54167 1.75 6.73393 1.75 6.9344C1.75 7.13486 1.82957 7.32712 1.97123 7.46896L5.47112 10.9991C5.54096 11.0698 5.62422 11.1259 5.71602 11.164ZM11.0488 10.9689C11.1775 11.1156 11.3585 11.2061 11.5531 11.221C11.7477 11.2061 11.9288 11.1156 12.0574 10.9689C12.1815 10.8302 12.25 10.6506 12.25 10.4645C12.25 10.2785 12.1815 10.0989 12.0574 9.96024L9.03158 6.93439L12.0574 3.90855C12.1248 3.76739 12.1468 3.60881 12.1204 3.45463C12.0939 3.30045 12.0203 3.15826 11.9097 3.04765C11.7991 2.93703 11.6569 2.86343 11.5027 2.83698C11.3486 2.81053 11.19 2.83252 11.0488 2.89994L7.51865 6.36957C7.37699 6.51141 7.29742 6.70367 7.29742 6.90414C7.29742 7.1046 7.37699 7.29686 7.51865 7.4387L11.0488 10.9689Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Cc=["data-p-icon","angle-double-right"],nl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-double-right"]],features:[L],attrs:Cc,decls:1,vars:0,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M7.68757 11.1451C7.7791 11.1831 7.8773 11.2024 7.9764 11.2019C8.07769 11.1985 8.17721 11.1745 8.26886 11.1312C8.36052 11.088 8.44238 11.0265 8.50943 10.9505L12.0294 7.49085C12.1707 7.34942 12.25 7.15771 12.25 6.95782C12.25 6.75794 12.1707 6.56622 12.0294 6.42479L8.50943 2.90479C8.37014 2.82159 8.20774 2.78551 8.04633 2.80192C7.88491 2.81833 7.73309 2.88635 7.6134 2.99588C7.4937 3.10541 7.41252 3.25061 7.38189 3.40994C7.35126 3.56927 7.37282 3.73423 7.44337 3.88033L10.4605 6.89748L7.44337 9.91463C7.30212 10.0561 7.22278 10.2478 7.22278 10.4477C7.22278 10.6475 7.30212 10.8393 7.44337 10.9807C7.51301 11.0512 7.59603 11.1071 7.68757 11.1451ZM1.94207 10.9505C2.07037 11.0968 2.25089 11.1871 2.44493 11.2019C2.63898 11.1871 2.81949 11.0968 2.94779 10.9505L6.46779 7.49085C6.60905 7.34942 6.68839 7.15771 6.68839 6.95782C6.68839 6.75793 6.60905 6.56622 6.46779 6.42479L2.94779 2.90479C2.80704 2.83757 2.6489 2.81563 2.49517 2.84201C2.34143 2.86839 2.19965 2.94178 2.08936 3.05207C1.97906 3.16237 1.90567 3.30415 1.8793 3.45788C1.85292 3.61162 1.87485 3.76975 1.94207 3.9105L4.95922 6.92765L1.94207 9.9448C1.81838 10.0831 1.75 10.2621 1.75 10.4477C1.75 10.6332 1.81838 10.8122 1.94207 10.9505Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var wc=["data-p-icon","angle-down"],il=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-down"]],features:[L],attrs:wc,decls:1,vars:0,consts:[["d","M3.58659 4.5007C3.68513 4.50023 3.78277 4.51945 3.87379 4.55723C3.9648 4.59501 4.04735 4.65058 4.11659 4.7207L7.11659 7.7207L10.1166 4.7207C10.2619 4.65055 10.4259 4.62911 10.5843 4.65956C10.7427 4.69002 10.8871 4.77074 10.996 4.88976C11.1049 5.00877 11.1726 5.15973 11.1889 5.32022C11.2052 5.48072 11.1693 5.6422 11.0866 5.7807L7.58659 9.2807C7.44597 9.42115 7.25534 9.50004 7.05659 9.50004C6.85784 9.50004 6.66722 9.42115 6.52659 9.2807L3.02659 5.7807C2.88614 5.64007 2.80725 5.44945 2.80725 5.2507C2.80725 5.05195 2.88614 4.86132 3.02659 4.7207C3.09932 4.64685 3.18675 4.58911 3.28322 4.55121C3.37969 4.51331 3.48305 4.4961 3.58659 4.5007Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var kc=["data-p-icon","angle-left"],ol=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-left"]],features:[L],attrs:kc,decls:1,vars:0,consts:[["d","M8.75 11.185C8.65146 11.1854 8.55381 11.1662 8.4628 11.1284C8.37179 11.0906 8.28924 11.0351 8.22 10.965L4.72 7.46496C4.57955 7.32433 4.50066 7.13371 4.50066 6.93496C4.50066 6.73621 4.57955 6.54558 4.72 6.40496L8.22 2.93496C8.36095 2.84357 8.52851 2.80215 8.69582 2.81733C8.86312 2.83252 9.02048 2.90344 9.14268 3.01872C9.26487 3.134 9.34483 3.28696 9.36973 3.4531C9.39463 3.61924 9.36303 3.78892 9.28 3.93496L6.28 6.93496L9.28 9.93496C9.42045 10.0756 9.49934 10.2662 9.49934 10.465C9.49934 10.6637 9.42045 10.8543 9.28 10.995C9.13526 11.1257 8.9448 11.1939 8.75 11.185Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Tc=["data-p-icon","angle-right"],rl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-right"]],features:[L],attrs:Tc,decls:1,vars:0,consts:[["d","M5.25 11.1728C5.14929 11.1694 5.05033 11.1455 4.9592 11.1025C4.86806 11.0595 4.78666 10.9984 4.72 10.9228C4.57955 10.7822 4.50066 10.5916 4.50066 10.3928C4.50066 10.1941 4.57955 10.0035 4.72 9.86283L7.72 6.86283L4.72 3.86283C4.66067 3.71882 4.64765 3.55991 4.68275 3.40816C4.71785 3.25642 4.79932 3.11936 4.91585 3.01602C5.03238 2.91268 5.17819 2.84819 5.33305 2.83149C5.4879 2.81479 5.64411 2.84671 5.78 2.92283L9.28 6.42283C9.42045 6.56346 9.49934 6.75408 9.49934 6.95283C9.49934 7.15158 9.42045 7.34221 9.28 7.48283L5.78 10.9228C5.71333 10.9984 5.63193 11.0595 5.5408 11.1025C5.44966 11.1455 5.35071 11.1694 5.25 11.1728Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Sc=["data-p-icon","angle-up"],al=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","angle-up"]],features:[L],attrs:Sc,decls:1,vars:0,consts:[["d","M10.4134 9.49931C10.3148 9.49977 10.2172 9.48055 10.1262 9.44278C10.0352 9.405 9.95263 9.34942 9.88338 9.27931L6.88338 6.27931L3.88338 9.27931C3.73811 9.34946 3.57409 9.3709 3.41567 9.34044C3.25724 9.30999 3.11286 9.22926 3.00395 9.11025C2.89504 8.99124 2.82741 8.84028 2.8111 8.67978C2.79478 8.51928 2.83065 8.35781 2.91338 8.21931L6.41338 4.71931C6.55401 4.57886 6.74463 4.49997 6.94338 4.49997C7.14213 4.49997 7.33276 4.57886 7.47338 4.71931L10.9734 8.21931C11.1138 8.35994 11.1927 8.55056 11.1927 8.74931C11.1927 8.94806 11.1138 9.13868 10.9734 9.27931C10.9007 9.35315 10.8132 9.41089 10.7168 9.44879C10.6203 9.48669 10.5169 9.5039 10.4134 9.49931Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Ic=["data-p-icon","arrow-down"],tr=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","arrow-down"]],features:[L],attrs:Ic,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M6.99994 14C6.91097 14.0004 6.82281 13.983 6.74064 13.9489C6.65843 13.9148 6.58387 13.8646 6.52133 13.8013L1.10198 8.38193C0.982318 8.25351 0.917175 8.08367 0.920272 7.90817C0.923368 7.73267 0.994462 7.56523 1.11858 7.44111C1.24269 7.317 1.41014 7.2459 1.58563 7.2428C1.76113 7.23971 1.93098 7.30485 2.0594 7.42451L6.32263 11.6877V0.677419C6.32263 0.497756 6.394 0.325452 6.52104 0.198411C6.64808 0.0713706 6.82039 0 7.00005 0C7.17971 0 7.35202 0.0713706 7.47906 0.198411C7.6061 0.325452 7.67747 0.497756 7.67747 0.677419V11.6877L11.9407 7.42451C12.0691 7.30485 12.2389 7.23971 12.4144 7.2428C12.5899 7.2459 12.7574 7.317 12.8815 7.44111C13.0056 7.56523 13.0767 7.73267 13.0798 7.90817C13.0829 8.08367 13.0178 8.25351 12.8981 8.38193L7.47875 13.8013C7.41621 13.8646 7.34164 13.9148 7.25944 13.9489C7.17727 13.983 7.08912 14.0004 7.00015 14C7.00012 14 7.00009 14 7.00005 14C7.00001 14 6.99998 14 6.99994 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Ec=["data-p-icon","arrow-up"],nr=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","arrow-up"]],features:[L],attrs:Ec,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M6.51551 13.799C6.64205 13.9255 6.813 13.9977 6.99193 14C7.17087 13.9977 7.34182 13.9255 7.46835 13.799C7.59489 13.6725 7.66701 13.5015 7.66935 13.3226V2.31233L11.9326 6.57554C11.9951 6.63887 12.0697 6.68907 12.1519 6.72319C12.2341 6.75731 12.3223 6.77467 12.4113 6.77425C12.5003 6.77467 12.5885 6.75731 12.6707 6.72319C12.7529 6.68907 12.8274 6.63887 12.89 6.57554C13.0168 6.44853 13.0881 6.27635 13.0881 6.09683C13.0881 5.91732 13.0168 5.74514 12.89 5.61812L7.48846 0.216594C7.48274 0.210436 7.4769 0.204374 7.47094 0.198411C7.3439 0.0713707 7.1716 0 6.99193 0C6.81227 0 6.63997 0.0713707 6.51293 0.198411C6.50704 0.204296 6.50128 0.210278 6.49563 0.216354L1.09386 5.61812C0.974201 5.74654 0.909057 5.91639 0.912154 6.09189C0.91525 6.26738 0.986345 6.43483 1.11046 6.55894C1.23457 6.68306 1.40202 6.75415 1.57752 6.75725C1.75302 6.76035 1.92286 6.6952 2.05128 6.57554L6.31451 2.31231V13.3226C6.31685 13.5015 6.38898 13.6725 6.51551 13.799Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Dc=["data-p-icon","blank"],ll=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","blank"]],features:[L],attrs:Dc,decls:1,vars:0,consts:[["width","1","height","1","fill","currentColor","fill-opacity","0"]],template:function(n,i){n&1&&(O(),X(0,"rect",0))},encapsulation:2})}return t})();var Mc=["data-p-icon","calendar"],sl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","calendar"]],features:[L],attrs:Mc,decls:1,vars:0,consts:[["d","M10.7838 1.51351H9.83783V0.567568C9.83783 0.417039 9.77804 0.272676 9.6716 0.166237C9.56516 0.0597971 9.42079 0 9.27027 0C9.11974 0 8.97538 0.0597971 8.86894 0.166237C8.7625 0.272676 8.7027 0.417039 8.7027 0.567568V1.51351H5.29729V0.567568C5.29729 0.417039 5.2375 0.272676 5.13106 0.166237C5.02462 0.0597971 4.88025 0 4.72973 0C4.5792 0 4.43484 0.0597971 4.3284 0.166237C4.22196 0.272676 4.16216 0.417039 4.16216 0.567568V1.51351H3.21621C2.66428 1.51351 2.13494 1.73277 1.74467 2.12305C1.35439 2.51333 1.13513 3.04266 1.13513 3.59459V11.9189C1.13513 12.4709 1.35439 13.0002 1.74467 13.3905C2.13494 13.7807 2.66428 14 3.21621 14H10.7838C11.3357 14 11.865 13.7807 12.2553 13.3905C12.6456 13.0002 12.8649 12.4709 12.8649 11.9189V3.59459C12.8649 3.04266 12.6456 2.51333 12.2553 2.12305C11.865 1.73277 11.3357 1.51351 10.7838 1.51351ZM3.21621 2.64865H4.16216V3.59459C4.16216 3.74512 4.22196 3.88949 4.3284 3.99593C4.43484 4.10237 4.5792 4.16216 4.72973 4.16216C4.88025 4.16216 5.02462 4.10237 5.13106 3.99593C5.2375 3.88949 5.29729 3.74512 5.29729 3.59459V2.64865H8.7027V3.59459C8.7027 3.74512 8.7625 3.88949 8.86894 3.99593C8.97538 4.10237 9.11974 4.16216 9.27027 4.16216C9.42079 4.16216 9.56516 4.10237 9.6716 3.99593C9.77804 3.88949 9.83783 3.74512 9.83783 3.59459V2.64865H10.7838C11.0347 2.64865 11.2753 2.74831 11.4527 2.92571C11.6301 3.10311 11.7297 3.34371 11.7297 3.59459V5.67568H2.27027V3.59459C2.27027 3.34371 2.36993 3.10311 2.54733 2.92571C2.72473 2.74831 2.96533 2.64865 3.21621 2.64865ZM10.7838 12.8649H3.21621C2.96533 12.8649 2.72473 12.7652 2.54733 12.5878C2.36993 12.4104 2.27027 12.1698 2.27027 11.9189V6.81081H11.7297V11.9189C11.7297 12.1698 11.6301 12.4104 11.4527 12.5878C11.2753 12.7652 11.0347 12.8649 10.7838 12.8649Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Lc=["data-p-icon","chevron-down"],io=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-down"]],features:[L],attrs:Lc,decls:1,vars:0,consts:[["d","M7.01744 10.398C6.91269 10.3985 6.8089 10.378 6.71215 10.3379C6.61541 10.2977 6.52766 10.2386 6.45405 10.1641L1.13907 4.84913C1.03306 4.69404 0.985221 4.5065 1.00399 4.31958C1.02276 4.13266 1.10693 3.95838 1.24166 3.82747C1.37639 3.69655 1.55301 3.61742 1.74039 3.60402C1.92777 3.59062 2.11386 3.64382 2.26584 3.75424L7.01744 8.47394L11.769 3.75424C11.9189 3.65709 12.097 3.61306 12.2748 3.62921C12.4527 3.64535 12.6199 3.72073 12.7498 3.84328C12.8797 3.96582 12.9647 4.12842 12.9912 4.30502C13.0177 4.48162 12.9841 4.662 12.8958 4.81724L7.58083 10.1322C7.50996 10.2125 7.42344 10.2775 7.32656 10.3232C7.22968 10.3689 7.12449 10.3944 7.01744 10.398Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Pc=["data-p-icon","chevron-left"],dl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-left"]],features:[L],attrs:Pc,decls:1,vars:0,consts:[["d","M9.61296 13C9.50997 13.0005 9.40792 12.9804 9.3128 12.9409C9.21767 12.9014 9.13139 12.8433 9.05902 12.7701L3.83313 7.54416C3.68634 7.39718 3.60388 7.19795 3.60388 6.99022C3.60388 6.78249 3.68634 6.58325 3.83313 6.43628L9.05902 1.21039C9.20762 1.07192 9.40416 0.996539 9.60724 1.00012C9.81032 1.00371 10.0041 1.08597 10.1477 1.22959C10.2913 1.37322 10.3736 1.56698 10.3772 1.77005C10.3808 1.97313 10.3054 2.16968 10.1669 2.31827L5.49496 6.99022L10.1669 11.6622C10.3137 11.8091 10.3962 12.0084 10.3962 12.2161C10.3962 12.4238 10.3137 12.6231 10.1669 12.7701C10.0945 12.8433 10.0083 12.9014 9.91313 12.9409C9.81801 12.9804 9.71596 13.0005 9.61296 13Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Fc=["data-p-icon","chevron-right"],cl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-right"]],features:[L],attrs:Fc,decls:1,vars:0,consts:[["d","M4.38708 13C4.28408 13.0005 4.18203 12.9804 4.08691 12.9409C3.99178 12.9014 3.9055 12.8433 3.83313 12.7701C3.68634 12.6231 3.60388 12.4238 3.60388 12.2161C3.60388 12.0084 3.68634 11.8091 3.83313 11.6622L8.50507 6.99022L3.83313 2.31827C3.69467 2.16968 3.61928 1.97313 3.62287 1.77005C3.62645 1.56698 3.70872 1.37322 3.85234 1.22959C3.99596 1.08597 4.18972 1.00371 4.3928 1.00012C4.59588 0.996539 4.79242 1.07192 4.94102 1.21039L10.1669 6.43628C10.3137 6.58325 10.3962 6.78249 10.3962 6.99022C10.3962 7.19795 10.3137 7.39718 10.1669 7.54416L4.94102 12.7701C4.86865 12.8433 4.78237 12.9014 4.68724 12.9409C4.59212 12.9804 4.49007 13.0005 4.38708 13Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Rc=["data-p-icon","chevron-up"],pl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","chevron-up"]],features:[L],attrs:Rc,decls:1,vars:0,consts:[["d","M12.2097 10.4113C12.1057 10.4118 12.0027 10.3915 11.9067 10.3516C11.8107 10.3118 11.7237 10.2532 11.6506 10.1792L6.93602 5.46461L2.22139 10.1476C2.07272 10.244 1.89599 10.2877 1.71953 10.2717C1.54307 10.2556 1.3771 10.1808 1.24822 10.0593C1.11933 9.93766 1.035 9.77633 1.00874 9.6011C0.982477 9.42587 1.0158 9.2469 1.10338 9.09287L6.37701 3.81923C6.52533 3.6711 6.72639 3.58789 6.93602 3.58789C7.14565 3.58789 7.3467 3.6711 7.49502 3.81923L12.7687 9.09287C12.9168 9.24119 13 9.44225 13 9.65187C13 9.8615 12.9168 10.0626 12.7687 10.2109C12.616 10.3487 12.4151 10.4207 12.2097 10.4113Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var Bc=["data-p-icon","filter"],ul=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","filter"]],features:[L],attrs:Bc,decls:5,vars:2,consts:[["d","M8.64708 14H5.35296C5.18981 13.9979 5.03395 13.9321 4.91858 13.8167C4.8032 13.7014 4.73745 13.5455 4.73531 13.3824V7L0.329431 0.98C0.259794 0.889466 0.217389 0.780968 0.20718 0.667208C0.19697 0.553448 0.219379 0.439133 0.271783 0.337647C0.324282 0.236453 0.403423 0.151519 0.500663 0.0920138C0.597903 0.0325088 0.709548 0.000692754 0.823548 0H13.1765C13.2905 0.000692754 13.4021 0.0325088 13.4994 0.0920138C13.5966 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7826 0.780968 13.7402 0.889466 13.6706 0.98L9.26472 7V13.3824C9.26259 13.5455 9.19683 13.7014 9.08146 13.8167C8.96609 13.9321 8.81022 13.9979 8.64708 14ZM5.97061 12.7647H8.02943V6.79412C8.02878 6.66289 8.07229 6.53527 8.15296 6.43177L11.9412 1.23529H2.05884L5.86355 6.43177C5.94422 6.53527 5.98773 6.66289 5.98708 6.79412L5.97061 12.7647Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Oc=["data-p-icon","filter-slash"],ml=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","filter-slash"]],features:[L],attrs:Oc,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M13.4994 0.0920138C13.5967 0.151519 13.6758 0.236453 13.7283 0.337647C13.7807 0.439133 13.8031 0.553448 13.7929 0.667208C13.7827 0.780968 13.7403 0.889466 13.6707 0.98L11.406 4.06823C11.3099 4.19928 11.1656 4.28679 11.005 4.3115C10.8444 4.33621 10.6805 4.2961 10.5495 4.2C10.4184 4.1039 10.3309 3.95967 10.3062 3.79905C10.2815 3.63843 10.3216 3.47458 10.4177 3.34353L11.9412 1.23529H7.41184C7.24803 1.23529 7.09093 1.17022 6.97509 1.05439C6.85926 0.938558 6.79419 0.781457 6.79419 0.617647C6.79419 0.453837 6.85926 0.296736 6.97509 0.180905C7.09093 0.0650733 7.24803 0 7.41184 0H13.1765C13.2905 0.000692754 13.4022 0.0325088 13.4994 0.0920138ZM4.20008 0.181168H4.24126L13.2013 9.03411C13.3169 9.14992 13.3819 9.3069 13.3819 9.47058C13.3819 9.63426 13.3169 9.79124 13.2013 9.90705C13.1445 9.96517 13.0766 10.0112 13.0016 10.0423C12.9266 10.0735 12.846 10.0891 12.7648 10.0882C12.6836 10.0886 12.6032 10.0728 12.5283 10.0417C12.4533 10.0106 12.3853 9.96479 12.3283 9.90705L9.3142 6.92587L9.26479 6.99999V13.3823C9.26265 13.5455 9.19689 13.7014 9.08152 13.8167C8.96615 13.9321 8.81029 13.9979 8.64714 14H5.35302C5.18987 13.9979 5.03401 13.9321 4.91864 13.8167C4.80327 13.7014 4.73751 13.5455 4.73537 13.3823V6.99999L0.329492 1.02117C0.259855 0.930634 0.21745 0.822137 0.207241 0.708376C0.197031 0.594616 0.21944 0.480301 0.271844 0.378815C0.324343 0.277621 0.403484 0.192687 0.500724 0.133182C0.597964 0.073677 0.709609 0.041861 0.823609 0.0411682H3.86243C3.92448 0.0461551 3.9855 0.060022 4.04361 0.0823446C4.10037 0.10735 4.15311 0.140655 4.20008 0.181168ZM8.02949 6.79411C8.02884 6.66289 8.07235 6.53526 8.15302 6.43176L8.42478 6.05293L3.55773 1.23529H2.0589L5.84714 6.43176C5.92781 6.53526 5.97132 6.66289 5.97067 6.79411V12.7647H8.02949V6.79411Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Vc=["data-p-icon","minus"],hl=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","minus"]],features:[L],attrs:Vc,decls:1,vars:0,consts:[["d","M13.2222 7.77778H0.777778C0.571498 7.77778 0.373667 7.69584 0.227806 7.54998C0.0819442 7.40412 0 7.20629 0 7.00001C0 6.79373 0.0819442 6.5959 0.227806 6.45003C0.373667 6.30417 0.571498 6.22223 0.777778 6.22223H13.2222C13.4285 6.22223 13.6263 6.30417 13.7722 6.45003C13.9181 6.5959 14 6.79373 14 7.00001C14 7.20629 13.9181 7.40412 13.7722 7.54998C13.6263 7.69584 13.4285 7.77778 13.2222 7.77778Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var zc=["data-p-icon","plus"],fl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","plus"]],features:[L],attrs:zc,decls:5,vars:2,consts:[["d","M7.67742 6.32258V0.677419C7.67742 0.497757 7.60605 0.325452 7.47901 0.198411C7.35197 0.0713707 7.17966 0 7 0C6.82034 0 6.64803 0.0713707 6.52099 0.198411C6.39395 0.325452 6.32258 0.497757 6.32258 0.677419V6.32258H0.677419C0.497757 6.32258 0.325452 6.39395 0.198411 6.52099C0.0713707 6.64803 0 6.82034 0 7C0 7.17966 0.0713707 7.35197 0.198411 7.47901C0.325452 7.60605 0.497757 7.67742 0.677419 7.67742H6.32258V13.3226C6.32492 13.5015 6.39704 13.6725 6.52358 13.799C6.65012 13.9255 6.82106 13.9977 7 14C7.17966 14 7.35197 13.9286 7.47901 13.8016C7.60605 13.6745 7.67742 13.5022 7.67742 13.3226V7.67742H13.3226C13.5022 7.67742 13.6745 7.60605 13.8016 7.47901C13.9286 7.35197 14 7.17966 14 7C13.9977 6.82106 13.9255 6.65012 13.799 6.52358C13.6725 6.39704 13.5015 6.32492 13.3226 6.32258H7.67742Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var qc=["data-p-icon","search"],gl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","search"]],features:[L],attrs:qc,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M2.67602 11.0265C3.6661 11.688 4.83011 12.0411 6.02086 12.0411C6.81149 12.0411 7.59438 11.8854 8.32483 11.5828C8.87005 11.357 9.37808 11.0526 9.83317 10.6803L12.9769 13.8241C13.0323 13.8801 13.0983 13.9245 13.171 13.9548C13.2438 13.985 13.3219 14.0003 13.4007 14C13.4795 14.0003 13.5575 13.985 13.6303 13.9548C13.7031 13.9245 13.7691 13.8801 13.8244 13.8241C13.9367 13.7116 13.9998 13.5592 13.9998 13.4003C13.9998 13.2414 13.9367 13.089 13.8244 12.9765L10.6807 9.8328C11.053 9.37773 11.3573 8.86972 11.5831 8.32452C11.8857 7.59408 12.0414 6.81119 12.0414 6.02056C12.0414 4.8298 11.6883 3.66579 11.0268 2.67572C10.3652 1.68564 9.42494 0.913972 8.32483 0.45829C7.22472 0.00260857 6.01418 -0.116618 4.84631 0.115686C3.67844 0.34799 2.60568 0.921393 1.76369 1.76338C0.921698 2.60537 0.348296 3.67813 0.115991 4.84601C-0.116313 6.01388 0.00291375 7.22441 0.458595 8.32452C0.914277 9.42464 1.68595 10.3649 2.67602 11.0265ZM3.35565 2.0158C4.14456 1.48867 5.07206 1.20731 6.02086 1.20731C7.29317 1.20731 8.51338 1.71274 9.41304 2.6124C10.3127 3.51206 10.8181 4.73226 10.8181 6.00457C10.8181 6.95337 10.5368 7.88088 10.0096 8.66978C9.48251 9.45868 8.73328 10.0736 7.85669 10.4367C6.98011 10.7997 6.01554 10.8947 5.08496 10.7096C4.15439 10.5245 3.2996 10.0676 2.62869 9.39674C1.95778 8.72583 1.50089 7.87104 1.31579 6.94046C1.13068 6.00989 1.22568 5.04532 1.58878 4.16874C1.95187 3.29215 2.56675 2.54292 3.35565 2.0158Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Ac=["data-p-icon","sort-alt"],_l=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","sort-alt"]],features:[L],attrs:Ac,decls:8,vars:2,consts:[["d","M5.64515 3.61291C5.47353 3.61291 5.30192 3.54968 5.16644 3.4142L3.38708 1.63484L1.60773 3.4142C1.34579 3.67613 0.912244 3.67613 0.650309 3.4142C0.388374 3.15226 0.388374 2.71871 0.650309 2.45678L2.90837 0.198712C3.17031 -0.0632236 3.60386 -0.0632236 3.86579 0.198712L6.12386 2.45678C6.38579 2.71871 6.38579 3.15226 6.12386 3.4142C5.98837 3.54968 5.81676 3.61291 5.64515 3.61291Z","fill","currentColor"],["d","M3.38714 14C3.01681 14 2.70972 13.6929 2.70972 13.3226V0.677419C2.70972 0.307097 3.01681 0 3.38714 0C3.75746 0 4.06456 0.307097 4.06456 0.677419V13.3226C4.06456 13.6929 3.75746 14 3.38714 14Z","fill","currentColor"],["d","M10.6129 14C10.4413 14 10.2697 13.9368 10.1342 13.8013L7.87611 11.5432C7.61418 11.2813 7.61418 10.8477 7.87611 10.5858C8.13805 10.3239 8.5716 10.3239 8.83353 10.5858L10.6129 12.3652L12.3922 10.5858C12.6542 10.3239 13.0877 10.3239 13.3497 10.5858C13.6116 10.8477 13.6116 11.2813 13.3497 11.5432L11.0916 13.8013C10.9561 13.9368 10.7845 14 10.6129 14Z","fill","currentColor"],["d","M10.6129 14C10.2426 14 9.93552 13.6929 9.93552 13.3226V0.677419C9.93552 0.307097 10.2426 0 10.6129 0C10.9833 0 11.2904 0.307097 11.2904 0.677419V13.3226C11.2904 13.6929 10.9832 14 10.6129 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0)(2,"path",1)(3,"path",2)(4,"path",3),ve(),ye(5,"defs")(6,"clipPath",4),X(7,"rect",5),ve()()),n&2&&(D("clip-path",i.pathId),l(6),Fe("id",i.pathId))},encapsulation:2})}return t})();var Nc=["data-p-icon","sort-amount-down"],bl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","sort-amount-down"]],features:[L],attrs:Nc,decls:5,vars:2,consts:[["d","M4.93953 10.5858L3.83759 11.6877V0.677419C3.83759 0.307097 3.53049 0 3.16017 0C2.78985 0 2.48275 0.307097 2.48275 0.677419V11.6877L1.38082 10.5858C1.11888 10.3239 0.685331 10.3239 0.423396 10.5858C0.16146 10.8477 0.16146 11.2813 0.423396 11.5432L2.68146 13.8013C2.74469 13.8645 2.81694 13.9097 2.89823 13.9458C2.97952 13.9819 3.06985 14 3.16017 14C3.25049 14 3.33178 13.9819 3.42211 13.9458C3.5034 13.9097 3.57565 13.8645 3.63888 13.8013L5.89694 11.5432C6.15888 11.2813 6.15888 10.8477 5.89694 10.5858C5.63501 10.3239 5.20146 10.3239 4.93953 10.5858ZM13.0957 0H7.22468C6.85436 0 6.54726 0.307097 6.54726 0.677419C6.54726 1.04774 6.85436 1.35484 7.22468 1.35484H13.0957C13.466 1.35484 13.7731 1.04774 13.7731 0.677419C13.7731 0.307097 13.466 0 13.0957 0ZM7.22468 5.41935H9.48275C9.85307 5.41935 10.1602 5.72645 10.1602 6.09677C10.1602 6.4671 9.85307 6.77419 9.48275 6.77419H7.22468C6.85436 6.77419 6.54726 6.4671 6.54726 6.09677C6.54726 5.72645 6.85436 5.41935 7.22468 5.41935ZM7.6763 8.12903H7.22468C6.85436 8.12903 6.54726 8.43613 6.54726 8.80645C6.54726 9.17677 6.85436 9.48387 7.22468 9.48387H7.6763C8.04662 9.48387 8.35372 9.17677 8.35372 8.80645C8.35372 8.43613 8.04662 8.12903 7.6763 8.12903ZM7.22468 2.70968H11.2892C11.6595 2.70968 11.9666 3.01677 11.9666 3.3871C11.9666 3.75742 11.6595 4.06452 11.2892 4.06452H7.22468C6.85436 4.06452 6.54726 3.75742 6.54726 3.3871C6.54726 3.01677 6.85436 2.70968 7.22468 2.70968Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Hc=["data-p-icon","sort-amount-up-alt"],yl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","sort-amount-up-alt"]],features:[L],attrs:Hc,decls:5,vars:2,consts:[["d","M3.63435 0.19871C3.57113 0.135484 3.49887 0.0903226 3.41758 0.0541935C3.255 -0.0180645 3.06532 -0.0180645 2.90274 0.0541935C2.82145 0.0903226 2.74919 0.135484 2.68597 0.19871L0.427901 2.45677C0.165965 2.71871 0.165965 3.15226 0.427901 3.41419C0.689836 3.67613 1.12338 3.67613 1.38532 3.41419L2.48726 2.31226V13.3226C2.48726 13.6929 2.79435 14 3.16467 14C3.535 14 3.84209 13.6929 3.84209 13.3226V2.31226L4.94403 3.41419C5.07951 3.54968 5.25113 3.6129 5.42274 3.6129C5.59435 3.6129 5.76597 3.54968 5.90145 3.41419C6.16338 3.15226 6.16338 2.71871 5.90145 2.45677L3.64338 0.19871H3.63435ZM13.7685 13.3226C13.7685 12.9523 13.4615 12.6452 13.0911 12.6452H7.22016C6.84984 12.6452 6.54274 12.9523 6.54274 13.3226C6.54274 13.6929 6.84984 14 7.22016 14H13.0911C13.4615 14 13.7685 13.6929 13.7685 13.3226ZM7.22016 8.58064C6.84984 8.58064 6.54274 8.27355 6.54274 7.90323C6.54274 7.5329 6.84984 7.22581 7.22016 7.22581H9.47823C9.84855 7.22581 10.1556 7.5329 10.1556 7.90323C10.1556 8.27355 9.84855 8.58064 9.47823 8.58064H7.22016ZM7.22016 5.87097H7.67177C8.0421 5.87097 8.34919 5.56387 8.34919 5.19355C8.34919 4.82323 8.0421 4.51613 7.67177 4.51613H7.22016C6.84984 4.51613 6.54274 4.82323 6.54274 5.19355C6.54274 5.56387 6.84984 5.87097 7.22016 5.87097ZM11.2847 11.2903H7.22016C6.84984 11.2903 6.54274 10.9832 6.54274 10.6129C6.54274 10.2426 6.84984 9.93548 7.22016 9.93548H11.2847C11.655 9.93548 11.9621 10.2426 11.9621 10.6129C11.9621 10.9832 11.655 11.2903 11.2847 11.2903Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var $c=["data-p-icon","spinner"],Cn=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","spinner"]],features:[L],attrs:$c,decls:5,vars:2,consts:[["d","M6.99701 14C5.85441 13.999 4.72939 13.7186 3.72012 13.1832C2.71084 12.6478 1.84795 11.8737 1.20673 10.9284C0.565504 9.98305 0.165424 8.89526 0.041387 7.75989C-0.0826496 6.62453 0.073125 5.47607 0.495122 4.4147C0.917119 3.35333 1.59252 2.4113 2.46241 1.67077C3.33229 0.930247 4.37024 0.413729 5.4857 0.166275C6.60117 -0.0811796 7.76026 -0.0520535 8.86188 0.251112C9.9635 0.554278 10.9742 1.12227 11.8057 1.90555C11.915 2.01493 11.9764 2.16319 11.9764 2.31778C11.9764 2.47236 11.915 2.62062 11.8057 2.73C11.7521 2.78503 11.688 2.82877 11.6171 2.85864C11.5463 2.8885 11.4702 2.90389 11.3933 2.90389C11.3165 2.90389 11.2404 2.8885 11.1695 2.85864C11.0987 2.82877 11.0346 2.78503 10.9809 2.73C9.9998 1.81273 8.73246 1.26138 7.39226 1.16876C6.05206 1.07615 4.72086 1.44794 3.62279 2.22152C2.52471 2.99511 1.72683 4.12325 1.36345 5.41602C1.00008 6.70879 1.09342 8.08723 1.62775 9.31926C2.16209 10.5513 3.10478 11.5617 4.29713 12.1803C5.48947 12.7989 6.85865 12.988 8.17414 12.7157C9.48963 12.4435 10.6711 11.7264 11.5196 10.6854C12.3681 9.64432 12.8319 8.34282 12.8328 7C12.8328 6.84529 12.8943 6.69692 13.0038 6.58752C13.1132 6.47812 13.2616 6.41667 13.4164 6.41667C13.5712 6.41667 13.7196 6.47812 13.8291 6.58752C13.9385 6.69692 14 6.84529 14 7C14 8.85651 13.2622 10.637 11.9489 11.9497C10.6356 13.2625 8.85432 14 6.99701 14Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var jc=["data-p-icon","trash"],vl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","trash"]],features:[L],attrs:jc,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M3.44802 13.9955H10.552C10.8056 14.0129 11.06 13.9797 11.3006 13.898C11.5412 13.8163 11.7632 13.6877 11.9537 13.5196C12.1442 13.3515 12.2995 13.1473 12.4104 12.9188C12.5213 12.6903 12.5858 12.442 12.6 12.1884V4.36041H13.4C13.5591 4.36041 13.7117 4.29722 13.8243 4.18476C13.9368 4.07229 14 3.91976 14 3.76071C14 3.60166 13.9368 3.44912 13.8243 3.33666C13.7117 3.22419 13.5591 3.16101 13.4 3.16101H12.0537C12.0203 3.1557 11.9863 3.15299 11.952 3.15299C11.9178 3.15299 11.8838 3.1557 11.8503 3.16101H11.2285C11.2421 3.10893 11.2487 3.05513 11.248 3.00106V1.80966C11.2171 1.30262 10.9871 0.828306 10.608 0.48989C10.229 0.151475 9.73159 -0.0236625 9.22402 0.00257442H4.77602C4.27251 -0.0171866 3.78126 0.160868 3.40746 0.498617C3.03365 0.836366 2.807 1.30697 2.77602 1.80966V3.00106C2.77602 3.0556 2.78346 3.10936 2.79776 3.16101H0.6C0.521207 3.16101 0.443185 3.17652 0.37039 3.20666C0.297595 3.2368 0.231451 3.28097 0.175736 3.33666C0.120021 3.39235 0.0758251 3.45846 0.0456722 3.53121C0.0155194 3.60397 0 3.68196 0 3.76071C0 3.83946 0.0155194 3.91744 0.0456722 3.9902C0.0758251 4.06296 0.120021 4.12907 0.175736 4.18476C0.231451 4.24045 0.297595 4.28462 0.37039 4.31476C0.443185 4.3449 0.521207 4.36041 0.6 4.36041H1.40002V12.1884C1.41426 12.442 1.47871 12.6903 1.58965 12.9188C1.7006 13.1473 1.85582 13.3515 2.04633 13.5196C2.23683 13.6877 2.45882 13.8163 2.69944 13.898C2.94005 13.9797 3.1945 14.0129 3.44802 13.9955ZM2.60002 4.36041H11.304V12.1884C11.304 12.5163 10.952 12.7961 10.504 12.7961H3.40002C2.97602 12.7961 2.60002 12.5163 2.60002 12.1884V4.36041ZM3.95429 3.16101C3.96859 3.10936 3.97602 3.0556 3.97602 3.00106V1.80966C3.97602 1.48183 4.33602 1.20197 4.77602 1.20197H9.24802C9.66403 1.20197 10.048 1.48183 10.048 1.80966V3.00106C10.0473 3.05515 10.054 3.10896 10.0678 3.16101H3.95429ZM5.57571 10.997C5.41731 10.995 5.26597 10.9311 5.15395 10.8191C5.04193 10.7071 4.97808 10.5558 4.97601 10.3973V6.77517C4.97601 6.61612 5.0392 6.46359 5.15166 6.35112C5.26413 6.23866 5.41666 6.17548 5.57571 6.17548C5.73476 6.17548 5.8873 6.23866 5.99976 6.35112C6.11223 6.46359 6.17541 6.61612 6.17541 6.77517V10.3894C6.17647 10.4688 6.16174 10.5476 6.13208 10.6213C6.10241 10.695 6.05841 10.762 6.00261 10.8186C5.94682 10.8751 5.88035 10.92 5.80707 10.9506C5.73378 10.9813 5.65514 10.9971 5.57571 10.997ZM7.99968 10.8214C8.11215 10.9339 8.26468 10.997 8.42373 10.997C8.58351 10.9949 8.73604 10.93 8.84828 10.8163C8.96052 10.7025 9.02345 10.5491 9.02343 10.3894V6.77517C9.02343 6.61612 8.96025 6.46359 8.84778 6.35112C8.73532 6.23866 8.58278 6.17548 8.42373 6.17548C8.26468 6.17548 8.11215 6.23866 7.99968 6.35112C7.88722 6.46359 7.82404 6.61612 7.82404 6.77517V10.3973C7.82404 10.5564 7.88722 10.7089 7.99968 10.8214Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Uc=["data-p-icon","window-maximize"],xl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","window-maximize"]],features:[L],attrs:Uc,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14ZM9.77805 7.42192C9.89013 7.534 10.0415 7.59788 10.2 7.59995C10.3585 7.59788 10.5099 7.534 10.622 7.42192C10.7341 7.30985 10.798 7.15844 10.8 6.99995V3.94242C10.8066 3.90505 10.8096 3.86689 10.8089 3.82843C10.8079 3.77159 10.7988 3.7157 10.7824 3.6623C10.756 3.55552 10.701 3.45698 10.622 3.37798C10.5099 3.2659 10.3585 3.20202 10.2 3.19995H7.00002C6.84089 3.19995 6.68828 3.26317 6.57576 3.37569C6.46324 3.48821 6.40002 3.64082 6.40002 3.79995C6.40002 3.95908 6.46324 4.11169 6.57576 4.22422C6.68828 4.33674 6.84089 4.39995 7.00002 4.39995H8.80006L6.19997 7.00005C6.10158 7.11005 6.04718 7.25246 6.04718 7.40005C6.04718 7.54763 6.10158 7.69004 6.19997 7.80005C6.30202 7.91645 6.44561 7.98824 6.59997 8.00005C6.75432 7.98824 6.89791 7.91645 6.99997 7.80005L9.60002 5.26841V6.99995C9.6021 7.15844 9.66598 7.30985 9.77805 7.42192ZM1.4 14H3.8C4.17066 13.9979 4.52553 13.8498 4.78763 13.5877C5.04973 13.3256 5.1979 12.9707 5.2 12.6V10.2C5.1979 9.82939 5.04973 9.47452 4.78763 9.21242C4.52553 8.95032 4.17066 8.80215 3.8 8.80005H1.4C1.02934 8.80215 0.674468 8.95032 0.412371 9.21242C0.150274 9.47452 0.00210008 9.82939 0 10.2V12.6C0.00210008 12.9707 0.150274 13.3256 0.412371 13.5877C0.674468 13.8498 1.02934 13.9979 1.4 14ZM1.25858 10.0586C1.29609 10.0211 1.34696 10 1.4 10H3.8C3.85304 10 3.90391 10.0211 3.94142 10.0586C3.97893 10.0961 4 10.147 4 10.2V12.6C4 12.6531 3.97893 12.704 3.94142 12.7415C3.90391 12.779 3.85304 12.8 3.8 12.8H1.4C1.34696 12.8 1.29609 12.779 1.25858 12.7415C1.22107 12.704 1.2 12.6531 1.2 12.6V10.2C1.2 10.147 1.22107 10.0961 1.25858 10.0586Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var Qc=["data-p-icon","window-minimize"],Cl=(()=>{class t extends re{pathId;onInit(){this.pathId="url(#"+Te()+")"}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","window-minimize"]],features:[L],attrs:Qc,decls:5,vars:2,consts:[["fill-rule","evenodd","clip-rule","evenodd","d","M11.8 0H2.2C1.61652 0 1.05694 0.231785 0.644365 0.644365C0.231785 1.05694 0 1.61652 0 2.2V7C0 7.15913 0.063214 7.31174 0.175736 7.42426C0.288258 7.53679 0.44087 7.6 0.6 7.6C0.75913 7.6 0.911742 7.53679 1.02426 7.42426C1.13679 7.31174 1.2 7.15913 1.2 7V2.2C1.2 1.93478 1.30536 1.68043 1.49289 1.49289C1.68043 1.30536 1.93478 1.2 2.2 1.2H11.8C12.0652 1.2 12.3196 1.30536 12.5071 1.49289C12.6946 1.68043 12.8 1.93478 12.8 2.2V11.8C12.8 12.0652 12.6946 12.3196 12.5071 12.5071C12.3196 12.6946 12.0652 12.8 11.8 12.8H7C6.84087 12.8 6.68826 12.8632 6.57574 12.9757C6.46321 13.0883 6.4 13.2409 6.4 13.4C6.4 13.5591 6.46321 13.7117 6.57574 13.8243C6.68826 13.9368 6.84087 14 7 14H11.8C12.3835 14 12.9431 13.7682 13.3556 13.3556C13.7682 12.9431 14 12.3835 14 11.8V2.2C14 1.61652 13.7682 1.05694 13.3556 0.644365C12.9431 0.231785 12.3835 0 11.8 0ZM6.368 7.952C6.44137 7.98326 6.52025 7.99958 6.6 8H9.8C9.95913 8 10.1117 7.93678 10.2243 7.82426C10.3368 7.71174 10.4 7.55913 10.4 7.4C10.4 7.24087 10.3368 7.08826 10.2243 6.97574C10.1117 6.86321 9.95913 6.8 9.8 6.8H8.048L10.624 4.224C10.73 4.11026 10.7877 3.95982 10.7849 3.80438C10.7822 3.64894 10.7192 3.50063 10.6093 3.3907C10.4994 3.28077 10.3511 3.2178 10.1956 3.21506C10.0402 3.21232 9.88974 3.27002 9.776 3.376L7.2 5.952V4.2C7.2 4.04087 7.13679 3.88826 7.02426 3.77574C6.91174 3.66321 6.75913 3.6 6.6 3.6C6.44087 3.6 6.28826 3.66321 6.17574 3.77574C6.06321 3.88826 6 4.04087 6 4.2V7.4C6.00042 7.47975 6.01674 7.55862 6.048 7.632C6.07656 7.70442 6.11971 7.7702 6.17475 7.82524C6.2298 7.88029 6.29558 7.92344 6.368 7.952ZM1.4 8.80005H3.8C4.17066 8.80215 4.52553 8.95032 4.78763 9.21242C5.04973 9.47452 5.1979 9.82939 5.2 10.2V12.6C5.1979 12.9707 5.04973 13.3256 4.78763 13.5877C4.52553 13.8498 4.17066 13.9979 3.8 14H1.4C1.02934 13.9979 0.674468 13.8498 0.412371 13.5877C0.150274 13.3256 0.00210008 12.9707 0 12.6V10.2C0.00210008 9.82939 0.150274 9.47452 0.412371 9.21242C0.674468 8.95032 1.02934 8.80215 1.4 8.80005ZM3.94142 12.7415C3.97893 12.704 4 12.6531 4 12.6V10.2C4 10.147 3.97893 10.0961 3.94142 10.0586C3.90391 10.0211 3.85304 10 3.8 10H1.4C1.34696 10 1.29609 10.0211 1.25858 10.0586C1.22107 10.0961 1.2 10.147 1.2 10.2V12.6C1.2 12.6531 1.22107 12.704 1.25858 12.7415C1.29609 12.779 1.34696 12.8 1.4 12.8H3.8C3.85304 12.8 3.90391 12.779 3.94142 12.7415Z","fill","currentColor"],[3,"id"],["width","14","height","14","fill","white"]],template:function(n,i){n&1&&(O(),ye(0,"g"),X(1,"path",0),ve(),ye(2,"defs")(3,"clipPath",1),X(4,"rect",2),ve()()),n&2&&(D("clip-path",i.pathId),l(3),Fe("id",i.pathId))},encapsulation:2})}return t})();var wl=`
    .p-ink {
        display: block;
        position: absolute;
        background: dt('ripple.background');
        border-radius: 100%;
        transform: scale(0);
        pointer-events: none;
    }

    .p-ink-active {
        animation: ripple 0.4s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`;var Gc=`
    ${wl}

    /* For PrimeNG */
    .p-ripple {
        overflow: hidden;
        position: relative;
    }

    .p-ripple-disabled .p-ink {
        display: none !important;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }
`,Wc={root:"p-ink"},kl=(()=>{class t extends fe{name="ripple";style=Gc;classes=Wc;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Jt=(()=>{class t extends De{componentName="Ripple";zone=v(Be);_componentStyle=v(kl);animationListener;mouseDownListener;timeout;constructor(){super(),Xe(()=>{qe(this.platformId)&&(this.config.ripple()?this.zone.runOutsideAngular(()=>{this.create(),this.mouseDownListener=this.renderer.listen(this.el.nativeElement,"mousedown",this.onMouseDown.bind(this))}):this.remove())})}onAfterViewInit(){}onMouseDown(e){let n=this.getInk();if(!n||this.document.defaultView?.getComputedStyle(n,null).display==="none")return;if(!this.$unstyled()&&zt(n,"p-ink-active"),n.setAttribute("data-p-ink-active","false"),!Qt(n)&&!Gt(n)){let u=Math.max(Ye(this.el.nativeElement),ht(this.el.nativeElement));n.style.height=u+"px",n.style.width=u+"px"}let i=Hr(this.el.nativeElement),o=e.pageX-i.left+this.document.body.scrollTop-Gt(n)/2,a=e.pageY-i.top+this.document.body.scrollLeft-Qt(n)/2;this.renderer.setStyle(n,"top",a+"px"),this.renderer.setStyle(n,"left",o+"px"),!this.$unstyled()&&dn(n,"p-ink-active"),n.setAttribute("data-p-ink-active","true"),this.timeout=setTimeout(()=>{let u=this.getInk();u&&(!this.$unstyled()&&zt(u,"p-ink-active"),u.setAttribute("data-p-ink-active","false"))},401)}getInk(){let e=this.el.nativeElement.children;for(let n=0;n<e.length;n++)if(typeof e[n].className=="string"&&e[n].className.indexOf("p-ink")!==-1)return e[n];return null}resetInk(){let e=this.getInk();e&&(!this.$unstyled()&&zt(e,"p-ink-active"),e.setAttribute("data-p-ink-active","false"))}onAnimationEnd(e){this.timeout&&clearTimeout(this.timeout),!this.$unstyled()&&zt(e.currentTarget,"p-ink-active"),e.currentTarget.setAttribute("data-p-ink-active","false")}create(){let e=this.renderer.createElement("span");this.renderer.addClass(e,"p-ink"),this.renderer.appendChild(this.el.nativeElement,e),this.renderer.setAttribute(e,"data-p-ink","true"),this.renderer.setAttribute(e,"data-p-ink-active","false"),this.renderer.setAttribute(e,"aria-hidden","true"),this.renderer.setAttribute(e,"role","presentation"),this.animationListener||(this.animationListener=this.renderer.listen(e,"animationend",this.onAnimationEnd.bind(this)))}remove(){let e=this.getInk();e&&(this.mouseDownListener&&this.mouseDownListener(),this.animationListener&&this.animationListener(),this.mouseDownListener=null,this.animationListener=null,Ur(e))}onDestroy(){this.config&&this.config.ripple()&&this.remove()}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["","pRipple",""]],hostAttrs:[1,"p-ripple"],features:[le([kl]),L]})}return t})();var Tl=`
    .p-button {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        color: dt('button.primary.color');
        background: dt('button.primary.background');
        border: 1px solid dt('button.primary.border.color');
        padding: dt('button.padding.y') dt('button.padding.x');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('button.transition.duration'),
            color dt('button.transition.duration'),
            border-color dt('button.transition.duration'),
            outline-color dt('button.transition.duration'),
            box-shadow dt('button.transition.duration');
        border-radius: dt('button.border.radius');
        outline-color: transparent;
        gap: dt('button.gap');
    }

    .p-button:disabled {
        cursor: default;
    }

    .p-button-icon-right {
        order: 1;
    }

    .p-button-icon-right:dir(rtl) {
        order: -1;
    }

    .p-button:not(.p-button-vertical) .p-button-icon:not(.p-button-icon-right):dir(rtl) {
        order: 1;
    }

    .p-button-icon-bottom {
        order: 2;
    }

    .p-button-icon-only {
        width: dt('button.icon.only.width');
        padding-inline-start: 0;
        padding-inline-end: 0;
        gap: 0;
    }

    .p-button-icon-only.p-button-rounded {
        border-radius: 50%;
        height: dt('button.icon.only.width');
    }

    .p-button-icon-only .p-button-label {
        visibility: hidden;
        width: 0;
    }

    .p-button-icon-only::after {
        content: "\xA0";
        visibility: hidden;
        width: 0;
    }

    .p-button-sm {
        font-size: dt('button.sm.font.size');
        padding: dt('button.sm.padding.y') dt('button.sm.padding.x');
    }

    .p-button-sm .p-button-icon {
        font-size: dt('button.sm.font.size');
    }

    .p-button-sm.p-button-icon-only {
        width: dt('button.sm.icon.only.width');
    }

    .p-button-sm.p-button-icon-only.p-button-rounded {
        height: dt('button.sm.icon.only.width');
    }

    .p-button-lg {
        font-size: dt('button.lg.font.size');
        padding: dt('button.lg.padding.y') dt('button.lg.padding.x');
    }

    .p-button-lg .p-button-icon {
        font-size: dt('button.lg.font.size');
    }

    .p-button-lg.p-button-icon-only {
        width: dt('button.lg.icon.only.width');
    }

    .p-button-lg.p-button-icon-only.p-button-rounded {
        height: dt('button.lg.icon.only.width');
    }

    .p-button-vertical {
        flex-direction: column;
    }

    .p-button-label {
        font-weight: dt('button.label.font.weight');
    }

    .p-button-fluid {
        width: 100%;
    }

    .p-button-fluid.p-button-icon-only {
        width: dt('button.icon.only.width');
    }

    .p-button:not(:disabled):hover {
        background: dt('button.primary.hover.background');
        border: 1px solid dt('button.primary.hover.border.color');
        color: dt('button.primary.hover.color');
    }

    .p-button:not(:disabled):active {
        background: dt('button.primary.active.background');
        border: 1px solid dt('button.primary.active.border.color');
        color: dt('button.primary.active.color');
    }

    .p-button:focus-visible {
        box-shadow: dt('button.primary.focus.ring.shadow');
        outline: dt('button.focus.ring.width') dt('button.focus.ring.style') dt('button.primary.focus.ring.color');
        outline-offset: dt('button.focus.ring.offset');
    }

    .p-button .p-badge {
        min-width: dt('button.badge.size');
        height: dt('button.badge.size');
        line-height: dt('button.badge.size');
    }

    .p-button-raised {
        box-shadow: dt('button.raised.shadow');
    }

    .p-button-rounded {
        border-radius: dt('button.rounded.border.radius');
    }

    .p-button-secondary {
        background: dt('button.secondary.background');
        border: 1px solid dt('button.secondary.border.color');
        color: dt('button.secondary.color');
    }

    .p-button-secondary:not(:disabled):hover {
        background: dt('button.secondary.hover.background');
        border: 1px solid dt('button.secondary.hover.border.color');
        color: dt('button.secondary.hover.color');
    }

    .p-button-secondary:not(:disabled):active {
        background: dt('button.secondary.active.background');
        border: 1px solid dt('button.secondary.active.border.color');
        color: dt('button.secondary.active.color');
    }

    .p-button-secondary:focus-visible {
        outline-color: dt('button.secondary.focus.ring.color');
        box-shadow: dt('button.secondary.focus.ring.shadow');
    }

    .p-button-success {
        background: dt('button.success.background');
        border: 1px solid dt('button.success.border.color');
        color: dt('button.success.color');
    }

    .p-button-success:not(:disabled):hover {
        background: dt('button.success.hover.background');
        border: 1px solid dt('button.success.hover.border.color');
        color: dt('button.success.hover.color');
    }

    .p-button-success:not(:disabled):active {
        background: dt('button.success.active.background');
        border: 1px solid dt('button.success.active.border.color');
        color: dt('button.success.active.color');
    }

    .p-button-success:focus-visible {
        outline-color: dt('button.success.focus.ring.color');
        box-shadow: dt('button.success.focus.ring.shadow');
    }

    .p-button-info {
        background: dt('button.info.background');
        border: 1px solid dt('button.info.border.color');
        color: dt('button.info.color');
    }

    .p-button-info:not(:disabled):hover {
        background: dt('button.info.hover.background');
        border: 1px solid dt('button.info.hover.border.color');
        color: dt('button.info.hover.color');
    }

    .p-button-info:not(:disabled):active {
        background: dt('button.info.active.background');
        border: 1px solid dt('button.info.active.border.color');
        color: dt('button.info.active.color');
    }

    .p-button-info:focus-visible {
        outline-color: dt('button.info.focus.ring.color');
        box-shadow: dt('button.info.focus.ring.shadow');
    }

    .p-button-warn {
        background: dt('button.warn.background');
        border: 1px solid dt('button.warn.border.color');
        color: dt('button.warn.color');
    }

    .p-button-warn:not(:disabled):hover {
        background: dt('button.warn.hover.background');
        border: 1px solid dt('button.warn.hover.border.color');
        color: dt('button.warn.hover.color');
    }

    .p-button-warn:not(:disabled):active {
        background: dt('button.warn.active.background');
        border: 1px solid dt('button.warn.active.border.color');
        color: dt('button.warn.active.color');
    }

    .p-button-warn:focus-visible {
        outline-color: dt('button.warn.focus.ring.color');
        box-shadow: dt('button.warn.focus.ring.shadow');
    }

    .p-button-help {
        background: dt('button.help.background');
        border: 1px solid dt('button.help.border.color');
        color: dt('button.help.color');
    }

    .p-button-help:not(:disabled):hover {
        background: dt('button.help.hover.background');
        border: 1px solid dt('button.help.hover.border.color');
        color: dt('button.help.hover.color');
    }

    .p-button-help:not(:disabled):active {
        background: dt('button.help.active.background');
        border: 1px solid dt('button.help.active.border.color');
        color: dt('button.help.active.color');
    }

    .p-button-help:focus-visible {
        outline-color: dt('button.help.focus.ring.color');
        box-shadow: dt('button.help.focus.ring.shadow');
    }

    .p-button-danger {
        background: dt('button.danger.background');
        border: 1px solid dt('button.danger.border.color');
        color: dt('button.danger.color');
    }

    .p-button-danger:not(:disabled):hover {
        background: dt('button.danger.hover.background');
        border: 1px solid dt('button.danger.hover.border.color');
        color: dt('button.danger.hover.color');
    }

    .p-button-danger:not(:disabled):active {
        background: dt('button.danger.active.background');
        border: 1px solid dt('button.danger.active.border.color');
        color: dt('button.danger.active.color');
    }

    .p-button-danger:focus-visible {
        outline-color: dt('button.danger.focus.ring.color');
        box-shadow: dt('button.danger.focus.ring.shadow');
    }

    .p-button-contrast {
        background: dt('button.contrast.background');
        border: 1px solid dt('button.contrast.border.color');
        color: dt('button.contrast.color');
    }

    .p-button-contrast:not(:disabled):hover {
        background: dt('button.contrast.hover.background');
        border: 1px solid dt('button.contrast.hover.border.color');
        color: dt('button.contrast.hover.color');
    }

    .p-button-contrast:not(:disabled):active {
        background: dt('button.contrast.active.background');
        border: 1px solid dt('button.contrast.active.border.color');
        color: dt('button.contrast.active.color');
    }

    .p-button-contrast:focus-visible {
        outline-color: dt('button.contrast.focus.ring.color');
        box-shadow: dt('button.contrast.focus.ring.shadow');
    }

    .p-button-outlined {
        background: transparent;
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):hover {
        background: dt('button.outlined.primary.hover.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined:not(:disabled):active {
        background: dt('button.outlined.primary.active.background');
        border-color: dt('button.outlined.primary.border.color');
        color: dt('button.outlined.primary.color');
    }

    .p-button-outlined.p-button-secondary {
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):hover {
        background: dt('button.outlined.secondary.hover.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-secondary:not(:disabled):active {
        background: dt('button.outlined.secondary.active.background');
        border-color: dt('button.outlined.secondary.border.color');
        color: dt('button.outlined.secondary.color');
    }

    .p-button-outlined.p-button-success {
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):hover {
        background: dt('button.outlined.success.hover.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-success:not(:disabled):active {
        background: dt('button.outlined.success.active.background');
        border-color: dt('button.outlined.success.border.color');
        color: dt('button.outlined.success.color');
    }

    .p-button-outlined.p-button-info {
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):hover {
        background: dt('button.outlined.info.hover.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-info:not(:disabled):active {
        background: dt('button.outlined.info.active.background');
        border-color: dt('button.outlined.info.border.color');
        color: dt('button.outlined.info.color');
    }

    .p-button-outlined.p-button-warn {
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):hover {
        background: dt('button.outlined.warn.hover.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-warn:not(:disabled):active {
        background: dt('button.outlined.warn.active.background');
        border-color: dt('button.outlined.warn.border.color');
        color: dt('button.outlined.warn.color');
    }

    .p-button-outlined.p-button-help {
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):hover {
        background: dt('button.outlined.help.hover.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-help:not(:disabled):active {
        background: dt('button.outlined.help.active.background');
        border-color: dt('button.outlined.help.border.color');
        color: dt('button.outlined.help.color');
    }

    .p-button-outlined.p-button-danger {
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):hover {
        background: dt('button.outlined.danger.hover.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-danger:not(:disabled):active {
        background: dt('button.outlined.danger.active.background');
        border-color: dt('button.outlined.danger.border.color');
        color: dt('button.outlined.danger.color');
    }

    .p-button-outlined.p-button-contrast {
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):hover {
        background: dt('button.outlined.contrast.hover.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-contrast:not(:disabled):active {
        background: dt('button.outlined.contrast.active.background');
        border-color: dt('button.outlined.contrast.border.color');
        color: dt('button.outlined.contrast.color');
    }

    .p-button-outlined.p-button-plain {
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):hover {
        background: dt('button.outlined.plain.hover.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-outlined.p-button-plain:not(:disabled):active {
        background: dt('button.outlined.plain.active.background');
        border-color: dt('button.outlined.plain.border.color');
        color: dt('button.outlined.plain.color');
    }

    .p-button-text {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):hover {
        background: dt('button.text.primary.hover.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text:not(:disabled):active {
        background: dt('button.text.primary.active.background');
        border-color: transparent;
        color: dt('button.text.primary.color');
    }

    .p-button-text.p-button-secondary {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):hover {
        background: dt('button.text.secondary.hover.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-secondary:not(:disabled):active {
        background: dt('button.text.secondary.active.background');
        border-color: transparent;
        color: dt('button.text.secondary.color');
    }

    .p-button-text.p-button-success {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):hover {
        background: dt('button.text.success.hover.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-success:not(:disabled):active {
        background: dt('button.text.success.active.background');
        border-color: transparent;
        color: dt('button.text.success.color');
    }

    .p-button-text.p-button-info {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):hover {
        background: dt('button.text.info.hover.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-info:not(:disabled):active {
        background: dt('button.text.info.active.background');
        border-color: transparent;
        color: dt('button.text.info.color');
    }

    .p-button-text.p-button-warn {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):hover {
        background: dt('button.text.warn.hover.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-warn:not(:disabled):active {
        background: dt('button.text.warn.active.background');
        border-color: transparent;
        color: dt('button.text.warn.color');
    }

    .p-button-text.p-button-help {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):hover {
        background: dt('button.text.help.hover.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-help:not(:disabled):active {
        background: dt('button.text.help.active.background');
        border-color: transparent;
        color: dt('button.text.help.color');
    }

    .p-button-text.p-button-danger {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):hover {
        background: dt('button.text.danger.hover.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-danger:not(:disabled):active {
        background: dt('button.text.danger.active.background');
        border-color: transparent;
        color: dt('button.text.danger.color');
    }

    .p-button-text.p-button-contrast {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):hover {
        background: dt('button.text.contrast.hover.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-contrast:not(:disabled):active {
        background: dt('button.text.contrast.active.background');
        border-color: transparent;
        color: dt('button.text.contrast.color');
    }

    .p-button-text.p-button-plain {
        background: transparent;
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):hover {
        background: dt('button.text.plain.hover.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-text.p-button-plain:not(:disabled):active {
        background: dt('button.text.plain.active.background');
        border-color: transparent;
        color: dt('button.text.plain.color');
    }

    .p-button-link {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.color');
    }

    .p-button-link:not(:disabled):hover {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.hover.color');
    }

    .p-button-link:not(:disabled):hover .p-button-label {
        text-decoration: underline;
    }

    .p-button-link:not(:disabled):active {
        background: transparent;
        border-color: transparent;
        color: dt('button.link.active.color');
    }
`;var Yc=["content"],Zc=["loadingicon"],Xc=["icon"],Jc=["*"],El=(t,r)=>({class:t,pt:r});function ep(t,r){t&1&&U(0)}function tp(t,r){if(t&1&&F(0,"span",7),t&2){let e=d(3);C(e.cn(e.cx("loadingIcon"),"pi-spin",e.loadingIcon||(e.buttonProps==null?null:e.buttonProps.loadingIcon))),s("pBind",e.ptm("loadingIcon")),D("aria-hidden",!0)}}function np(t,r){if(t&1&&(O(),F(0,"svg",8)),t&2){let e=d(3);C(e.cn(e.cx("loadingIcon"),e.cx("spinnerIcon"))),s("pBind",e.ptm("loadingIcon"))("spin",!0),D("aria-hidden",!0)}}function ip(t,r){if(t&1&&(W(0),g(1,tp,1,4,"span",3)(2,np,1,5,"svg",6),K()),t&2){let e=d(2);l(),s("ngIf",e.loadingIcon||(e.buttonProps==null?null:e.buttonProps.loadingIcon)),l(),s("ngIf",!(e.loadingIcon||e.buttonProps!=null&&e.buttonProps.loadingIcon))}}function op(t,r){}function rp(t,r){if(t&1&&g(0,op,0,0,"ng-template",9),t&2){let e=d(2);s("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function ap(t,r){if(t&1&&(W(0),g(1,ip,3,2,"ng-container",2)(2,rp,1,1,null,5),K()),t&2){let e=d();l(),s("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),l(),s("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)("ngTemplateOutletContext",Pe(3,El,e.cx("loadingIcon"),e.ptm("loadingIcon")))}}function lp(t,r){if(t&1&&F(0,"span",7),t&2){let e=d(2);C(e.cn(e.cx("icon"),e.icon||(e.buttonProps==null?null:e.buttonProps.icon))),s("pBind",e.ptm("icon")),D("data-p",e.dataIconP)}}function sp(t,r){}function dp(t,r){if(t&1&&g(0,sp,0,0,"ng-template",9),t&2){let e=d(2);s("ngIf",!e.icon&&(e.iconTemplate||e._iconTemplate))}}function cp(t,r){if(t&1&&(W(0),g(1,lp,1,4,"span",3)(2,dp,1,1,null,5),K()),t&2){let e=d();l(),s("ngIf",(e.icon||(e.buttonProps==null?null:e.buttonProps.icon))&&!e.iconTemplate&&!e._iconTemplate),l(),s("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",Pe(3,El,e.cx("icon"),e.ptm("icon")))}}function pp(t,r){if(t&1&&(c(0,"span",7),m(1),p()),t&2){let e=d();C(e.cx("label")),s("pBind",e.ptm("label")),D("aria-hidden",(e.icon||(e.buttonProps==null?null:e.buttonProps.icon))&&!(e.label||e.buttonProps!=null&&e.buttonProps.label))("data-p",e.dataLabelP),l(),Q(e.label||(e.buttonProps==null?null:e.buttonProps.label))}}function up(t,r){if(t&1&&F(0,"p-badge",10),t&2){let e=d();s("value",e.badge||(e.buttonProps==null?null:e.buttonProps.badge))("severity",e.badgeSeverity||(e.buttonProps==null?null:e.buttonProps.badgeSeverity))("pt",e.ptm("pcBadge"))("unstyled",e.unstyled())}}var mp={root:({instance:t})=>["p-button p-component",{"p-button-icon-only":t.hasIcon&&!t.label&&!t.buttonProps?.label&&!t.badge,"p-button-vertical":(t.iconPos==="top"||t.iconPos==="bottom")&&t.label,"p-button-loading":t.loading||t.buttonProps?.loading,"p-button-link":t.link||t.buttonProps?.link,[`p-button-${t.severity||t.buttonProps?.severity}`]:t.severity||t.buttonProps?.severity,"p-button-raised":t.raised||t.buttonProps?.raised,"p-button-rounded":t.rounded||t.buttonProps?.rounded,"p-button-text":t.text||t.variant==="text"||t.buttonProps?.text||t.buttonProps?.variant==="text","p-button-outlined":t.outlined||t.variant==="outlined"||t.buttonProps?.outlined||t.buttonProps?.variant==="outlined","p-button-sm":t.size==="small"||t.buttonProps?.size==="small","p-button-lg":t.size==="large"||t.buttonProps?.size==="large","p-button-plain":t.plain||t.buttonProps?.plain,"p-button-fluid":t.hasFluid}],loadingIcon:"p-button-loading-icon",icon:({instance:t})=>["p-button-icon",{[`p-button-icon-${t.iconPos||t.buttonProps?.iconPos}`]:t.label||t.buttonProps?.label,"p-button-icon-left":(t.iconPos==="left"||t.buttonProps?.iconPos==="left")&&t.label||t.buttonProps?.label,"p-button-icon-right":(t.iconPos==="right"||t.buttonProps?.iconPos==="right")&&t.label||t.buttonProps?.label,"p-button-icon-top":(t.iconPos==="top"||t.buttonProps?.iconPos==="top")&&t.label||t.buttonProps?.label,"p-button-icon-bottom":(t.iconPos==="bottom"||t.buttonProps?.iconPos==="bottom")&&t.label||t.buttonProps?.label},t.icon,t.buttonProps?.icon],spinnerIcon:({instance:t})=>Object.entries(t.cx("icon")).filter(([,r])=>!!r).reduce((r,[e])=>r+` ${e}`,"p-button-loading-icon"),label:"p-button-label"},Sl=(()=>{class t extends fe{name="button";style=Tl;classes=mp;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Il=new ae("BUTTON_INSTANCE");var Nn=(()=>{class t extends De{componentName="Button";hostName="";$pcButton=v(Il,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});_componentStyle=v(Sl);onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}type="button";badge;disabled;raised=!1;rounded=!1;text=!1;plain=!1;outlined=!1;link=!1;tabindex;size;variant;style;styleClass;badgeClass;badgeSeverity="secondary";ariaLabel;autofocus;iconPos="left";icon;label;loading=!1;loadingIcon;severity;buttonProps;fluid=ee(void 0,{transform:w});onClick=new I;onFocus=new I;onBlur=new I;contentTemplate;loadingIconTemplate;iconTemplate;templates;pcFluid=v(An,{optional:!0,host:!0,skipSelf:!0});get hasFluid(){return this.fluid()??!!this.pcFluid}get hasIcon(){return this.icon||this.buttonProps?.icon||this.iconTemplate||this._iconTemplate||this.loadingIcon||this.loadingIconTemplate||this._loadingIconTemplate}_contentTemplate;_iconTemplate;_loadingIconTemplate;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"icon":this._iconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}get dataP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge,loading:this.loading,fluid:this.hasFluid,rounded:this.rounded,raised:this.raised,outlined:this.outlined||this.variant==="outlined",text:this.text||this.variant==="text",link:this.link,vertical:(this.iconPos==="top"||this.iconPos==="bottom")&&this.label})}get dataIconP(){return this.cn({[this.iconPos]:this.iconPos,[this.size]:this.size})}get dataLabelP(){return this.cn({[this.size]:this.size,"icon-only":this.hasIcon&&!this.label&&!this.badge})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-button"]],contentQueries:function(n,i,o){if(n&1&&Re(o,Yc,5)(o,Zc,5)(o,Xc,5)(o,Me,4),n&2){let a;k(a=T())&&(i.contentTemplate=a.first),k(a=T())&&(i.loadingIconTemplate=a.first),k(a=T())&&(i.iconTemplate=a.first),k(a=T())&&(i.templates=a)}},inputs:{hostName:"hostName",type:"type",badge:"badge",disabled:[2,"disabled","disabled",w],raised:[2,"raised","raised",w],rounded:[2,"rounded","rounded",w],text:[2,"text","text",w],plain:[2,"plain","plain",w],outlined:[2,"outlined","outlined",w],link:[2,"link","link",w],tabindex:[2,"tabindex","tabindex",se],size:"size",variant:"variant",style:"style",styleClass:"styleClass",badgeClass:"badgeClass",badgeSeverity:"badgeSeverity",ariaLabel:"ariaLabel",autofocus:[2,"autofocus","autofocus",w],iconPos:"iconPos",icon:"icon",label:"label",loading:[2,"loading","loading",w],loadingIcon:"loadingIcon",severity:"severity",buttonProps:"buttonProps",fluid:[1,"fluid"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[le([Sl,{provide:Il,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:Jc,decls:7,vars:17,consts:[["pRipple","",3,"click","focus","blur","ngStyle","disabled","pAutoFocus","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"value","severity","pt","unstyled",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","spinner",3,"class","pBind","spin",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"pBind","spin"],[3,"ngIf"],[3,"value","severity","pt","unstyled"]],template:function(n,i){n&1&&(Ge(),c(0,"button",0),x("click",function(a){return i.onClick.emit(a)})("focus",function(a){return i.onFocus.emit(a)})("blur",function(a){return i.onBlur.emit(a)}),Ne(1),g(2,ep,1,0,"ng-container",1)(3,ap,3,6,"ng-container",2)(4,cp,3,6,"ng-container",2)(5,pp,2,6,"span",3)(6,up,1,4,"p-badge",4),p()),n&2&&(C(i.cn(i.cx("root"),i.styleClass,i.buttonProps==null?null:i.buttonProps.styleClass)),s("ngStyle",i.style||(i.buttonProps==null?null:i.buttonProps.style))("disabled",i.disabled||i.loading||(i.buttonProps==null?null:i.buttonProps.disabled))("pAutoFocus",i.autofocus||(i.buttonProps==null?null:i.buttonProps.autofocus))("pBind",i.ptm("root")),D("type",i.type||(i.buttonProps==null?null:i.buttonProps.type))("aria-label",i.ariaLabel||(i.buttonProps==null?null:i.buttonProps.ariaLabel))("tabindex",i.tabindex||(i.buttonProps==null?null:i.buttonProps.tabindex))("data-p",i.dataP)("data-p-disabled",i.disabled||i.loading||(i.buttonProps==null?null:i.buttonProps.disabled))("data-p-severity",i.severity||(i.buttonProps==null?null:i.buttonProps.severity)),l(2),s("ngTemplateOutlet",i.contentTemplate||i._contentTemplate),l(),s("ngIf",i.loading||(i.buttonProps==null?null:i.buttonProps.loading)),l(),s("ngIf",!(i.loading||i.buttonProps!=null&&i.buttonProps.loading)),l(),s("ngIf",!i.contentTemplate&&!i._contentTemplate&&(i.label||(i.buttonProps==null?null:i.buttonProps.label))),l(),s("ngIf",!i.contentTemplate&&!i._contentTemplate&&(i.badge||(i.buttonProps==null?null:i.buttonProps.badge))))},dependencies:[te,ze,Le,rt,Jt,Xt,Cn,no,er,ie,A],encapsulation:2,changeDetection:0})}return t})(),Dl=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[te,Nn,ie,ie]})}return t})();var Ml=(()=>{class t extends De{pFocusTrapDisabled=!1;platformId=v(Tn);document=v(_t);firstHiddenFocusableElement;lastHiddenFocusableElement;onInit(){qe(this.platformId)&&!this.pFocusTrapDisabled&&!this.firstHiddenFocusableElement&&!this.lastHiddenFocusableElement&&this.createHiddenFocusableElements()}onChanges(e){e.pFocusTrapDisabled&&qe(this.platformId)&&(e.pFocusTrapDisabled.currentValue?this.removeHiddenFocusableElements():this.createHiddenFocusableElements())}removeHiddenFocusableElements(){this.firstHiddenFocusableElement&&this.firstHiddenFocusableElement.parentNode&&this.firstHiddenFocusableElement.parentNode.removeChild(this.firstHiddenFocusableElement),this.lastHiddenFocusableElement&&this.lastHiddenFocusableElement.parentNode&&this.lastHiddenFocusableElement.parentNode.removeChild(this.lastHiddenFocusableElement)}getComputedSelector(e){return`:not(.p-hidden-focusable):not([data-p-hidden-focusable="true"])${e??""}`}createHiddenFocusableElements(){let n=i=>vn("span",{class:"p-hidden-accessible p-hidden-focusable",tabindex:"0",role:"presentation","aria-hidden":!0,"data-p-hidden-accessible":!0,"data-p-hidden-focusable":!0,onFocus:i?.bind(this)});this.firstHiddenFocusableElement=n(this.onFirstHiddenElementFocus),this.lastHiddenFocusableElement=n(this.onLastHiddenElementFocus),this.firstHiddenFocusableElement.setAttribute("data-pc-section","firstfocusableelement"),this.lastHiddenFocusableElement.setAttribute("data-pc-section","lastfocusableelement"),this.el.nativeElement.prepend(this.firstHiddenFocusableElement),this.el.nativeElement.append(this.lastHiddenFocusableElement)}onFirstHiddenElementFocus(e){let{currentTarget:n,relatedTarget:i}=e,o=i===this.lastHiddenFocusableElement||!this.el.nativeElement?.contains(i)?xi(n.parentElement,":not(.p-hidden-focusable)"):this.lastHiddenFocusableElement;mt(o)}onLastHiddenElementFocus(e){let{currentTarget:n,relatedTarget:i}=e,o=i===this.firstHiddenFocusableElement||!this.el.nativeElement?.contains(i)?Ci(n.parentElement,":not(.p-hidden-focusable)"):this.firstHiddenFocusableElement;mt(o)}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275dir=Oe({type:t,selectors:[["","pFocusTrap",""]],inputs:{pFocusTrapDisabled:[2,"pFocusTrapDisabled","pFocusTrapDisabled",w]},features:[L]})}return t})();var Ll=`
    .p-dialog {
        max-height: 90%;
        transform: scale(1);
        border-radius: dt('dialog.border.radius');
        box-shadow: dt('dialog.shadow');
        background: dt('dialog.background');
        border: 1px solid dt('dialog.border.color');
        color: dt('dialog.color');
        will-change: transform;
    }

    .p-dialog-content {
        overflow-y: auto;
        padding: dt('dialog.content.padding');
        flex-grow: 1;
    }

    .p-dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-shrink: 0;
        padding: dt('dialog.header.padding');
    }

    .p-dialog-title {
        font-weight: dt('dialog.title.font.weight');
        font-size: dt('dialog.title.font.size');
    }

    .p-dialog-footer {
        flex-shrink: 0;
        padding: dt('dialog.footer.padding');
        display: flex;
        justify-content: flex-end;
        gap: dt('dialog.footer.gap');
    }

    .p-dialog-header-actions {
        display: flex;
        align-items: center;
        gap: dt('dialog.header.gap');
    }

    .p-dialog-top .p-dialog,
    .p-dialog-bottom .p-dialog,
    .p-dialog-left .p-dialog,
    .p-dialog-right .p-dialog,
    .p-dialog-topleft .p-dialog,
    .p-dialog-topright .p-dialog,
    .p-dialog-bottomleft .p-dialog,
    .p-dialog-bottomright .p-dialog {
        margin: 1rem;
    }

    .p-dialog-maximized {
        width: 100vw !important;
        height: 100vh !important;
        top: 0px !important;
        left: 0px !important;
        max-height: 100%;
        height: 100%;
        border-radius: 0;
    }

    .p-dialog .p-resizable-handle {
        position: absolute;
        font-size: 0.1px;
        display: block;
        cursor: se-resize;
        width: 12px;
        height: 12px;
        right: 1px;
        bottom: 1px;
    }

    .p-dialog-enter-active {
        animation: p-animate-dialog-enter 300ms cubic-bezier(.19,1,.22,1);
    }

    .p-dialog-leave-active {
        animation: p-animate-dialog-leave 300ms cubic-bezier(.19,1,.22,1);
    }

    @keyframes p-animate-dialog-enter {
        from {
            opacity: 0;
            transform: scale(0.93);
        }
    }

    @keyframes p-animate-dialog-leave {
        to {
            opacity: 0;
            transform: scale(0.93);
        }
    }
`;var hp=["header"],Pl=["content"],Fl=["footer"],fp=["closeicon"],gp=["maximizeicon"],_p=["minimizeicon"],bp=["headless"],yp=["titlebar"],vp=["*",[["p-footer"]]],xp=["*","p-footer"],Cp=t=>({ariaLabelledBy:t});function wp(t,r){t&1&&U(0)}function kp(t,r){if(t&1&&(W(0),g(1,wp,1,0,"ng-container",11),K()),t&2){let e=d(3);l(),s("ngTemplateOutlet",e._headlessTemplate||e.headlessTemplate||e.headlessT)}}function Tp(t,r){if(t&1){let e=P();c(0,"div",16),x("mousedown",function(i){_(e);let o=d(4);return b(o.initResize(i))}),p()}if(t&2){let e=d(4);C(e.cx("resizeHandle")),je("z-index",90),s("pBind",e.ptm("resizeHandle"))}}function Sp(t,r){if(t&1&&(c(0,"span",21),m(1),p()),t&2){let e=d(5);C(e.cx("title")),s("id",e.ariaLabelledBy)("pBind",e.ptm("title")),l(),Q(e.header)}}function Ip(t,r){t&1&&U(0)}function Ep(t,r){if(t&1&&F(0,"span",25),t&2){let e=d(7);s("ngClass",e.maximized?e.minimizeIcon:e.maximizeIcon)}}function Dp(t,r){t&1&&(O(),F(0,"svg",28))}function Mp(t,r){t&1&&(O(),F(0,"svg",29))}function Lp(t,r){if(t&1&&(W(0),g(1,Dp,1,0,"svg",26)(2,Mp,1,0,"svg",27),K()),t&2){let e=d(7);l(),s("ngIf",!e.maximized&&!e._maximizeiconTemplate&&!e.maximizeIconTemplate&&!e.maximizeIconT),l(),s("ngIf",e.maximized&&!e._minimizeiconTemplate&&!e.minimizeIconTemplate&&!e.minimizeIconT)}}function Pp(t,r){}function Fp(t,r){t&1&&g(0,Pp,0,0,"ng-template")}function Rp(t,r){if(t&1&&(W(0),g(1,Fp,1,0,null,11),K()),t&2){let e=d(7);l(),s("ngTemplateOutlet",e._maximizeiconTemplate||e.maximizeIconTemplate||e.maximizeIconT)}}function Bp(t,r){}function Op(t,r){t&1&&g(0,Bp,0,0,"ng-template")}function Vp(t,r){if(t&1&&(W(0),g(1,Op,1,0,null,11),K()),t&2){let e=d(7);l(),s("ngTemplateOutlet",e._minimizeiconTemplate||e.minimizeIconTemplate||e.minimizeIconT)}}function zp(t,r){if(t&1&&g(0,Ep,1,1,"span",23)(1,Lp,3,2,"ng-container",24)(2,Rp,2,1,"ng-container",24)(3,Vp,2,1,"ng-container",24),t&2){let e=d(6);s("ngIf",e.maximizeIcon&&!e._maximizeiconTemplate&&!e._minimizeiconTemplate),l(),s("ngIf",!e.maximizeIcon&&!(e.maximizeButtonProps!=null&&e.maximizeButtonProps.icon)),l(),s("ngIf",!e.maximized),l(),s("ngIf",e.maximized)}}function qp(t,r){if(t&1){let e=P();c(0,"p-button",22),x("onClick",function(){_(e);let i=d(5);return b(i.maximize())})("keydown.enter",function(){_(e);let i=d(5);return b(i.maximize())}),g(1,zp,4,4,"ng-template",null,4,Ie),p()}if(t&2){let e=d(5);s("pt",e.ptm("pcMaximizeButton"))("styleClass",e.cx("pcMaximizeButton"))("ariaLabel",e.maximized?e.minimizeLabel:e.maximizeLabel)("tabindex",e.maximizable?"0":"-1")("buttonProps",e.maximizeButtonProps)("unstyled",e.unstyled()),D("data-pc-group-section","headericon")}}function Ap(t,r){if(t&1&&F(0,"span"),t&2){let e=d(8);C(e.closeIcon)}}function Np(t,r){t&1&&(O(),F(0,"svg",32))}function Hp(t,r){if(t&1&&(W(0),g(1,Ap,1,2,"span",30)(2,Np,1,0,"svg",31),K()),t&2){let e=d(7);l(),s("ngIf",e.closeIcon),l(),s("ngIf",!e.closeIcon)}}function $p(t,r){}function jp(t,r){t&1&&g(0,$p,0,0,"ng-template")}function Up(t,r){if(t&1&&(c(0,"span"),g(1,jp,1,0,null,11),p()),t&2){let e=d(7);l(),s("ngTemplateOutlet",e._closeiconTemplate||e.closeIconTemplate||e.closeIconT)}}function Qp(t,r){if(t&1&&g(0,Hp,3,2,"ng-container",24)(1,Up,2,1,"span",24),t&2){let e=d(6);s("ngIf",!e._closeiconTemplate&&!e.closeIconTemplate&&!e.closeIconT&&!(e.closeButtonProps!=null&&e.closeButtonProps.icon)),l(),s("ngIf",e._closeiconTemplate||e.closeIconTemplate||e.closeIconT)}}function Gp(t,r){if(t&1){let e=P();c(0,"p-button",22),x("onClick",function(i){_(e);let o=d(5);return b(o.close(i))})("keydown.enter",function(i){_(e);let o=d(5);return b(o.close(i))}),g(1,Qp,2,2,"ng-template",null,4,Ie),p()}if(t&2){let e=d(5);s("pt",e.ptm("pcCloseButton"))("styleClass",e.cx("pcCloseButton"))("ariaLabel",e.closeAriaLabel)("tabindex",e.closeTabindex)("buttonProps",e.closeButtonProps)("unstyled",e.unstyled()),D("data-pc-group-section","headericon")}}function Wp(t,r){if(t&1){let e=P();c(0,"div",16,3),x("mousedown",function(i){_(e);let o=d(4);return b(o.initDrag(i))}),g(2,Sp,2,5,"span",17)(3,Ip,1,0,"ng-container",18),c(4,"div",19),g(5,qp,3,7,"p-button",20)(6,Gp,3,7,"p-button",20),p()()}if(t&2){let e=d(4);C(e.cx("header")),s("pBind",e.ptm("header")),l(2),s("ngIf",!e._headerTemplate&&!e.headerTemplate&&!e.headerT),l(),s("ngTemplateOutlet",e._headerTemplate||e.headerTemplate||e.headerT)("ngTemplateOutletContext",oe(11,Cp,e.ariaLabelledBy)),l(),C(e.cx("headerActions")),s("pBind",e.ptm("headerActions")),l(),s("ngIf",e.maximizable),l(),s("ngIf",e.closable)}}function Kp(t,r){t&1&&U(0)}function Yp(t,r){t&1&&U(0)}function Zp(t,r){if(t&1&&(c(0,"div",19,5),Ne(2,1),g(3,Yp,1,0,"ng-container",11),p()),t&2){let e=d(4);C(e.cx("footer")),s("pBind",e.ptm("footer")),l(3),s("ngTemplateOutlet",e._footerTemplate||e.footerTemplate||e.footerT)}}function Xp(t,r){if(t&1&&(g(0,Tp,1,5,"div",12)(1,Wp,7,13,"div",13),c(2,"div",14,2),Ne(4),g(5,Kp,1,0,"ng-container",11),p(),g(6,Zp,4,4,"div",15)),t&2){let e=d(3);s("ngIf",e.resizable),l(),s("ngIf",e.showHeader),l(),C(e.cn(e.cx("content"),e.contentStyleClass)),s("ngStyle",e.contentStyle)("pBind",e.ptm("content")),l(3),s("ngTemplateOutlet",e._contentTemplate||e.contentTemplate||e.contentT),l(),s("ngIf",e._footerTemplate||e.footerTemplate||e.footerT)}}function Jp(t,r){if(t&1){let e=P();c(0,"div",9,0),x("pMotionOnBeforeEnter",function(i){_(e);let o=d(2);return b(o.onBeforeEnter(i))})("pMotionOnAfterEnter",function(i){_(e);let o=d(2);return b(o.onAfterEnter(i))})("pMotionOnBeforeLeave",function(i){_(e);let o=d(2);return b(o.onBeforeLeave(i))})("pMotionOnAfterLeave",function(i){_(e);let o=d(2);return b(o.onAfterLeave(i))}),g(2,kp,2,1,"ng-container",10)(3,Xp,7,8,"ng-template",null,1,Ie),p()}if(t&2){let e=Se(4),n=d(2);Ae(n.sx("root")),C(n.cn(n.cx("root"),n.styleClass)),s("ngStyle",n.style)("pBind",n.ptm("root"))("pFocusTrapDisabled",n.focusTrap===!1)("pMotion",n.visible)("pMotionAppear",!0)("pMotionName","p-dialog")("pMotionOptions",n.computedMotionOptions()),D("role",n.role)("aria-labelledby",n.ariaLabelledBy)("aria-modal",!0)("data-p",n.dataP),l(2),s("ngIf",n._headlessTemplate||n.headlessTemplate||n.headlessT)("ngIfElse",e)}}function eu(t,r){if(t&1){let e=P();c(0,"div",7),x("pMotionOnAfterLeave",function(){_(e);let i=d();return b(i.onMaskAfterLeave())}),V(1,Jp,5,17,"div",8),p()}if(t&2){let e=d();Ae(e.sx("mask")),C(e.cn(e.cx("mask"),e.maskStyleClass)),s("ngStyle",e.maskStyle)("pBind",e.ptm("mask"))("pMotion",e.maskVisible)("pMotionAppear",!0)("pMotionEnterActiveClass",e.modal?"p-overlay-mask-enter-active":"")("pMotionLeaveActiveClass",e.modal?"p-overlay-mask-leave-active":"")("pMotionOptions",e.computedMaskMotionOptions()),D("data-p-scrollblocker-active",e.modal||e.blockScroll)("data-p",e.dataP),l(),z(e.renderDialog()?1:-1)}}var tu={mask:({instance:t})=>({position:"fixed",height:"100%",width:"100%",left:0,top:0,display:"flex",justifyContent:t.position==="left"||t.position==="topleft"||t.position==="bottomleft"?"flex-start":t.position==="right"||t.position==="topright"||t.position==="bottomright"?"flex-end":"center",alignItems:t.position==="top"||t.position==="topleft"||t.position==="topright"?"flex-start":t.position==="bottom"||t.position==="bottomleft"||t.position==="bottomright"?"flex-end":"center",pointerEvents:t.modal?"auto":"none"}),root:{display:"flex",flexDirection:"column",pointerEvents:"auto"}},nu={mask:({instance:t})=>{let e=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"].find(n=>n===t.position);return["p-dialog-mask",{"p-overlay-mask":t.modal},e?`p-dialog-${e}`:""]},root:({instance:t})=>["p-dialog p-component",{"p-dialog-maximized":t.maximizable&&t.maximized}],header:"p-dialog-header",title:"p-dialog-title",resizeHandle:"p-resizable-handle",headerActions:"p-dialog-header-actions",pcMaximizeButton:"p-dialog-maximize-button",pcCloseButton:"p-dialog-close-button",content:()=>["p-dialog-content"],footer:"p-dialog-footer"},Rl=(()=>{class t extends fe{name="dialog";style=Ll;classes=nu;inlineStyles=tu;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Bl=new ae("DIALOG_INSTANCE"),ir=(()=>{class t extends De{componentName="Dialog";hostName="";$pcDialog=v(Bl,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}header;draggable=!0;resizable=!0;contentStyle;contentStyleClass;modal=!1;closeOnEscape=!0;dismissableMask=!1;rtl=!1;closable=!0;breakpoints;styleClass;maskStyleClass;maskStyle;showHeader=!0;blockScroll=!1;autoZIndex=!0;baseZIndex=0;minX=0;minY=0;focusOnShow=!0;maximizable=!1;keepInViewport=!0;focusTrap=!0;transitionOptions="150ms cubic-bezier(0, 0, 0.2, 1)";maskMotionOptions=ee(void 0);computedMaskMotionOptions=J(()=>G(G({},this.ptm("maskMotion")),this.maskMotionOptions()));motionOptions=ee(void 0);computedMotionOptions=J(()=>G(G({},this.ptm("motion")),this.motionOptions()));closeIcon;closeAriaLabel;closeTabindex="0";minimizeIcon;maximizeIcon;closeButtonProps={severity:"secondary",variant:"text",rounded:!0};maximizeButtonProps={severity:"secondary",variant:"text",rounded:!0};get visible(){return this._visible}set visible(e){this._visible=e,this._visible&&!this.maskVisible&&(this.maskVisible=!0,this.renderMask.set(!0),this.renderDialog.set(!0))}get style(){return this._style}set style(e){e&&(this._style=G({},e),this.originalStyle=e)}position;role="dialog";appendTo=ee(void 0);onShow=new I;onHide=new I;visibleChange=new I;onResizeInit=new I;onResizeEnd=new I;onDragEnd=new I;onMaximize=new I;headerViewChild;contentViewChild;footerViewChild;headerTemplate;contentTemplate;footerTemplate;closeIconTemplate;maximizeIconTemplate;minimizeIconTemplate;headlessTemplate;_headerTemplate;_contentTemplate;_footerTemplate;_closeiconTemplate;_maximizeiconTemplate;_minimizeiconTemplate;_headlessTemplate;$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());renderMask=Z(!1);renderDialog=Z(!1);_visible=!1;maskVisible;container=Z(null);wrapper;dragging;ariaLabelledBy=this.getAriaLabelledBy();documentDragListener;documentDragEndListener;resizing;documentResizeListener;documentResizeEndListener;documentEscapeListener;maskClickListener;lastPageX;lastPageY;preventVisibleChangePropagation;maximized;preMaximizeContentHeight;preMaximizeContainerWidth;preMaximizeContainerHeight;preMaximizePageX;preMaximizePageY;id=Te("pn_id_");_style={};originalStyle;transformOptions="scale(0.7)";styleElement;window;_componentStyle=v(Rl);headerT;contentT;footerT;closeIconT;maximizeIconT;minimizeIconT;headlessT;zIndexForLayering;get maximizeLabel(){return this.config.getTranslation(Ze.ARIA).maximizeLabel}get minimizeLabel(){return this.config.getTranslation(Ze.ARIA).minimizeLabel}zone=v(Be);overlayService=v(pn);get maskClass(){let n=["left","right","top","topleft","topright","bottom","bottomleft","bottomright"].find(i=>i===this.position);return{"p-dialog-mask":!0,"p-overlay-mask":this.modal||this.dismissableMask,[`p-dialog-${n}`]:n}}onInit(){this.breakpoints&&this.createStyle()}templates;onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"header":this.headerT=e.template;break;case"content":this.contentT=e.template;break;case"footer":this.footerT=e.template;break;case"closeicon":this.closeIconT=e.template;break;case"maximizeicon":this.maximizeIconT=e.template;break;case"minimizeicon":this.minimizeIconT=e.template;break;case"headless":this.headlessT=e.template;break;default:this.contentT=e.template;break}})}getAriaLabelledBy(){return this.header!==null?Te("pn_id_")+"_header":null}parseDurationToMilliseconds(e){let n=/([\d\.]+)(ms|s)\b/g,i=0,o;for(;(o=n.exec(e))!==null;){let a=parseFloat(o[1]),u=o[2];u==="ms"?i+=a:u==="s"&&(i+=a*1e3)}if(i!==0)return i}_focus(e){if(e){let n=this.parseDurationToMilliseconds(this.transitionOptions),i=de.getFocusableElements(e);if(i&&i.length>0)return this.zone.runOutsideAngular(()=>{setTimeout(()=>i[0].focus(),n||5)}),!0}return!1}focus(e=this.contentViewChild?.nativeElement){let n=this._focus(e);n||(n=this._focus(this.footerViewChild?.nativeElement),n||(n=this._focus(this.headerViewChild?.nativeElement),n||this._focus(this.contentViewChild?.nativeElement)))}close(e){this.visible=!1,this.visibleChange.emit(this.visible),e.preventDefault()}enableModality(){this.closable&&this.dismissableMask&&(this.maskClickListener=this.renderer.listen(this.wrapper,"mousedown",e=>{this.wrapper&&this.wrapper.isSameNode(e.target)&&this.close(e)})),this.modal&&ci()}disableModality(){if(this.wrapper){this.dismissableMask&&this.unbindMaskClickListener();let e=document.querySelectorAll('[data-p-scrollblocker-active="true"]');this.modal&&e&&e.length==1&&xn(),this.cd.destroyed||this.cd.detectChanges()}}maximize(){this.maximized=!this.maximized,!this.modal&&!this.blockScroll&&(this.maximized?ci():xn()),this.onMaximize.emit({maximized:this.maximized})}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}moveOnTop(){this.autoZIndex?(Ue.set("modal",this.container(),this.baseZIndex+this.config.zIndex.modal),this.wrapper.style.zIndex=String(parseInt(this.container().style.zIndex,10)-1)):this.zIndexForLayering=Ue.generateZIndex("modal",(this.baseZIndex??0)+this.config.zIndex.modal)}createStyle(){if(qe(this.platformId)&&!this.styleElement&&!this.$unstyled()){this.styleElement=this.renderer.createElement("style"),this.styleElement.type="text/css",cn(this.styleElement,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.styleElement);let e="";for(let n in this.breakpoints)e+=`
                        @media screen and (max-width: ${n}) {
                            .p-dialog[${this.id}]:not(.p-dialog-maximized) {
                                width: ${this.breakpoints[n]} !important;
                            }
                        }
                    `;this.renderer.setProperty(this.styleElement,"innerHTML",e),cn(this.styleElement,"nonce",this.config?.csp()?.nonce)}}initDrag(e){e.target.closest("div")?.getAttribute("data-pc-section")!=="headeractions"&&this.draggable&&(this.dragging=!0,this.lastPageX=e.pageX,this.lastPageY=e.pageY,this.container().style.margin="0",this.document.body.setAttribute("data-p-unselectable-text","true"),!this.$unstyled()&&Mn(this.document.body,{"user-select":"none"}))}onDrag(e){if(this.dragging&&this.container()){let n=Ye(this.container()),i=ht(this.container()),o=e.pageX-this.lastPageX,a=e.pageY-this.lastPageY,u=this.container().getBoundingClientRect(),h=getComputedStyle(this.container()),f=parseFloat(h.marginLeft),y=parseFloat(h.marginTop),S=u.left+o-f,N=u.top+a-y,B=Zn();this.container().style.position="fixed",this.keepInViewport?(S>=this.minX&&S+n<B.width&&(this._style.left=`${S}px`,this.lastPageX=e.pageX,this.container().style.left=`${S}px`),N>=this.minY&&N+i<B.height&&(this._style.top=`${N}px`,this.lastPageY=e.pageY,this.container().style.top=`${N}px`)):(this.lastPageX=e.pageX,this.container().style.left=`${S}px`,this.lastPageY=e.pageY,this.container().style.top=`${N}px`),this.overlayService.emitParentDrag(this.container())}}endDrag(e){this.dragging&&(this.dragging=!1,this.document.body.removeAttribute("data-p-unselectable-text"),!this.$unstyled()&&(this.document.body.style["user-select"]=""),this.cd.detectChanges(),this.onDragEnd.emit(e))}resetPosition(){this.container().style.position="",this.container().style.left="",this.container().style.top="",this.container().style.margin=""}center(){this.resetPosition()}initResize(e){this.resizable&&(this.resizing=!0,this.lastPageX=e.pageX,this.lastPageY=e.pageY,this.document.body.setAttribute("data-p-unselectable-text","true"),!this.$unstyled()&&Mn(this.document.body,{"user-select":"none"}),this.onResizeInit.emit(e))}onResize(e){if(this.resizing){let n=e.pageX-this.lastPageX,i=e.pageY-this.lastPageY,o=Ye(this.container()),a=ht(this.container()),u=ht(this.contentViewChild?.nativeElement),h=o+n,f=a+i,y=this.container().style.minWidth,S=this.container().style.minHeight,N=this.container().getBoundingClientRect(),B=Zn();(!parseInt(this.container().style.top)||!parseInt(this.container().style.left))&&(h+=n,f+=i),(!y||h>parseInt(y))&&N.left+h<B.width&&(this._style.width=h+"px",this.container().style.width=this._style.width),(!S||f>parseInt(S))&&N.top+f<B.height&&(this.contentViewChild.nativeElement.style.height=u+f-a+"px",this._style.height&&(this._style.height=f+"px",this.container().style.height=this._style.height)),this.lastPageX=e.pageX,this.lastPageY=e.pageY}}resizeEnd(e){this.resizing&&(this.resizing=!1,this.document.body.removeAttribute("data-p-unselectable-text"),!this.$unstyled()&&(this.document.body.style["user-select"]=""),this.onResizeEnd.emit(e))}bindGlobalListeners(){this.draggable&&(this.bindDocumentDragListener(),this.bindDocumentDragEndListener()),this.resizable&&this.bindDocumentResizeListeners(),this.closeOnEscape&&this.closable&&this.bindDocumentEscapeListener()}unbindGlobalListeners(){this.unbindDocumentDragListener(),this.unbindDocumentDragEndListener(),this.unbindDocumentResizeListeners(),this.unbindDocumentEscapeListener()}bindDocumentDragListener(){this.documentDragListener||this.zone.runOutsideAngular(()=>{this.documentDragListener=this.renderer.listen(this.document.defaultView,"mousemove",this.onDrag.bind(this))})}unbindDocumentDragListener(){this.documentDragListener&&(this.documentDragListener(),this.documentDragListener=null)}bindDocumentDragEndListener(){this.documentDragEndListener||this.zone.runOutsideAngular(()=>{this.documentDragEndListener=this.renderer.listen(this.document.defaultView,"mouseup",this.endDrag.bind(this))})}unbindDocumentDragEndListener(){this.documentDragEndListener&&(this.documentDragEndListener(),this.documentDragEndListener=null)}bindDocumentResizeListeners(){!this.documentResizeListener&&!this.documentResizeEndListener&&this.zone.runOutsideAngular(()=>{this.documentResizeListener=this.renderer.listen(this.document.defaultView,"mousemove",this.onResize.bind(this)),this.documentResizeEndListener=this.renderer.listen(this.document.defaultView,"mouseup",this.resizeEnd.bind(this))})}unbindDocumentResizeListeners(){this.documentResizeListener&&this.documentResizeEndListener&&(this.documentResizeListener(),this.documentResizeEndListener(),this.documentResizeListener=null,this.documentResizeEndListener=null)}bindDocumentEscapeListener(){let e=this.el?this.el.nativeElement.ownerDocument:"document";this.documentEscapeListener=this.renderer.listen(e,"keydown",n=>{if(n.key=="Escape"){let i=this.container();if(!i)return;let o=Ue.getCurrent();(parseInt(i.style.zIndex)==o||this.zIndexForLayering==o)&&this.close(n)}})}unbindDocumentEscapeListener(){this.documentEscapeListener&&(this.documentEscapeListener(),this.documentEscapeListener=null)}appendContainer(){this.$appendTo()!=="self"&&qt(this.document.body,this.wrapper)}restoreAppend(){this.container()&&this.$appendTo()!=="self"&&this.renderer.appendChild(this.el.nativeElement,this.wrapper)}onBeforeEnter(e){this.container.set(e.element),this.wrapper=this.container()?.parentElement,this.$attrSelector&&this.container()?.setAttribute(this.$attrSelector,""),this.appendContainer(),this.moveOnTop(),this.bindGlobalListeners(),this.container()?.setAttribute(this.id,""),this.modal&&this.enableModality()}onAfterEnter(){this.focusOnShow&&this.focus(),this.onShow.emit({})}onBeforeLeave(){this.modal&&(this.maskVisible=!1)}onAfterLeave(){this.onContainerDestroy(),this.renderDialog.set(!1),this.modal?this.renderMask.set(!1):this.maskVisible=!1,this.onHide.emit({}),this.cd.markForCheck()}onMaskAfterLeave(){this.renderDialog()||this.renderMask.set(!1)}onContainerDestroy(){this.unbindGlobalListeners(),this.dragging=!1,this.maximized&&(zt(this.document.body,"p-overflow-hidden"),this.document.body.style.removeProperty("--scrollbar-width"),this.maximized=!1),this.modal&&this.disableModality(),Ke(this.document.body,"p-overflow-hidden")&&zt(this.document.body,"p-overflow-hidden"),this.container()&&this.autoZIndex&&Ue.clear(this.container()),this.zIndexForLayering&&Ue.revertZIndex(this.zIndexForLayering),this.container.set(null),this.wrapper=null,this._style=this.originalStyle?G({},this.originalStyle):{}}destroyStyle(){this.styleElement&&(this.renderer.removeChild(this.document.head,this.styleElement),this.styleElement=null)}onDestroy(){this.container()&&(this.restoreAppend(),this.onContainerDestroy()),this.destroyStyle()}get dataP(){return this.cn({maximized:this.maximized,modal:this.modal})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-dialog"]],contentQueries:function(n,i,o){if(n&1&&Re(o,hp,4)(o,Pl,4)(o,Fl,4)(o,fp,4)(o,gp,4)(o,_p,4)(o,bp,4)(o,Me,4),n&2){let a;k(a=T())&&(i._headerTemplate=a.first),k(a=T())&&(i._contentTemplate=a.first),k(a=T())&&(i._footerTemplate=a.first),k(a=T())&&(i._closeiconTemplate=a.first),k(a=T())&&(i._maximizeiconTemplate=a.first),k(a=T())&&(i._minimizeiconTemplate=a.first),k(a=T())&&(i._headlessTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(yp,5)(Pl,5)(Fl,5),n&2){let o;k(o=T())&&(i.headerViewChild=o.first),k(o=T())&&(i.contentViewChild=o.first),k(o=T())&&(i.footerViewChild=o.first)}},inputs:{hostName:"hostName",header:"header",draggable:[2,"draggable","draggable",w],resizable:[2,"resizable","resizable",w],contentStyle:"contentStyle",contentStyleClass:"contentStyleClass",modal:[2,"modal","modal",w],closeOnEscape:[2,"closeOnEscape","closeOnEscape",w],dismissableMask:[2,"dismissableMask","dismissableMask",w],rtl:[2,"rtl","rtl",w],closable:[2,"closable","closable",w],breakpoints:"breakpoints",styleClass:"styleClass",maskStyleClass:"maskStyleClass",maskStyle:"maskStyle",showHeader:[2,"showHeader","showHeader",w],blockScroll:[2,"blockScroll","blockScroll",w],autoZIndex:[2,"autoZIndex","autoZIndex",w],baseZIndex:[2,"baseZIndex","baseZIndex",se],minX:[2,"minX","minX",se],minY:[2,"minY","minY",se],focusOnShow:[2,"focusOnShow","focusOnShow",w],maximizable:[2,"maximizable","maximizable",w],keepInViewport:[2,"keepInViewport","keepInViewport",w],focusTrap:[2,"focusTrap","focusTrap",w],transitionOptions:"transitionOptions",maskMotionOptions:[1,"maskMotionOptions"],motionOptions:[1,"motionOptions"],closeIcon:"closeIcon",closeAriaLabel:"closeAriaLabel",closeTabindex:"closeTabindex",minimizeIcon:"minimizeIcon",maximizeIcon:"maximizeIcon",closeButtonProps:"closeButtonProps",maximizeButtonProps:"maximizeButtonProps",visible:"visible",style:"style",position:"position",role:"role",appendTo:[1,"appendTo"],headerTemplate:[0,"content","headerTemplate"],contentTemplate:"contentTemplate",footerTemplate:"footerTemplate",closeIconTemplate:"closeIconTemplate",maximizeIconTemplate:"maximizeIconTemplate",minimizeIconTemplate:"minimizeIconTemplate",headlessTemplate:"headlessTemplate"},outputs:{onShow:"onShow",onHide:"onHide",visibleChange:"visibleChange",onResizeInit:"onResizeInit",onResizeEnd:"onResizeEnd",onDragEnd:"onDragEnd",onMaximize:"onMaximize"},features:[le([Rl,{provide:Bl,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:xp,decls:1,vars:1,consts:[["container",""],["notHeadless",""],["content",""],["titlebar",""],["icon",""],["footer",""],[3,"class","style","ngStyle","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],[3,"pMotionOnAfterLeave","ngStyle","pBind","pMotion","pMotionAppear","pMotionEnterActiveClass","pMotionLeaveActiveClass","pMotionOptions"],["pFocusTrap","",3,"class","style","ngStyle","pBind","pFocusTrapDisabled","pMotion","pMotionAppear","pMotionName","pMotionOptions"],["pFocusTrap","",3,"pMotionOnBeforeEnter","pMotionOnAfterEnter","pMotionOnBeforeLeave","pMotionOnAfterLeave","ngStyle","pBind","pFocusTrapDisabled","pMotion","pMotionAppear","pMotionName","pMotionOptions"],[4,"ngIf","ngIfElse"],[4,"ngTemplateOutlet"],[3,"class","pBind","z-index","mousedown",4,"ngIf"],[3,"class","pBind","mousedown",4,"ngIf"],[3,"ngStyle","pBind"],[3,"class","pBind",4,"ngIf"],[3,"mousedown","pBind"],[3,"id","class","pBind",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"pBind"],[3,"pt","styleClass","ariaLabel","tabindex","buttonProps","unstyled","onClick","keydown.enter",4,"ngIf"],[3,"id","pBind"],[3,"onClick","keydown.enter","pt","styleClass","ariaLabel","tabindex","buttonProps","unstyled"],[3,"ngClass",4,"ngIf"],[4,"ngIf"],[3,"ngClass"],["data-p-icon","window-maximize",4,"ngIf"],["data-p-icon","window-minimize",4,"ngIf"],["data-p-icon","window-maximize"],["data-p-icon","window-minimize"],[3,"class",4,"ngIf"],["data-p-icon","times",4,"ngIf"],["data-p-icon","times"]],template:function(n,i){n&1&&(Ge(vp),V(0,eu,2,14,"div",6)),n&2&&z(i.renderMask()?0:-1)},dependencies:[te,at,ze,Le,rt,Nn,Ml,fn,xl,Cl,ie,A,gn,ta],encapsulation:2,changeDetection:0})}return t})(),Vl=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[ir,ie,ie]})}return t})();var ql={id:null,title:"",subject:"",difficulty_level:"BEGINNER",estimated_duration_minutes:0,short_description:"",status:"DRAFT",modules:[]},zl={lesson:ql,saveState:"idle",lastSavedAt:null,saveError:null,loading:!1},ou=t=>typeof t.id=="string"&&t.id.length>0,ru=t=>({title:t.title.trim()?t.title:"Untitled Lesson",subject:t.subject.trim()?t.subject:"General",difficultyLevel:t.difficulty_level||"BEGINNER",estimatedDurationMinutes:t.estimated_duration_minutes||30,shortDescription:t.short_description||"",subcapitols:t.modules.length>0?t.modules.map((r,e)=>({title:r.title.trim()?r.title:"Untitled Module",orderIndex:e+1})):[{title:"Introduction",orderIndex:1}]}),au=t=>({title:t.title.trim()?t.title:"Untitled Lesson",subject:t.subject.trim()?t.subject:"General",difficultyLevel:t.difficulty_level||"BEGINNER",estimatedDurationMinutes:t.estimated_duration_minutes||30,shortDescription:t.short_description||""}),oo=(t,r)=>({id:t.id,title:t.title,subject:t.subject,difficulty_level:t.difficultyLevel??t.difficulty_level,estimated_duration_minutes:t.estimatedDurationMinutes??t.estimated_duration_minutes,short_description:t.shortDescription??t.short_description??"",status:t.status,modules:(t.subcapitols??t.modules)?.map((e,n)=>{let i=r.find(a=>a.id===e.id||a.title===e.title),o=(e.blocks||[]).find(a=>a.blockType==="TEXT"||a.blockType==="text");return{id:e.id??i?.id??`module-${n}`,title:e.title||i?.title||"",type:"text",content:o?.content??i?.content??"",blockId:o?.id??i?.blockId}})??r}),Al=Tt({providedIn:"root"},It(zl),un(t=>({isDirty:J(()=>t.saveState()==="unsaved"),canPublish:J(()=>{let r=t.lesson();return(r.title||"").trim().length>0&&(r.subject||"").trim().length>0&&r.estimated_duration_minutes>0&&r.modules.length>0})})),St((t,r=v(Je),e=v(Yt),n=v(ki,{optional:!0}))=>{let i=()=>R(t,{saveState:"unsaved"}),o=u=>{if(u instanceof Rr&&u.error){if(u.error.error&&typeof u.error.error=="string")return u.error.error;if(typeof u.error=="object"&&u.error!==null){let h=Object.entries(u.error).filter(([,f])=>typeof f=="string").map(([f,y])=>`${f}: ${y}`);if(h.length>0)return h.join(" | ")}if(typeof u.error=="string")return u.error}return u?.message||"An unexpected error occurred"},a=async u=>{R(t,{saveState:"saving",saveError:null});let h=u.id,f=[...u.modules];if(h)await gt(r.put(`${e}/lessons/${h}`,au(u)));else{let B=await gt(r.post(`${e}/lessons`,ru(u)));h=B.id;let q=B.subcapitols||[];f=f.map((j,H)=>{let pe=q[H];return pe?ue(G({},j),{id:pe.id}):j})}let y=[];for(let B of f){let q=B.id.startsWith("module-"),j=B.id,H=B.blockId,pe=(B.content||"").trim().length>0?B.content:" ",ke=(B.title||"").trim().length>0?B.title:"Untitled Module";if(q)j=(await gt(r.post(`${e}/lessons/${h}/subcapitols`,{title:ke}))).id,H=(await gt(r.post(`${e}/subcapitols/${j}/blocks`,{blockType:"TEXT",content:pe,mediaId:null,languageTag:"ro",codeLanguage:null}))).id;else if(await gt(r.put(`${e}/subcapitols/${j}`,{title:ke})),H)await gt(r.put(`${e}/blocks/${H}`,{content:pe,codeLanguage:null,mediaId:null}));else try{H=(await gt(r.post(`${e}/subcapitols/${j}/blocks`,{blockType:"TEXT",content:pe,mediaId:null,languageTag:"ro",codeLanguage:null}))).id}catch(xe){console.error("Failed to fallback create block",xe)}y.push(ue(G({},B),{id:j,blockId:H}))}if(y.length>0){let B=y.map(q=>q.id);await gt(r.put(`${e}/lessons/${h}/subcapitols/reorder`,{orderedIds:B}))}let S=await gt(r.get(`${e}/lessons/${h}`)),N=oo(S,y);return R(t,{lesson:N,saveState:"saved",lastSavedAt:new Date}),N};return{reset(u){R(t,ue(G({},zl),{lesson:G(G({},ql),u??{})}))},loadLesson(u){R(t,{loading:!0}),r.get(`${e}/lessons/${u}`).subscribe({next:h=>{R(t,{lesson:oo(h,[]),loading:!1,saveState:"saved",lastSavedAt:new Date})},error:h=>{let f=o(h);R(t,{loading:!1,saveError:f}),n?.add({severity:"error",summary:"Load Failed",detail:f})}})},updateMetadata(u){R(t,h=>({lesson:G(G({},h.lesson),u)})),i()},addModule(){let h={id:`module-${crypto.randomUUID()}`,title:"New Module",type:"text",content:"",blockId:void 0};R(t,f=>({lesson:ue(G({},f.lesson),{modules:[...f.lesson.modules,h]})})),i()},updateModule(u,h){R(t,f=>({lesson:ue(G({},f.lesson),{modules:f.lesson.modules.map(y=>y.id===u?G(G({},y),h):y)})})),i()},async removeModule(u){if(R(t,h=>({lesson:ue(G({},h.lesson),{modules:h.lesson.modules.filter(f=>f.id!==u)})})),!u.startsWith("module-"))try{await gt(r.delete(`${e}/subcapitols/${u}`))}catch(h){console.error("Failed to delete subcapitol on backend",h)}i()},reorderModules(u,h){R(t,f=>{let y=[...f.lesson.modules],[S]=y.splice(u,1);return y.splice(h,0,S),{lesson:ue(G({},f.lesson),{modules:y})}}),i()},async save(u){try{let h=await a(t.lesson());n?.add({severity:"success",summary:"Saved",detail:"Draft saved successfully."}),u&&u(h)}catch(h){let f=o(h);R(t,{saveState:"error",saveError:f}),n?.add({severity:"error",summary:"Save Failed",detail:f})}},async publish(u){try{R(t,{saveState:"saving",saveError:null});let h=await a(t.lesson()),f=await gt(r.post(`${e}/lessons/${h.id}/publish`,{})),y=oo(f,h.modules);R(t,{lesson:y,saveState:"saved",lastSavedAt:new Date}),n?.add({severity:"success",summary:"Published",detail:"Lesson is now visible to students!"}),u&&u(y)}catch(h){let f=o(h);R(t,{saveState:"error",saveError:f}),n?.add({severity:"error",summary:"Publish Failed",detail:f})}},unpublish(u){let h=t.lesson();ou(h)&&(R(t,{saveState:"saving",saveError:null}),r.post(`${e}/lessons/${h.id}/unpublish`,{}).subscribe({next:f=>{let y=oo(f,h.modules);R(t,{lesson:y,saveState:"saved",lastSavedAt:new Date}),n?.add({severity:"info",summary:"Unpublished",detail:"Lesson returned to draft status."}),u?.(y)},error:f=>{let y=o(f);R(t,{saveState:"error",saveError:y}),n?.add({severity:"error",summary:"Unpublish Failed",detail:y})}}))}}}));var lu=(t,r)=>({"border-[#0ABAB5] bg-[#0ABAB5]/10":t,"border-black/30":r}),su=(t,r)=>r.id;function du(t,r){if(t&1&&(c(0,"div",10)(1,"span",12),m(2,"error"),p(),m(3),p()),t&2){let e=d();l(3),$(" ",e.errorMessage()," ")}}function cu(t,r){if(t&1&&(c(0,"div",24)(1,"span",28),m(2,"autorenew"),p(),c(3,"div",29)(4,"div",30),F(5,"div",31),p()()()),t&2){let e=d(2).$implicit;l(5),je("width",e.progress,"%")}}function pu(t,r){if(t&1&&(c(0,"div",25),F(1,"app-media-player",32),p()),t&2){let e=d(2).$implicit;l(),s("url",e.url)("type",e.type)("title",e.name)}}function uu(t,r){t&1&&(c(0,"div",26)(1,"span",33),m(2,"error"),p(),c(3,"p",34),m(4," Upload failed. Try again. "),p()())}function mu(t,r){if(t&1&&(c(0,"div",23),V(1,cu,6,2,"div",24),V(2,pu,2,3,"div",25),V(3,uu,5,0,"div",26),c(4,"p",27),m(5),p()()),t&2){let e=d().$implicit;l(),z(e.status==="uploading"?1:-1),l(),z(e.status==="complete"?2:-1),l(),z(e.status==="error"?3:-1),l(),s("title",e.name),l(),$(" ",e.name," ")}}function hu(t,r){if(t&1&&(c(0,"div",17)(1,"span",35),m(2,"autorenew"),p(),c(3,"div",36)(4,"div",37),F(5,"div",31),p()()()),t&2){let e=d().$implicit;l(5),je("width",e.progress,"%")}}function fu(t,r){if(t&1&&(c(0,"div",18),F(1,"app-media-player",32),p()),t&2){let e=d().$implicit;l(),s("url",e.url)("type",e.type)("title",e.name)}}function gu(t,r){if(t&1){let e=P();c(0,"div",19)(1,"span",38),m(2,"error"),p(),c(3,"p",39),m(4," Upload failed. Try again. "),p(),c(5,"button",40),x("click",function(){_(e);let i=d().$implicit,o=d(2);return b(o.retryUpload(i.id))}),m(6," Retry "),p()()}}function _u(t,r){if(t&1){let e=P();c(0,"div",15),g(1,mu,6,5,"ng-template",16),V(2,hu,6,2,"div",17),V(3,fu,2,3,"div",18),V(4,gu,7,0,"div",19),c(5,"button",20),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.removeMedia(i.id))}),c(6,"span",21),m(7,"close"),p()(),c(8,"p",22),m(9),p()()}if(t&2){let e=r.$implicit;l(2),z(e.status==="uploading"?2:-1),l(),z(e.status==="complete"?3:-1),l(),z(e.status==="error"?4:-1),l(4),s("title",e.name),l(),$(" ",e.name," ")}}function bu(t,r){if(t&1){let e=P();c(0,"div",11)(1,"h4",13),m(2,"Attached Media"),p(),c(3,"div",14),x("cdkDropListDropped",function(i){_(e);let o=d();return b(o.dropMediaList(i))}),me(4,_u,10,5,"div",15,su),p()()}if(t&2){let e=d();l(4),he(e.mediaList())}}var ro=class t{http=v(Je);isDragging=Z(!1);errorMessage=Z(null);a11yMessage=Z("");mediaList=Z([]);MAX_SIZE_MB=50;MAX_SIZE_BYTES=this.MAX_SIZE_MB*1024*1024;ALLOWED_TYPES=["image/jpeg","image/png","image/gif","video/mp4","application/pdf"];onDragOver(r){r.preventDefault(),r.stopPropagation(),this.isDragging.set(!0)}onDragLeave(r){r.preventDefault(),r.stopPropagation(),this.isDragging.set(!1)}onDrop(r){r.preventDefault(),r.stopPropagation(),this.isDragging.set(!1);let e=r.dataTransfer?.files;e&&e.length>0&&this.handleFiles(Array.from(e))}onFileSelected(r){let e=r.target;e.files&&e.files.length>0&&this.handleFiles(Array.from(e.files)),e.value=""}handleFiles(r){this.errorMessage.set(null);let e=[],n=[];for(let i of r)this.ALLOWED_TYPES.includes(i.type)?i.size>this.MAX_SIZE_BYTES?e.push(`File too large: ${i.name}. Maximum size is ${this.MAX_SIZE_MB}MB.`):n.push(i):e.push(`Invalid file type: ${i.name}. Only images, videos, and audio are allowed.`);e.length>0&&(this.errorMessage.set(e.join(" ")),this.announceA11y("Some files failed to upload. "+e.join(" ")));for(let i of n)this.uploadFile(i)}uploadFile(r,e){let n=r.type.split("/")[0],i=e||crypto.randomUUID();if(e)this.mediaList.update(u=>u.map(h=>h.id===i?ue(G({},h),{status:"uploading",progress:0}):h));else{let u={id:i,url:"",name:r.name,type:n,progress:0,status:"uploading",file:r};this.mediaList.update(h=>[...h,u])}let o=new FormData;o.append("file",r);let a=`${Vi.lessonApiUrl}/api/v1/media/upload`;this.http.post(a,o,{reportProgress:!0,observe:"events"}).subscribe({next:u=>{if(u.type===Po.UploadProgress&&u.total){let h=Math.round(100*u.loaded/u.total);this.mediaList.update(f=>f.map(y=>y.id===i?ue(G({},y),{progress:h}):y))}else if(u.type===Po.Response){let h=u.body?.url||URL.createObjectURL(r);this.mediaList.update(f=>f.map(y=>y.id===i?ue(G({},y),{status:"complete",progress:100,url:h}):y)),this.announceA11y(`Upload complete: ${r.name}`)}},error:()=>{this.mediaList.update(u=>u.map(h=>h.id===i?ue(G({},h),{status:"error"}):h)),this.announceA11y(`Upload failed for ${r.name}`)}})}retryUpload(r){let e=this.mediaList().find(n=>n.id===r);e?.file&&this.uploadFile(e.file,r)}removeMedia(r){confirm("Are you sure you want to remove this media?")&&(this.mediaList.update(e=>e.filter(n=>n.id!==r)),this.announceA11y("Media removed"))}dropMediaList(r){this.mediaList.update(e=>(Vn(e,r.previousIndex,r.currentIndex),[...e]))}announceA11y(r){this.a11yMessage.set(r)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-media-upload"]],decls:18,vars:9,consts:[["fileInput",""],[1,"p-4","border-2","border-black","rounded-xl","bg-gray-50"],["aria-live","polite",1,"sr-only"],["role","button","tabindex","0",1,"border-2","border-dashed","rounded-xl","p-6","text-center","transition-colors","cursor-pointer","bg-white","focus:outline-none","focus:ring-2","focus:ring-[#0ABAB5]",3,"dragover","dragleave","drop","click","keydown.enter","keydown.space","ngClass"],[1,"material-icons","text-5xl","text-gray-400","mb-2","transition-colors"],[1,"text-black","font-bold","text-lg","tracking-tight","mb-1"],[1,"text-sm","text-gray-600","font-medium","mb-4"],["for","fileInput",1,"sr-only"],["type","file","id","fileInput","multiple","","accept","image/jpeg,image/png,image/gif,video/mp4,application/pdf","tabindex","-1",1,"sr-only",3,"change"],["type","button",1,"bg-[#0ABAB5]","text-white","px-5","py-2","rounded-lg","font-bold","border-2","border-black","hover:bg-teal-500","focus:outline-none","focus:ring-2","focus:ring-black","transition-all",3,"click","keydown.enter","keydown.space"],["role","alert",1,"mt-3","p-3","bg-red-100","text-red-900","border-2","border-red-500","rounded-lg","flex","items-center","font-bold","text-sm"],[1,"mt-5","pt-4","border-t-2","border-black/10"],[1,"material-icons","mr-2","text-red-600","text-lg"],[1,"text-sm","font-bold","text-black","tracking-tight","mb-3"],["cdkDropList","","cdkDropListOrientation","horizontal",1,"flex","flex-wrap","gap-4",3,"cdkDropListDropped"],["cdkDrag","",1,"relative","w-40","bg-white","border-2","border-black","rounded-xl","p-2","cursor-move","group","hover:-translate-y-1","transition-transform"],["cdkDragPreview",""],[1,"h-24","flex","flex-col","items-center","justify-center","bg-gray-50","rounded-lg","border-2","border-dashed","border-gray-300"],[1,"h-24","rounded-lg","overflow-hidden","relative","border","border-black/10","bg-black"],[1,"h-24","flex","flex-col","items-center","justify-center","bg-red-50","rounded-lg","border-2","border-red-300","p-2","text-center"],["aria-label","Remove media",1,"absolute","-top-2","-right-2","bg-white","text-red-500","rounded-full","w-6","h-6","flex","items-center","justify-center","border-2","border-black","opacity-0","group-hover:opacity-100","transition-opacity","hover:bg-red-50","z-10","focus:opacity-100",3,"click"],[1,"material-icons","text-sm","font-black",2,"font-size","14px"],[1,"text-xs","font-bold","text-gray-800","mt-2","truncate","text-center","px-1",3,"title"],[1,"w-40","!h-fit","!bg-white","!border-2","!border-solid","!border-black","!rounded-xl","!p-2","flex","flex-col","relative","z-50","box-border"],[1,"h-24","flex","flex-col","items-center","justify-center","!bg-gray-50","!rounded-lg","!border-2","!border-dashed","!border-gray-300"],[1,"h-24","!rounded-lg","overflow-hidden","relative","border","border-black/10","bg-black"],[1,"h-24","flex","flex-col","items-center","justify-center","!bg-red-50","!rounded-lg","!border-2","!border-solid","!border-red-300","!p-2","text-center"],[1,"text-xs","font-bold","text-gray-800","!mt-2","truncate","text-center","!px-1",3,"title"],[1,"material-icons","animate-spin","text-[#0ABAB5]","text-3xl","!mb-2"],[1,"w-full","!px-3"],[1,"h-2","!bg-white","!rounded-full","overflow-hidden","border","border-black"],[1,"h-full","bg-[#0ABAB5]","transition-all","duration-200"],[3,"url","type","title"],[1,"material-icons","text-red-500","!mb-1"],[1,"text-[10px]","text-red-700","font-bold","leading-tight","!mb-1"],[1,"material-icons","animate-spin","text-[#0ABAB5]","text-3xl","mb-2"],[1,"w-full","px-3"],[1,"h-2","bg-white","rounded-full","overflow-hidden","border","border-black"],[1,"material-icons","text-red-500","mb-1"],[1,"text-[10px]","text-red-700","font-bold","leading-tight","mb-1"],[1,"text-xs","bg-red-100","border","border-red-500","text-red-700","px-2","py-1","rounded","font-bold","hover:bg-red-200","focus:ring-2","focus:ring-red-500","cursor-pointer",3,"click"]],template:function(e,n){if(e&1){let i=P();c(0,"div",1)(1,"div",2),m(2),p(),c(3,"div",3),x("dragover",function(a){return n.onDragOver(a)})("dragleave",function(a){return n.onDragLeave(a)})("drop",function(a){return n.onDrop(a)})("click",function(){_(i);let a=Se(13);return b(a.click())})("keydown.enter",function(){_(i);let a=Se(13);return b(a.click())})("keydown.space",function(a){return _(i),Se(13).click(),b(a.preventDefault())}),c(4,"span",4),m(5,"cloud_upload"),p(),c(6,"p",5),m(7,"Drag and drop media here"),p(),c(8,"p",6),m(9,"Images, Video, or Audio (Max 50MB)"),p(),c(10,"label",7),m(11,"Browse files"),p(),c(12,"input",8,0),x("change",function(a){return n.onFileSelected(a)}),p(),c(14,"button",9),x("click",function(){_(i);let a=Se(13);return b(a.click())})("keydown.enter",function(a){return _(i),Se(13).click(),b(a.stopPropagation())})("keydown.space",function(a){return _(i),Se(13).click(),a.preventDefault(),b(a.stopPropagation())}),m(15," Browse files "),p()(),V(16,du,4,1,"div",10),V(17,bu,6,0,"div",11),p()}e&2&&(l(2),$(" ",n.a11yMessage()," "),l(),s("ngClass",Pe(6,lu,n.isDragging(),!n.isDragging())),l(),bt("text-[#0ABAB5]",n.isDragging()),l(12),z(n.errorMessage()?16:-1),l(),z(n.mediaList().length>0?17:-1))},dependencies:[te,at,Zi,qn,zn,Yi,aa],styles:[".cdk-drag-preview{box-shadow:none!important;background:transparent!important;border:none!important;border-radius:0!important}  .cdk-drag-placeholder{opacity:.3!important;border:2px dashed black!important}  .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}"]})};var ao=class t{http=v(Je);baseUrl=`${Vi.lessonApiUrl}/api/v1`;getCheckQuizQuestions(r){return this.http.get(`${this.baseUrl}/subcapitols/${r}/check-quiz/questions`)}getFinalQuizQuestions(r){return this.http.get(`${this.baseUrl}/lessons/${r}/final-quiz/questions`)}addCheckQuizQuestion(r,e){return this.http.post(`${this.baseUrl}/subcapitols/${r}/check-quiz/questions`,e)}addFinalQuizQuestion(r,e){return this.http.post(`${this.baseUrl}/lessons/${r}/final-quiz/questions`,e)}generateCheckQuizQuestions(r){return this.http.post(`${this.baseUrl}/subcapitols/${r}/check-quiz/questions/generate`,{})}generateFinalQuizQuestions(r){return this.http.post(`${this.baseUrl}/lessons/${r}/final-quiz/questions/generate`,{})}updateQuestion(r,e){return this.http.put(`${this.baseUrl}/questions/${r}`,e)}approveQuestion(r){return this.http.patch(`${this.baseUrl}/questions/${r}/approve`,{})}deleteQuestion(r){return this.http.delete(`${this.baseUrl}/questions/${r}`)}static \u0275fac=function(e){return new(e||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})};var yu={questions:[],isLoading:!1,isGeneratingAI:!1,error:null},or=Tt({providedIn:"root"},It(yu),St((t,r=v(ao),e=v(ki,{optional:!0}),n=v(Je),i=v(Yt))=>({loadQuestions:Nt(Ft(pt(({type:o,parentId:a})=>{R(t,{isLoading:!0,error:null});let u=o==="check"?r.getCheckQuizQuestions(a):r.getFinalQuizQuestions(a),h=o==="check"?n.post(`${i}/subcapitols/${a}/check-quiz`,{}):n.post(`${i}/lessons/${a}/final-quiz`,{passThreshold:50,mandatory:!1,maxAttempts:3});return u.pipe(ct(f=>f.status===404?h.pipe(pt(()=>$e([])),ct(y=>ko(()=>y))):ko(()=>f)),At({next:f=>R(t,{questions:f,isLoading:!1}),error:f=>{let y=f.error?.error||"Failed to load questions.";R(t,{error:y,isLoading:!1}),e?.add({severity:"error",summary:"Error",detail:y})}}))}))),generateAI:Nt(Ft(pt(({type:o,parentId:a})=>(R(t,{isGeneratingAI:!0,error:null}),(o==="check"?r.generateCheckQuizQuestions(a):r.generateFinalQuizQuestions(a)).pipe(At({next:h=>{R(t,f=>({questions:[...f.questions,...h],isGeneratingAI:!1})),e?.add({severity:"success",summary:"AI Generation",detail:`Successfully generated ${h.length} questions.`})},error:h=>{let f=h.error?.error||"Failed to generate questions. Ensure your lesson has text content.";R(t,{error:f,isGeneratingAI:!1}),e?.add({severity:"error",summary:"AI Error",detail:f})}})))))),addQuestion:Nt(Ft(pt(({type:o,parentId:a,payload:u})=>(R(t,{isLoading:!0,error:null}),(o==="check"?r.addCheckQuizQuestion(a,u):r.addFinalQuizQuestion(a,u)).pipe(At({next:f=>{R(t,y=>({questions:[...y.questions,f],isLoading:!1})),e?.add({severity:"success",summary:"Success",detail:"Question added successfully."})},error:f=>{let y=f.error?.error||"Failed to add question.";R(t,{error:y,isLoading:!1}),e?.add({severity:"error",summary:"Error",detail:y})}})))))),updateQuestion:Nt(Ft(pt(({id:o,payload:a})=>(R(t,{isLoading:!0,error:null}),n.put(`${i}/questions/${o}`,a).pipe(At({next:u=>{R(t,h=>({questions:h.questions.map(f=>f.id===o?u:f),isLoading:!1})),e?.add({severity:"success",summary:"Updated",detail:"Question updated successfully."})},error:u=>{let h=u.error?.error||"Failed to update question.";R(t,{error:h,isLoading:!1}),e?.add({severity:"error",summary:"Error",detail:h})}})))))),deleteQuestion:Nt(Ft(pt(o=>(R(t,{isLoading:!0,error:null}),r.deleteQuestion(o).pipe(At({next:()=>{R(t,a=>({questions:a.questions.filter(u=>u.id!==o),isLoading:!1})),e?.add({severity:"success",summary:"Deleted",detail:"Question removed."})},error:a=>{let u=a.error?.error||"Failed to delete question.";R(t,{error:u,isLoading:!1}),e?.add({severity:"error",summary:"Error",detail:u})}})))))),approveQuestion:Nt(Ft(pt(o=>(R(t,{isLoading:!0,error:null}),r.approveQuestion(o).pipe(At({next:()=>{R(t,a=>({questions:a.questions.map(u=>u.id===o?ue(G({},u),{status:"APPROVED"}):u),isLoading:!1})),e?.add({severity:"success",summary:"Approved",detail:"Question approved for students."})},error:a=>{let u=a.error?.error||"Failed to approve question.";R(t,{error:u,isLoading:!1}),e?.add({severity:"error",summary:"Error",detail:u})}}))))))})));var Nl=(t,r)=>r.id;function vu(t,r){t&1&&(c(0,"span",11),m(1,"autorenew"),p(),m(2," Generating... "))}function xu(t,r){t&1&&(c(0,"span",12),m(1,"auto_awesome"),p(),m(2," AI Generate "))}function Cu(t,r){t&1&&(c(0,"div",8)(1,"span",13),m(2,"autorenew"),p()())}function wu(t,r){t&1&&(c(0,"span",18)(1,"span",27),m(2,"pending"),p(),m(3," Needs Approval "),p())}function ku(t,r){t&1&&(c(0,"span",19)(1,"span",27),m(2,"verified"),p(),m(3," Approved "),p())}function Tu(t,r){if(t&1&&(c(0,"div",28)(1,"span",29),m(2),p(),c(3,"span",30),m(4),p()()),t&2){let e=r.$implicit,n=d(2).$implicit;bt("text-[#0ABAB5]",e.correct||e.optionText===n.correctAnswer)("font-black",e.correct||e.optionText===n.correctAnswer)("font-medium",!(e.correct||e.optionText===n.correctAnswer)),l(),bt("text-[#0ABAB5]",e.correct||e.optionText===n.correctAnswer)("text-gray-300",!(e.correct||e.optionText===n.correctAnswer)),l(),$(" ",e.correct||e.optionText===n.correctAnswer?"check_circle":"radio_button_unchecked"," "),l(2),Q(e.optionText)}}function Su(t,r){if(t&1){let e=P();c(0,"button",31),x("click",function(){_(e);let i=d(2).$implicit,o=d();return b(o.toggleApprove(i.id))}),c(1,"span",6),m(2,"thumb_up"),p(),m(3," Approve "),p()}}function Iu(t,r){if(t&1){let e=P();c(0,"div",14)(1,"div",15)(2,"div",16)(3,"span",17),m(4),p(),V(5,wu,4,0,"span",18)(6,ku,4,0,"span",19),p(),c(7,"p",20),m(8),p(),c(9,"div",21),me(10,Tu,5,12,"div",22,Nl),p()(),c(12,"div",23),V(13,Su,4,0,"button",24),c(14,"button",25),x("click",function(){_(e);let i=d().$implicit,o=d();return b(o.startEditing(i))}),c(15,"span",6),m(16,"edit"),p(),m(17," Edit "),p(),c(18,"button",26),x("click",function(){_(e);let i=d().$implicit,o=d();return b(o.deleteQuestion(i.id))}),c(19,"span",6),m(20,"delete"),p(),m(21," Delete "),p()()()}if(t&2){let e=d(),n=e.$implicit,i=e.$index;l(4),$(" Q",i+1," "),l(),z(n.status==="PENDING"?5:n.status==="APPROVED"?6:-1),l(3),$(" ",n.questionText," "),l(2),he(n.options),l(3),z(n.status==="PENDING"?13:-1)}}function Eu(t,r){t&1&&U(0)}function Du(t,r){if(t&1&&g(0,Eu,1,0,"ng-container",32),t&2){d(2);let e=Se(19);s("ngTemplateOutlet",e)}}function Mu(t,r){if(t&1&&V(0,Iu,22,4,"div",14)(1,Du,1,1,"ng-container"),t&2){let e=r.$implicit,n=d();z(n.editingId()!==e.id?0:1)}}function Lu(t,r){t&1&&(c(0,"div",10)(1,"div",33)(2,"span",34),m(3,"quiz"),p()(),c(4,"p",35),m(5,"No questions yet"),p(),c(6,"p",36),m(7," Add one manually or let AI generate them from your text blocks. "),p()())}function Pu(t,r){t&1&&U(0)}function Fu(t,r){if(t&1&&g(0,Pu,1,0,"ng-container",32),t&2){d();let e=Se(19);s("ngTemplateOutlet",e)}}function Ru(t,r){if(t&1){let e=P();c(0,"button",55),x("click",function(){_(e);let i=d().$index,o=d(2);return b(o.removeOption(i))}),c(1,"span",56),m(2,"close"),p()()}}function Bu(t,r){if(t&1){let e=P();c(0,"div",47)(1,"input",52),x("change",function(){let i=_(e).$index,o=d(2);return b(o.setCorrectOption(i))}),p(),c(2,"input",53),xt("ngModelChange",function(i){let o=_(e).$implicit;return vt(o.text,i)||(o.text=i),b(i)}),p(),V(3,Ru,3,0,"button",54),p()}if(t&2){let e=r.$implicit,n=r.$index,i=d(2);l(),s("checked",e.isCorrect),l(),yt("ngModel",e.text),s("placeholder","Option "+(n+1)),l(),z(i.newOptions().length>2?3:-1)}}function Ou(t,r){if(t&1){let e=P();c(0,"button",57),x("click",function(){_(e);let i=d(2);return b(i.addOption())}),c(1,"span",58),m(2,"add_circle"),p(),m(3," Add another option "),p()}}function Vu(t,r){if(t&1){let e=P();c(0,"div",37)(1,"div",38)(2,"span",39),m(3,"edit_note"),p(),m(4),p(),c(5,"label",40)(6,"span",41),m(7,"Question Text "),c(8,"span",42),m(9,"*"),p()(),c(10,"textarea",43),xt("ngModelChange",function(i){_(e);let o=d();return vt(o.newQuestionText,i)||(o.newQuestionText=i),b(i)}),p()(),c(11,"div",44)(12,"span",45),m(13,"Options & Correct Answer "),c(14,"span",42),m(15,"*"),p()(),c(16,"div",46),me(17,Bu,4,4,"div",47,Ir),p(),V(19,Ou,4,0,"button",48),p(),c(20,"div",49)(21,"button",50),x("click",function(){_(e);let i=d();return b(i.cancelForm())}),m(22," Cancel "),p(),c(23,"button",51),x("click",function(){_(e);let i=d();return b(i.submitQuestion())}),m(24),p()()()}if(t&2){let e=d();bt("mt-8",e.isAdding()),l(4),$(" ",e.editingId()?"Edit Question":"Add New Question"," "),l(6),yt("ngModel",e.newQuestionText),l(7),he(e.newOptions()),l(2),z(e.newOptions().length<5?19:-1),l(5),$(" ",e.editingId()?"Update Question":"Save Question"," ")}}var lo=class t{quizType;parentId;store=v(or);isAdding=Z(!1);editingId=Z(null);newQuestionText=Z("");newOptions=Z([{text:"",isCorrect:!0},{text:"",isCorrect:!1},{text:"",isCorrect:!1}]);ngOnInit(){this.store.loadQuestions({type:this.quizType,parentId:this.parentId})}generateAI(){this.store.generateAI({type:this.quizType,parentId:this.parentId})}deleteQuestion(r){confirm("Are you sure you want to delete this question?")&&this.store.deleteQuestion(r)}toggleApprove(r){this.store.approveQuestion(r)}startAdding(){this.editingId.set(null),this.resetForm(),this.isAdding.set(!0)}startEditing(r){this.isAdding.set(!1),this.editingId.set(r.id),this.newQuestionText.set(r.questionText);let e=r.options.map(n=>({text:n.optionText,isCorrect:n.correct||n.optionText===r.correctAnswer}));for(;e.length<2;)e.push({text:"",isCorrect:!1});this.newOptions.set(e)}setCorrectOption(r){this.newOptions.update(e=>e.map((n,i)=>ue(G({},n),{isCorrect:i===r})))}addOption(){this.newOptions.update(r=>[...r,{text:"",isCorrect:!1}])}removeOption(r){this.newOptions.update(e=>e.filter((n,i)=>i!==r))}cancelForm(){this.isAdding.set(!1),this.editingId.set(null),this.resetForm()}submitQuestion(){let r=this.newQuestionText().trim(),e=this.newOptions().filter(a=>a.text.trim()!==""),n=e.find(a=>a.isCorrect);if(!r){alert("Please enter a question text.");return}if(e.length<2){alert("Please provide at least 2 valid options.");return}if(!n){alert("Please select a correct answer.");return}let i={questionText:r,questionType:"MULTIPLE_CHOICE",correctAnswer:n.text.trim(),options:e.map(a=>({optionText:a.text.trim(),correct:a.isCorrect}))},o=this.editingId();o?this.store.updateQuestion({id:o,payload:i}):this.store.addQuestion({type:this.quizType,parentId:this.parentId,payload:i}),this.cancelForm()}resetForm(){this.newQuestionText.set(""),this.newOptions.set([{text:"",isCorrect:!0},{text:"",isCorrect:!1},{text:"",isCorrect:!1}])}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-question-manager"]],inputs:{quizType:"quizType",parentId:"parentId"},features:[le([or])],decls:20,vars:7,consts:[["editorForm",""],[1,"p-1","sm:p-2"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","mb-6","gap-4"],[1,"text-xl","sm:text-2xl","font-black","text-black"],[1,"flex","flex-col","sm:flex-row","w-full","md:w-auto","gap-3"],[1,"w-full","sm:w-auto","justify-center","bg-white","text-black","px-4","py-2","rounded-xl","font-bold","border-2","border-black","hover:bg-gray-100","disabled:opacity-50","transition-all","flex","items-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none",3,"click","disabled"],[1,"material-icons","mr-1","text-[18px]"],[1,"w-full","sm:w-auto","justify-center","bg-[#0ABAB5]","text-white","px-4","py-2","rounded-xl","font-bold","border-2","border-black","hover:bg-[#099994]","disabled:opacity-50","transition-all","flex","items-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none",3,"click","disabled"],[1,"flex","justify-center","p-8"],[1,"space-y-4"],[1,"text-center","p-6","sm:p-10","border-2","border-dashed","border-gray-400","rounded-2xl","bg-gray-50"],[1,"material-icons","animate-spin","mr-2","text-[18px]"],[1,"material-icons","mr-2","text-[18px]"],[1,"material-icons","animate-spin","text-4xl","text-black"],[1,"bg-white","border-2","border-black","rounded-2xl","p-4","sm:p-5","flex","flex-col","lg:flex-row","gap-4","justify-between","items-start","shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"],[1,"flex-1","w-full"],[1,"flex","flex-wrap","items-center","gap-2","mb-3"],[1,"text-xs","font-black","bg-gray-100","px-3","border-2","border-black","rounded-md","flex","items-center","justify-center","h-7","shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"],[1,"text-[10px]","font-black","uppercase","tracking-wide","bg-[#FFD700]","text-black","px-2","border-2","border-black","flex","items-center","h-7","rounded-md","shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"],[1,"text-[10px]","font-black","uppercase","tracking-wide","bg-[#00FF7F]","text-black","px-2","border-2","border-black","flex","items-center","h-7","rounded-md","shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"],[1,"font-black","text-base","sm:text-lg","text-black","mb-3","break-words"],[1,"space-y-2","sm:space-y-1"],[1,"flex","items-start","sm:items-center","text-sm",3,"text-[#0ABAB5]","font-black","font-medium"],[1,"flex","flex-col","sm:flex-row","lg:flex-col","gap-2","shrink-0","mt-3","lg:mt-0","w-full","lg:w-auto"],[1,"w-full","lg:w-auto","px-3","py-2","border-2","border-black","bg-[#00FF7F]","text-black","text-sm","font-black","uppercase","rounded-xl","hover:bg-[#00E673]","flex","items-center","justify-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none","transition-all"],[1,"w-full","lg:w-auto","px-3","py-2","border-2","border-black","bg-white","text-black","text-sm","font-black","uppercase","rounded-xl","hover:bg-gray-100","flex","items-center","justify-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none","transition-all",3,"click"],[1,"w-full","lg:w-auto","px-3","py-2","border-2","border-black","bg-black","text-white","text-sm","font-black","uppercase","rounded-xl","hover:bg-gray-800","flex","items-center","justify-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none","transition-all",3,"click"],[1,"material-icons","text-[14px]","mr-1"],[1,"flex","items-start","sm:items-center","text-sm"],[1,"material-icons","text-[18px]","mr-2","shrink-0","mt-0.5","sm:mt-0"],[1,"break-words"],[1,"w-full","lg:w-auto","px-3","py-2","border-2","border-black","bg-[#00FF7F]","text-black","text-sm","font-black","uppercase","rounded-xl","hover:bg-[#00E673]","flex","items-center","justify-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none","transition-all",3,"click"],[4,"ngTemplateOutlet"],[1,"w-16","h-16","bg-white","border-2","border-black","rounded-xl","flex","items-center","justify-center","mx-auto","mb-4","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"],[1,"material-icons","text-4xl","text-[#0ABAB5]"],[1,"text-black","font-black","text-xl","mb-1"],[1,"text-gray-600","font-bold","text-sm"],[1,"bg-gray-50","border-2","border-black","rounded-2xl","p-4","sm:p-6","shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"],[1,"font-black","text-lg","sm:text-xl","text-black","mb-6","flex","items-center"],[1,"material-icons","mr-2","text-[#0ABAB5]","text-2xl"],[1,"block","mb-5"],[1,"text-xs","font-black","text-black","block","mb-2","uppercase","tracking-wider"],[1,"text-[#0ABAB5]"],["rows","3","placeholder","e.g. What is the capital of France?",1,"w-full","px-3","py-2","border-2","border-black","rounded-xl","font-bold","text-sm","sm:text-base","resize-none","focus:ring-2","focus:ring-[#0ABAB5]/30","outline-none","transition-all",3,"ngModelChange","ngModel"],[1,"mb-6"],[1,"text-xs","font-black","text-black","block","mb-3","uppercase","tracking-wider"],[1,"space-y-3"],[1,"flex","items-center","gap-2"],[1,"mt-4","text-xs","font-black","text-black","hover:text-[#0ABAB5]","flex","items-center","uppercase","tracking-wide","transition-colors"],[1,"flex","flex-col","sm:flex-row","justify-end","gap-3","mt-6","pt-5","border-t-2","border-black","w-full"],[1,"w-full","sm:w-auto","px-6","py-3","sm:py-2","font-black","text-black","uppercase","tracking-wide","hover:bg-gray-200","border-2","border-transparent","hover:border-black","rounded-xl","transition-all","text-sm",3,"click"],[1,"w-full","sm:w-auto","justify-center","flex","items-center","px-6","py-3","sm:py-2","bg-[#0ABAB5]","text-white","font-black","uppercase","tracking-wide","border-2","border-black","rounded-xl","hover:bg-[#099994]","transition-all","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]","hover:translate-y-[1px]","hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]","active:translate-y-[2px]","active:shadow-none","text-sm",3,"click"],["type","radio","name","correctAnswerGroup","title","Mark as correct answer",1,"w-5","h-5","text-[#0ABAB5]","border-2","border-black","focus:ring-[#0ABAB5]","cursor-pointer","shrink-0",3,"change","checked"],["type","text",1,"flex-1","min-w-[100px]","px-3","py-2","border-2","border-black","rounded-xl","font-bold","text-sm","focus:ring-2","focus:ring-[#0ABAB5]/30","outline-none","transition-all",3,"ngModelChange","ngModel","placeholder"],[1,"w-10","h-10","sm:w-11","sm:h-11","shrink-0","flex","items-center","justify-center","text-white","bg-black","border-2","border-black","rounded-xl","hover:bg-gray-800","transition-all"],[1,"w-10","h-10","sm:w-11","sm:h-11","shrink-0","flex","items-center","justify-center","text-white","bg-black","border-2","border-black","rounded-xl","hover:bg-gray-800","transition-all",3,"click"],[1,"material-icons","text-[20px]"],[1,"mt-4","text-xs","font-black","text-black","hover:text-[#0ABAB5]","flex","items-center","uppercase","tracking-wide","transition-colors",3,"click"],[1,"material-icons","text-lg","mr-1"]],template:function(e,n){e&1&&(c(0,"div",1)(1,"div",2)(2,"div",3),m(3),p(),c(4,"div",4)(5,"button",5),x("click",function(){return n.startAdding()}),c(6,"span",6),m(7,"add"),p(),m(8," Add Manual "),p(),c(9,"button",7),x("click",function(){return n.generateAI()}),V(10,vu,3,0)(11,xu,3,0),p()()(),V(12,Cu,3,0,"div",8),c(13,"div",9),me(14,Mu,2,1,null,null,Nl),V(16,Lu,8,0,"div",10),p(),V(17,Fu,1,1,"ng-container"),p(),g(18,Vu,25,6,"ng-template",null,0,Ie)),e&2&&(l(3),$(" ",n.quizType==="check"?"Check Quiz Questions":"Final Quiz Questions"," "),l(2),s("disabled",n.isAdding()||n.editingId()!==null||n.store.isGeneratingAI()),l(4),s("disabled",n.isAdding()||n.editingId()!==null||n.store.isGeneratingAI()),l(),z(n.store.isGeneratingAI()?10:11),l(2),z(n.store.isLoading()&&n.store.questions().length===0?12:-1),l(2),he(n.store.questions()),l(2),z(!n.store.isLoading()&&n.store.questions().length===0&&!n.isAdding()&&!n.editingId()?16:-1),l(),z(n.isAdding()?17:-1))},dependencies:[te,Le,tt,ft,et,st],encapsulation:2})};var zu=()=>({position:"fixed",top:"20px",right:"20px","z-index":"99999"}),qu=()=>({width:"95vw",maxWidth:"1000px"}),Au=()=>({height:"180px"}),Nu=(t,r)=>r.id;function Hu(t,r){t&1&&m(0," Saving\u2026 ")}function $u(t,r){t&1&&m(0," Saved \u2713 ")}function ju(t,r){t&1&&m(0," Unsaved changes ")}function Uu(t,r){t&1&&m(0," Auto-save failed \u2014 manual save required ")}function Qu(t,r){t&1&&m(0," Save failed ")}function Gu(t,r){if(t&1&&V(0,Uu,1,0)(1,Qu,1,0),t&2){let e=d();z(e.autoSaveFailed()?0:1)}}function Wu(t,r){t&1&&m(0," Ready ")}function Ku(t,r){if(t&1){let e=P();c(0,"div",7)(1,"app-button",30),x("btnClick",function(){_(e);let i=d();return b(i.onUnpublish())}),m(2,"Unpublish"),p()()}}function Yu(t,r){if(t&1){let e=P();c(0,"div",7)(1,"app-button",31),x("btnClick",function(){_(e);let i=d();return b(i.onPublishClicked())}),m(2,"Publish"),p()()}if(t&2){let e=d();l(),s("disabled",!e.store.canPublish())}}function Zu(t,r){if(t&1&&(c(0,"option",17),m(1),p()),t&2){let e=r.$implicit;s("value",e),l(),Q(e)}}function Xu(t,r){if(t&1&&(c(0,"option",17),m(1),p()),t&2){let e=r.$implicit;s("value",e),l(),Q(e)}}function Ju(t,r){t&1&&(c(0,"p",22),m(1,"No modules yet. Add one to get started."),p())}function em(t,r){if(t&1&&(c(0,"div",41)(1,"div",42)(2,"span",43),m(3,"drag_indicator"),p()(),c(4,"div",44),m(5),p(),c(6,"div",45),m(7),c(8,"span",46),m(9,"arrow_drop_down"),p()(),c(10,"div",47)(11,"span",43),m(12),p()(),c(13,"div",48)(14,"span",43),m(15,"delete"),p()()()),t&2){let e=d().$implicit,n=d();l(5),$(" ",e.title||"Module Title"," "),l(2),$(" ",e.type," "),l(5),Q(n.isCollapsed(e.id)?"expand_more":"expand_less")}}function tm(t,r){if(t&1&&(c(0,"option",17),m(1),p()),t&2){let e=r.$implicit;s("value",e),l(),Q(e)}}function nm(t,r){if(t&1){let e=P();c(0,"div",40)(1,"p-editor",49),x("ngModelChange",function(i){_(e);let o=d().$implicit,a=d();return b(a.onModuleContentChange(o.id,i))})("onBlur",function(){_(e);let i=d(2);return b(i.onModuleBlur())}),p(),c(2,"div",50),F(3,"app-media-upload"),p(),c(4,"div",51)(5,"div",52)(6,"div",53)(7,"span",54),m(8,"fact_check"),p()(),c(9,"div")(10,"p",55),m(11," Module Check Quiz "),p(),c(12,"p",56),m(13," Add quick questions to test student focus. "),p()()(),c(14,"div",7)(15,"app-button",57),x("btnClick",function(){_(e);let i=d().$implicit,o=d();return b(o.openCheckQuiz(i.id))}),m(16," Manage Questions "),p()()()()}if(t&2){let e=d().$implicit;l(),Ae(Ct(3,Au)),s("ngModel",e.content)}}function im(t,r){if(t&1){let e=P();c(0,"li",24),g(1,em,16,3,"ng-template",32),c(2,"div",33)(3,"button",34)(4,"span",35),m(5,"drag_indicator"),p()(),c(6,"input",36),x("input",function(i){let o=_(e).$implicit,a=d();return b(a.onModuleTitleChange(o.id,i))}),p(),c(7,"select",37),x("change",function(i){let o=_(e).$implicit,a=d();return b(a.onModuleTypeChange(o.id,i))}),me(8,tm,2,2,"option",17,ln),p(),c(10,"button",38),x("click",function(){let i=_(e).$implicit,o=d();return b(o.toggleCollapsed(i.id))}),c(11,"span",35),m(12),p()(),c(13,"button",39),x("click",function(){let i=_(e).$implicit,o=d();return b(o.confirmRemove(i.id))}),c(14,"span",35),m(15,"delete"),p()()(),V(16,nm,17,4,"div",40),p()}if(t&2){let e=r.$implicit,n=d();l(),s("matchSize",!0),l(5),s("value",e.title),l(),s("value",e.type),l(),he(n.moduleTypes),l(4),Q(n.isCollapsed(e.id)?"expand_more":"expand_less"),l(4),z(n.isCollapsed(e.id)?-1:16)}}function om(t,r){if(t&1&&(c(0,"app-card",27),F(1,"app-question-manager",58),p()),t&2){let e=d();l(),s("parentId",e.store.lesson().id)}}function rm(t,r){if(t&1&&F(0,"app-question-manager",29),t&2){let e=d();s("parentId",e.activeCheckQuizModuleId())}}var am=["Math","Science","History","English","Geography","Art","Music"],lm=["BEGINNER","INTERMEDIATE","ADVANCED"],sm=["text","video","image","audio","quiz","interactive"],dm=3e4,pi=class t{store=v(Al);fb=v(Mi);route=v(En);router=v(Dn);destroy$=new Ce;autoSave$=new Ce;activeCheckQuizModuleId=Z(null);subjectOptions=am;difficultyOptions=lm;moduleTypes=sm;modules=J(()=>this.store.lesson().modules);isEditRoute=Z(!1);saveButtonLabel=J(()=>this.isEditRoute()||this.store.lesson().id?"Save Edit":"Save Draft");autoSaveFailed=Z(!1);metaForm=this.fb.nonNullable.group({title:["",[Ln.required]],subject:["",[Ln.required]],difficulty_level:["BEGINNER",[Ln.required]],short_description:[""]});collapsed=new Set;syncing=!1;autoSaveInFlight=!1;hasUnsavedChanges(){return this.store.isDirty()}constructor(){Xe(()=>{let r=this.store.lesson();if(!this.syncing){let e=this.metaForm.value;(e.title!==r.title||e.short_description!==r.short_description)&&(this.syncing=!0,this.metaForm.patchValue({title:r.title||"",subject:r.subject||"",difficulty_level:r.difficulty_level||"BEGINNER",short_description:r.short_description||""},{emitEvent:!1}),this.syncing=!1)}}),Xe(()=>{let r=this.store.saveState();r==="error"&&this.autoSaveInFlight?(this.autoSaveFailed.set(!0),this.autoSaveInFlight=!1):(r==="saved"||r==="saving")&&this.autoSaveFailed.set(!1)})}ngOnInit(){let r=this.route.snapshot.paramMap.get("id");this.store.reset(),this.isEditRoute.set(!!r),r&&this.store.loadLesson(r),this.metaForm.valueChanges.pipe(Rt(this.destroy$)).subscribe(e=>{if(this.syncing)return;let n=e;this.store.updateMetadata({title:n.title??"",subject:n.subject??"",difficulty_level:n.difficulty_level??"BEGINNER",short_description:n.short_description??""}),this.autoSave$.next()}),this.autoSave$.pipe(_i(dm),Rt(this.destroy$)).subscribe(()=>{this.store.saveState()==="unsaved"&&(this.autoSaveInFlight=!0,this.store.save(()=>{this.autoSaveInFlight=!1,this.autoSaveFailed.set(!1)}))})}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}onModuleBlur(){this.store.save()}onAddModule(){this.store.addModule(),this.autoSave$.next()}confirmRemove(r){globalThis.confirm("Delete this module? This cannot be undone.")&&(this.store.removeModule(r),this.autoSave$.next())}onModuleTitleChange(r,e){this.store.updateModule(r,{title:e.target.value}),this.autoSave$.next()}onModuleTypeChange(r,e){this.store.updateModule(r,{type:e.target.value}),this.autoSave$.next()}onModuleContentChange(r,e){this.store.updateModule(r,{content:e??""}),this.autoSave$.next()}onModuleDrop(r){r.previousIndex!==r.currentIndex&&(this.store.reorderModules(r.previousIndex,r.currentIndex),this.autoSave$.next())}toggleCollapsed(r){this.collapsed.has(r)?this.collapsed.delete(r):this.collapsed.add(r)}isCollapsed(r){return this.collapsed.has(r)}onSaveDraft(){let r=!this.store.lesson().id;this.autoSaveFailed.set(!1),this.store.save(e=>{r&&e.id&&(this.isEditRoute.set(!0),this.router.navigate(["/teacher/lessons",e.id,"edit"],{replaceUrl:!0}))})}onPublishClicked(){if(!this.store.canPublish()){this.metaForm.markAllAsTouched();return}globalThis.confirm("Publish this lesson? Students will be able to see it.")&&this.store.publish()}onUnpublish(){globalThis.confirm("Unpublish this lesson?")&&this.store.unpublish()}openCheckQuiz(r){if(r.startsWith("module-")||!this.store.lesson().id){alert("Please save the lesson draft first before managing quiz questions for this module."),this.store.save();return}this.activeCheckQuizModuleId.set(r)}closeCheckQuiz(){this.activeCheckQuizModuleId.set(null)}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-lesson-editor"]],decls:61,vars:19,consts:[["position","top-right"],[1,"p-4","sm:p-6","lg:p-8","max-w-[1440px]","mx-auto","space-y-6"],[1,"flex","flex-col","lg:flex-row","justify-between","items-start","lg:items-center","gap-4","bg-white","p-5","sm:p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],[1,"w-full","lg:w-auto"],[1,"text-2xl","sm:text-3xl","font-black","tracking-tight","break-words"],["data-testid","status-indicator",1,"text-gray-600","font-medium"],[1,"flex","flex-col","sm:flex-row","w-full","lg:w-auto","gap-3"],[1,"w-full","sm:w-auto","flex","flex-col"],["variant","secondary","icon","save",3,"btnClick","disabled"],["header","Lesson Details"],[1,"grid","grid-cols-1","lg:grid-cols-2","gap-4",3,"formGroup"],[1,"flex","flex-col","text-sm","font-bold","col-span-1"],[1,"mb-1"],["aria-hidden","true"],["formControlName","title","placeholder","e.g. Intro to Fractions",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium"],["formControlName","subject",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium","bg-white"],["value",""],[3,"value"],["formControlName","difficulty_level",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium","bg-white"],[1,"flex","flex-col","text-sm","font-bold","col-span-1","lg:col-span-2"],["formControlName","short_description","rows","3",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium"],["header","Modules"],[1,"text-gray-600"],["cdkDropList","",1,"space-y-4",3,"cdkDropListDropped"],["cdkDrag","",1,"border-2","border-black","rounded-2xl","bg-gray-50","overflow-hidden"],[1,"mt-4","flex","flex-col","sm:inline-flex"],["variant","secondary","icon","add",3,"btnClick"],["header","Final Quiz Management"],["header","Manage Check Quiz",3,"visibleChange","visible","modal","draggable","resizable"],["quizType","check",3,"parentId"],["variant","secondary","icon","cloud_off",3,"btnClick"],["variant","primary","icon","cloud_upload",3,"btnClick","disabled"],["cdkDragPreview","",3,"matchSize"],[1,"flex","flex-wrap","md:flex-nowrap","items-center","gap-2","sm:gap-3","p-3","bg-white","border-b-2","border-black"],["type","button","cdkDragHandle","",1,"cursor-grab","p-2","rounded-lg","border-2","border-black","bg-white","hover:bg-gray-100","shrink-0","flex","items-center","justify-center"],["aria-hidden","true",1,"material-icons"],["type","text","placeholder","Module Title",1,"flex-1","min-w-[120px]","px-2","py-1","border-2","border-black","rounded-lg","font-bold","outline-none","focus:ring-2","focus:ring-[#0ABAB5]",3,"input","value"],[1,"px-2","py-1","border-2","border-black","rounded-lg","font-bold","bg-white","shrink-0","outline-none","focus:ring-2","focus:ring-[#0ABAB5]",3,"change","value"],["type","button",1,"p-2","rounded-lg","border-2","border-black","bg-white","hover:bg-gray-100","shrink-0","flex","items-center","justify-center",3,"click"],["type","button",1,"p-2","rounded-lg","border-2","border-red-700","bg-red-500","text-white","hover:bg-red-600","shrink-0","flex","items-center","justify-center",3,"click"],[1,"p-3","sm:p-4","space-y-3"],[1,"w-full","!h-fit","!bg-white","!border-2","!border-solid","!border-black","!rounded-2xl","flex","flex-wrap","md:flex-nowrap","items-center","gap-2","sm:gap-3","!p-3","relative","z-50","box-border"],[1,"!p-2","!rounded-lg","!border-2","!border-solid","!border-black","!bg-gray-100","shrink-0","flex","items-center","justify-center"],[1,"material-icons"],[1,"flex-1","min-w-[120px]","!px-2","!py-1","!border-2","!border-solid","!border-black","!rounded-lg","font-bold","!bg-white","text-black","opacity-70","truncate"],[1,"!px-2","!py-1","!border-2","!border-solid","!border-black","!rounded-lg","font-bold","!bg-white","shrink-0","text-black","flex","items-center"],[1,"material-icons","text-sm","align-middle","ml-1"],[1,"!p-2","!rounded-lg","!border-2","!border-solid","!border-black","!bg-white","shrink-0","flex","items-center","justify-center"],[1,"!p-2","!rounded-lg","!border-2","!border-solid","!border-red-700","!bg-red-500","text-white","shrink-0","flex","items-center","justify-center"],[3,"ngModelChange","onBlur","ngModel"],[1,"mt-4","w-full"],[1,"mt-4","w-full","bg-gray-50","p-4","border-2","border-black","rounded-xl","flex","flex-col","sm:flex-row","items-start","sm:items-center","justify-between","gap-4"],[1,"flex","flex-col","sm:flex-row","items-start","sm:items-center","gap-3","w-full","sm:w-auto"],[1,"w-12","h-12","shrink-0","bg-white","border-2","border-black","rounded-lg","flex","items-center","justify-center","shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"],[1,"material-icons","text-[#0ABAB5]","text-2xl"],[1,"text-base","sm:text-lg","font-black","text-black","leading-tight"],[1,"text-xs","sm:text-sm","text-gray-600","font-bold","m-0","mt-1"],["variant","secondary","icon","edit",3,"btnClick"],["quizType","final",3,"parentId"]],template:function(e,n){if(e&1&&(F(0,"p-toast",0),c(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),m(5),p(),c(6,"p",5),V(7,Hu,1,0)(8,$u,1,0)(9,ju,1,0)(10,Gu,2,1)(11,Wu,1,0),p()(),c(12,"div",6)(13,"div",7)(14,"app-button",8),x("btnClick",function(){return n.onSaveDraft()}),m(15),p()(),V(16,Ku,3,0,"div",7)(17,Yu,3,1,"div",7),p()(),c(18,"app-card",9)(19,"form",10)(20,"label",11)(21,"span",12),m(22,"Title "),c(23,"span",13),m(24,"*"),p()(),F(25,"input",14),p(),c(26,"label",11)(27,"span",12),m(28,"Subject "),c(29,"span",13),m(30,"*"),p()(),c(31,"select",15)(32,"option",16),m(33,"Select subject\u2026"),p(),me(34,Zu,2,2,"option",17,ln),p()(),c(36,"label",11)(37,"span",12),m(38,"Difficulty Level "),c(39,"span",13),m(40,"*"),p()(),c(41,"select",18)(42,"option",16),m(43,"Select difficulty\u2026"),p(),me(44,Xu,2,2,"option",17,ln),p()(),c(46,"label",19)(47,"span",12),m(48,"Short Description (optional)"),p(),F(49,"textarea",20),p()()(),c(50,"app-card",21),V(51,Ju,2,0,"p",22),c(52,"ul",23),x("cdkDropListDropped",function(o){return n.onModuleDrop(o)}),me(53,im,17,5,"li",24,Nu),p(),c(55,"div",25)(56,"app-button",26),x("btnClick",function(){return n.onAddModule()}),m(57,"Add Module"),p()()(),V(58,om,2,1,"app-card",27),p(),c(59,"p-dialog",28),x("visibleChange",function(){return n.closeCheckQuiz()}),V(60,rm,1,1,"app-question-manager",29),p()),e&2){let i;Ae(Ct(17,zu)),l(5),$(" ",n.store.lesson().id?"Edit Lesson":"Create Lesson"," "),l(2),z((i=n.store.saveState())==="saving"?7:i==="saved"?8:i==="unsaved"?9:i==="error"?10:11),l(7),s("disabled",n.store.saveState()==="saving"),l(),$(" ",n.saveButtonLabel()," "),l(),z(n.store.lesson().status==="PUBLISHED"?16:17),l(3),s("formGroup",n.metaForm),l(15),he(n.subjectOptions),l(10),he(n.difficultyOptions),l(7),z(n.modules().length===0?51:-1),l(2),he(n.modules()),l(5),z(n.store.lesson().id?58:-1),l(),Ae(Ct(18,qu)),s("visible",!!n.activeCheckQuizModuleId())("modal",!0)("draggable",!1)("resizable",!1),l(),z(n.activeCheckQuizModuleId()?60:-1)}},dependencies:[te,tt,Si,Pn,Fn,ft,Di,et,Ti,st,Li,Ei,Ii,qn,zn,Ha,Yi,Ka,to,Vl,ir,oa,ia,Et,Zt,ro,lo],styles:[".cdk-drag-preview{box-shadow:none!important;background:transparent!important;border:none!important;border-radius:0!important}  .cdk-drag-placeholder{opacity:.2!important;border:4px dashed black!important;background:#f9fafb!important}  .cdk-drag-animating{transition:transform .25s cubic-bezier(0,0,.2,1)}.cdk-drop-list-dragging[_ngcontent-%COMP%]   .cdk-drag[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}"],changeDetection:0})};var rr=t=>t.hasUnsavedChanges()?globalThis.confirm("You have unsaved changes. Leave anyway?"):!0;var Hl=(t,r)=>r.id;function cm(t,r){if(t&1&&(c(0,"span"),m(1),p()),t&2){let e=d();l(),$(", ",e.teacherName())}}function pm(t,r){if(t&1){let e=P();c(0,"app-error-state",23),x("retryClick",function(){_(e);let i=d();return b(i.reload())}),p()}if(t&2){let e=d();s("message",e.store.error()||"Unknown error")}}function um(t,r){t&1&&F(0,"div",10)}function mm(t,r){if(t&1&&(c(0,"div",11)(1,"p",24),m(2),c(3,"span",6),m(4),p()(),c(5,"p",24),m(6),p()()),t&2){let e=d();l(2),$(" ",e.store.totalLessonsCount()," lessons "),l(2),In(" (",e.store.publishedLessonsCount()," published, ",e.store.draftLessonsCount()," drafts) "),l(2),$("",e.store.totalQuizzesCount()," quizzes")}}function hm(t,r){t&1&&F(0,"div",18)}function fm(t,r){t&1&&(c(0,"div",6),m(1,"No recent activity yet."),p())}function gm(t,r){if(t&1&&(c(0,"li",25)(1,"span",26),m(2),p(),c(3,"div",27)(4,"p",28)(5,"span",29),m(6),p(),m(7),p(),c(8,"p",30),m(9),c(10,"time"),m(11),p()()()()),t&2){let e=r.$implicit,n=d(2);l(2),Q(n.activityIcon(e.type)),l(4),Q(e.type),l(),$(" \xB7 ",e.contentTitle," "),l(2),$(" ",e.contentType," \xB7 "),l(),D("datetime",e.timestamp.toISOString()),l(),$(" ",n.formatTimestamp(e.timestamp)," ")}}function _m(t,r){if(t&1&&(c(0,"ul",19),me(1,gm,12,6,"li",25,Hl),p()),t&2){let e=d();l(),he(e.recentFive())}}function bm(t,r){t&1&&F(0,"div",21)}function ym(t,r){t&1&&(c(0,"div",6),m(1,"You don't have any classes yet."),p())}function vm(t,r){if(t&1&&(c(0,"li",31)(1,"div")(2,"p",28),m(3),p(),c(4,"p",30),m(5),p()(),c(6,"div",32)(7,"p",33),m(8,"Avg Progress"),p(),c(9,"p",34),m(10),p()()()),t&2){let e=r.$implicit;l(3),Q(e.name),l(2),$("",e.studentCount," students"),l(5),$("",e.averageProgress,"%")}}function xm(t,r){if(t&1&&(c(0,"ul",22),me(1,vm,11,3,"li",31,Hl),p()),t&2){let e=d();l(),he(e.store.classes())}}var so=class t{store=v(_n);auth=v(Jr);teacherName=J(()=>this.auth.user()?.name??"");recentFive=J(()=>this.store.recentActivity().slice(0,5));ngOnInit(){this.reload()}reload(){this.store.loadDashboard()}activityIcon(r){switch(r){case"created":return"add_circle";case"published":return"cloud_upload";case"archived":return"archive";case"deleted":return"delete";default:return"edit"}}formatTimestamp(r){let e=Date.now()-r.getTime(),n=Math.round(e/6e4);if(n<1)return"just now";if(n<60)return`${n} min ago`;let i=Math.round(n/60);return i<24?`${i} h ago`:`${Math.round(i/24)} d ago`}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-teacher-dashboard"]],decls:33,vars:5,consts:[[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-8"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4","bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],[1,"flex","items-center","space-x-4"],["aria-hidden","true",1,"w-16","h-16","bg-[#0ABAB5]/20","rounded-2xl","border-4","border-black","flex","items-center","justify-center"],[1,"material-icons","text-[#0ABAB5]","text-3xl"],[1,"text-3xl","font-black","text-black","tracking-tight"],[1,"text-gray-600","font-medium"],["title","Could not load dashboard","retryLabel","Retry",3,"message"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6"],["header","My Content",1,"block"],["role","status","aria-label","Loading content summary",1,"h-32","bg-gray-200","rounded-2xl","animate-pulse"],["data-testid","content-summary",1,"space-y-3"],["header","Quick Actions",1,"block"],[1,"grid","grid-cols-1","sm:grid-cols-3","gap-3"],["variant","primary","icon","add_circle","routerLink","/teacher/lessons/new"],["variant","secondary","icon","insights","routerLink","/teacher/analytics"],["variant","secondary","icon","menu_book","routerLink","/teacher/content"],["header","Recent Activity",1,"block"],["role","status","aria-label","Loading recent activity",1,"h-48","bg-gray-200","rounded-2xl","animate-pulse"],["data-testid","recent-activity",1,"space-y-2"],["header","Classes",1,"block"],["role","status","aria-label","Loading classes",1,"h-48","bg-gray-200","rounded-2xl","animate-pulse"],["data-testid","class-overview",1,"space-y-2"],["title","Could not load dashboard","retryLabel","Retry",3,"retryClick","message"],[1,"font-bold","text-lg"],[1,"flex","items-start","gap-3","p-3","rounded-xl","border-2","border-black","bg-gray-50"],["aria-hidden","true",1,"material-icons","text-[#0ABAB5]"],[1,"flex-1"],[1,"font-bold"],[1,"capitalize"],[1,"text-sm","text-gray-600"],[1,"flex","items-center","justify-between","p-3","rounded-xl","border-2","border-black","bg-gray-50"],[1,"text-right"],[1,"text-sm","font-bold"],[1,"text-lg","font-black","text-[#0ABAB5]"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),m(5,"school"),p()(),c(6,"div")(7,"h1",5),m(8,"Teacher Dashboard"),p(),c(9,"p",6),m(10," Welcome back"),V(11,cm,2,1,"span"),p()()()(),V(12,pm,1,1,"app-error-state",7),c(13,"div",8)(14,"app-card",9),V(15,um,1,0,"div",10)(16,mm,7,4,"div",11),p(),c(17,"app-card",12)(18,"div",13)(19,"app-button",14),m(20," Create Lesson "),p(),c(21,"app-button",15),m(22," View Analytics "),p(),c(23,"app-button",16),m(24," All Lessons "),p()()(),c(25,"app-card",17),V(26,hm,1,0,"div",18)(27,fm,2,0,"div",6)(28,_m,3,0,"ul",19),p(),c(29,"app-card",20),V(30,bm,1,0,"div",21)(31,ym,2,0,"div",6)(32,xm,3,0,"ul",22),p()()()),e&2&&(l(11),z(n.teacherName()?11:-1),l(),z(n.store.error()?12:-1),l(3),z(n.store.loading()?15:16),l(11),z(n.store.loading()?26:n.recentFive().length===0?27:28),l(4),z(n.store.loading()?30:n.store.classes().length===0?31:32))},dependencies:[te,kt,wt,Et,Zt,Oi],encapsulation:2,changeDetection:0})};var $l=`
    .p-datatable {
        position: relative;
        display: block;
    }

    .p-datatable-table {
        border-spacing: 0;
        border-collapse: separate;
        width: 100%;
    }

    .p-datatable-scrollable > .p-datatable-table-container {
        position: relative;
    }

    .p-datatable-scrollable-table > .p-datatable-thead {
        inset-block-start: 0;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-frozen-tbody {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-scrollable-table > .p-datatable-tfoot {
        inset-block-end: 0;
        z-index: 1;
    }

    .p-datatable-scrollable .p-datatable-frozen-column {
        position: sticky;
    }

    .p-datatable-scrollable th.p-datatable-frozen-column {
        z-index: 1;
    }

    .p-datatable-scrollable td.p-datatable-frozen-column {
        background: inherit;
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-thead,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-thead {
        background: dt('datatable.header.cell.background');
    }

    .p-datatable-scrollable > .p-datatable-table-container > .p-datatable-table > .p-datatable-tfoot,
    .p-datatable-scrollable > .p-datatable-table-container > .p-virtualscroller > .p-datatable-table > .p-datatable-tfoot {
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-flex-scrollable {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .p-datatable-flex-scrollable > .p-datatable-table-container {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
    }

    .p-datatable-scrollable-table > .p-datatable-tbody > .p-datatable-row-group-header {
        position: sticky;
        z-index: 1;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th,
    .p-datatable-resizable-table > .p-datatable-tfoot > tr > td,
    .p-datatable-resizable-table > .p-datatable-tbody > tr > td {
        overflow: hidden;
        white-space: nowrap;
    }

    .p-datatable-resizable-table > .p-datatable-thead > tr > th.p-datatable-resizable-column:not(.p-datatable-frozen-column) {
        background-clip: padding-box;
        position: relative;
    }

    .p-datatable-resizable-table-fit > .p-datatable-thead > tr > th.p-datatable-resizable-column:last-child .p-datatable-column-resizer {
        display: none;
    }

    .p-datatable-column-resizer {
        display: block;
        position: absolute;
        inset-block-start: 0;
        inset-inline-end: 0;
        margin: 0;
        width: dt('datatable.column.resizer.width');
        height: 100%;
        padding: 0;
        cursor: col-resize;
        border: 1px solid transparent;
    }

    .p-datatable-column-header-content {
        display: flex;
        align-items: center;
        gap: dt('datatable.header.cell.gap');
    }

    .p-datatable-column-resize-indicator {
        width: dt('datatable.resize.indicator.width');
        position: absolute;
        z-index: 10;
        display: none;
        background: dt('datatable.resize.indicator.color');
    }

    .p-datatable-row-reorder-indicator-up,
    .p-datatable-row-reorder-indicator-down {
        position: absolute;
        display: none;
    }

    .p-datatable-reorderable-column,
    .p-datatable-reorderable-row-handle {
        cursor: move;
    }

    .p-datatable-mask {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2;
    }

    .p-datatable-inline-filter {
        display: flex;
        align-items: center;
        width: 100%;
        gap: dt('datatable.filter.inline.gap');
    }

    .p-datatable-inline-filter .p-datatable-filter-element-container {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datatable-filter-overlay {
        background: dt('datatable.filter.overlay.select.background');
        color: dt('datatable.filter.overlay.select.color');
        border: 1px solid dt('datatable.filter.overlay.select.border.color');
        border-radius: dt('datatable.filter.overlay.select.border.radius');
        box-shadow: dt('datatable.filter.overlay.select.shadow');
        min-width: 12.5rem;
    }

    .p-datatable-filter-constraint-list {
        margin: 0;
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: dt('datatable.filter.constraint.list.padding');
        gap: dt('datatable.filter.constraint.list.gap');
    }

    .p-datatable-filter-constraint {
        padding: dt('datatable.filter.constraint.padding');
        color: dt('datatable.filter.constraint.color');
        border-radius: dt('datatable.filter.constraint.border.radius');
        cursor: pointer;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-filter-constraint-selected {
        background: dt('datatable.filter.constraint.selected.background');
        color: dt('datatable.filter.constraint.selected.color');
    }

    .p-datatable-filter-constraint:not(.p-datatable-filter-constraint-selected):not(.p-disabled):hover {
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.focus.background');
        color: dt('datatable.filter.constraint.focus.color');
    }

    .p-datatable-filter-constraint-selected:focus-visible {
        outline: 0 none;
        background: dt('datatable.filter.constraint.selected.focus.background');
        color: dt('datatable.filter.constraint.selected.focus.color');
    }

    .p-datatable-filter-constraint-separator {
        border-block-start: 1px solid dt('datatable.filter.constraint.separator.border.color');
    }

    .p-datatable-popover-filter {
        display: inline-flex;
        margin-inline-start: auto;
    }

    .p-datatable-filter-overlay-popover {
        background: dt('datatable.filter.overlay.popover.background');
        color: dt('datatable.filter.overlay.popover.color');
        border: 1px solid dt('datatable.filter.overlay.popover.border.color');
        border-radius: dt('datatable.filter.overlay.popover.border.radius');
        box-shadow: dt('datatable.filter.overlay.popover.shadow');
        min-width: 12.5rem;
        padding: dt('datatable.filter.overlay.popover.padding');
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-operator-dropdown {
        width: 100%;
    }

    .p-datatable-filter-rule-list,
    .p-datatable-filter-rule {
        display: flex;
        flex-direction: column;
        gap: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule {
        border-block-end: 1px solid dt('datatable.filter.rule.border.color');
        padding-bottom: dt('datatable.filter.overlay.popover.gap');
    }

    .p-datatable-filter-rule:last-child {
        border-block-end: 0 none;
        padding-bottom: 0;
    }

    .p-datatable-filter-add-rule-button {
        width: 100%;
    }

    .p-datatable-filter-remove-rule-button {
        width: 100%;
    }

    .p-datatable-filter-buttonbar {
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .p-datatable-virtualscroller-spacer {
        display: flex;
    }

    .p-datatable .p-virtualscroller .p-virtualscroller-loading {
        transform: none !important;
        min-height: 0;
        position: sticky;
        inset-block-start: 0;
        inset-inline-start: 0;
    }

    .p-datatable-paginator-top {
        border-color: dt('datatable.paginator.top.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.top.border.width');
    }

    .p-datatable-paginator-bottom {
        border-color: dt('datatable.paginator.bottom.border.color');
        border-style: solid;
        border-width: dt('datatable.paginator.bottom.border.width');
    }

    .p-datatable-header {
        background: dt('datatable.header.background');
        color: dt('datatable.header.color');
        border-color: dt('datatable.header.border.color');
        border-style: solid;
        border-width: dt('datatable.header.border.width');
        padding: dt('datatable.header.padding');
    }

    .p-datatable-footer {
        background: dt('datatable.footer.background');
        color: dt('datatable.footer.color');
        border-color: dt('datatable.footer.border.color');
        border-style: solid;
        border-width: dt('datatable.footer.border.width');
        padding: dt('datatable.footer.padding');
    }

    .p-datatable-header-cell {
        padding: dt('datatable.header.cell.padding');
        background: dt('datatable.header.cell.background');
        border-color: dt('datatable.header.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.header.cell.color');
        font-weight: normal;
        text-align: start;
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-column-title {
        font-weight: dt('datatable.column.title.font.weight');
    }

    .p-datatable-tbody > tr {
        outline-color: transparent;
        background: dt('datatable.row.background');
        color: dt('datatable.row.color');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
    }

    .p-datatable-tbody > tr > td {
        text-align: start;
        border-color: dt('datatable.body.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        padding: dt('datatable.body.cell.padding');
    }

    .p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-tbody > tr:has(+ .p-datatable-row-selected) > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected > td {
        border-block-end-color: dt('datatable.body.cell.selected.border.color');
    }

    .p-datatable-tbody > tr:focus-visible,
    .p-datatable-tbody > tr.p-datatable-contextmenu-row-selected {
        box-shadow: dt('datatable.row.focus.ring.shadow');
        outline: dt('datatable.row.focus.ring.width') dt('datatable.row.focus.ring.style') dt('datatable.row.focus.ring.color');
        outline-offset: dt('datatable.row.focus.ring.offset');
    }

    .p-datatable-tfoot > tr > td {
        text-align: start;
        padding: dt('datatable.footer.cell.padding');
        border-color: dt('datatable.footer.cell.border.color');
        border-style: solid;
        border-width: 0 0 1px 0;
        color: dt('datatable.footer.cell.color');
        background: dt('datatable.footer.cell.background');
    }

    .p-datatable-column-footer {
        font-weight: dt('datatable.column.footer.font.weight');
    }

    .p-datatable-sortable-column {
        cursor: pointer;
        user-select: none;
        outline-color: transparent;
    }

    .p-datatable-column-title,
    .p-datatable-sort-icon,
    .p-datatable-sort-badge {
        vertical-align: middle;
    }

    .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.color');
        font-size: dt('datatable.sort.icon.size');
        width: dt('datatable.sort.icon.size');
        height: dt('datatable.sort.icon.size');
        transition: color dt('datatable.transition.duration');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover {
        background: dt('datatable.header.cell.hover.background');
        color: dt('datatable.header.cell.hover.color');
    }

    .p-datatable-sortable-column:not(.p-datatable-column-sorted):hover .p-datatable-sort-icon {
        color: dt('datatable.sort.icon.hover.color');
    }

    .p-datatable-column-sorted {
        background: dt('datatable.header.cell.selected.background');
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-column-sorted .p-datatable-sort-icon {
        color: dt('datatable.header.cell.selected.color');
    }

    .p-datatable-sortable-column:focus-visible {
        box-shadow: dt('datatable.header.cell.focus.ring.shadow');
        outline: dt('datatable.header.cell.focus.ring.width') dt('datatable.header.cell.focus.ring.style') dt('datatable.header.cell.focus.ring.color');
        outline-offset: dt('datatable.header.cell.focus.ring.offset');
    }

    .p-datatable-hoverable .p-datatable-selectable-row {
        cursor: pointer;
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-top > td {
        box-shadow: inset 0 2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-tbody > tr.p-datatable-dragpoint-bottom > td {
        box-shadow: inset 0 -2px 0 0 dt('datatable.drop.point.color');
    }

    .p-datatable-loading-icon {
        font-size: dt('datatable.loading.icon.size');
        width: dt('datatable.loading.icon.size');
        height: dt('datatable.loading.icon.size');
    }

    .p-datatable-gridlines .p-datatable-header {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-footer {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-top {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-paginator-bottom {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-thead > tr > th:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td {
        border-width: 1px 0 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr > td:last-child {
        border-width: 1px 1px 0 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td {
        border-width: 1px 0 1px 1px;
    }

    .p-datatable-gridlines .p-datatable-tfoot > tr > td:last-child {
        border-width: 1px 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines .p-datatable-thead + .p-datatable-tfoot > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td {
        border-width: 0 0 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-thead):has(.p-datatable-tbody) .p-datatable-tbody > tr > td:last-child {
        border-width: 0 1px 1px 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td {
        border-width: 0 0 0 1px;
    }

    .p-datatable.p-datatable-gridlines:has(.p-datatable-tbody):has(.p-datatable-tfoot) .p-datatable-tbody > tr:last-child > td:last-child {
        border-width: 0 1px 0 1px;
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd {
        background: dt('datatable.row.striped.background');
    }

    .p-datatable.p-datatable-striped .p-datatable-tbody > tr.p-row-odd.p-datatable-row-selected {
        background: dt('datatable.row.selected.background');
        color: dt('datatable.row.selected.color');
    }

    .p-datatable-striped.p-datatable-hoverable .p-datatable-tbody > tr:not(.p-datatable-row-selected):hover {
        background: dt('datatable.row.hover.background');
        color: dt('datatable.row.hover.color');
    }

    .p-datatable.p-datatable-sm .p-datatable-header {
        padding: dt('datatable.header.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.sm.padding');
    }

    .p-datatable.p-datatable-sm .p-datatable-footer {
        padding: dt('datatable.footer.sm.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-header {
        padding: dt('datatable.header.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-thead > tr > th {
        padding: dt('datatable.header.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tbody > tr > td {
        padding: dt('datatable.body.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-tfoot > tr > td {
        padding: dt('datatable.footer.cell.lg.padding');
    }

    .p-datatable.p-datatable-lg .p-datatable-footer {
        padding: dt('datatable.footer.lg.padding');
    }

    .p-datatable-row-toggle-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datatable.row.toggle.button.size');
        height: dt('datatable.row.toggle.button.size');
        color: dt('datatable.row.toggle.button.color');
        border: 0 none;
        background: transparent;
        cursor: pointer;
        border-radius: dt('datatable.row.toggle.button.border.radius');
        transition:
            background dt('datatable.transition.duration'),
            color dt('datatable.transition.duration'),
            border-color dt('datatable.transition.duration'),
            outline-color dt('datatable.transition.duration'),
            box-shadow dt('datatable.transition.duration');
        outline-color: transparent;
        user-select: none;
    }

    .p-datatable-row-toggle-button:enabled:hover {
        color: dt('datatable.row.toggle.button.hover.color');
        background: dt('datatable.row.toggle.button.hover.background');
    }

    .p-datatable-tbody > tr.p-datatable-row-selected .p-datatable-row-toggle-button:hover {
        background: dt('datatable.row.toggle.button.selected.hover.background');
        color: dt('datatable.row.toggle.button.selected.hover.color');
    }

    .p-datatable-row-toggle-button:focus-visible {
        box-shadow: dt('datatable.row.toggle.button.focus.ring.shadow');
        outline: dt('datatable.row.toggle.button.focus.ring.width') dt('datatable.row.toggle.button.focus.ring.style') dt('datatable.row.toggle.button.focus.ring.color');
        outline-offset: dt('datatable.row.toggle.button.focus.ring.offset');
    }

    .p-datatable-row-toggle-icon:dir(rtl) {
        transform: rotate(180deg);
    }
`;var jl=`
    .p-checkbox {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('checkbox.width');
        height: dt('checkbox.height');
    }

    .p-checkbox-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        inset-block-start: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: dt('checkbox.border.radius');
    }

    .p-checkbox-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: dt('checkbox.border.radius');
        border: 1px solid dt('checkbox.border.color');
        background: dt('checkbox.background');
        width: dt('checkbox.width');
        height: dt('checkbox.height');
        transition:
            background dt('checkbox.transition.duration'),
            color dt('checkbox.transition.duration'),
            border-color dt('checkbox.transition.duration'),
            box-shadow dt('checkbox.transition.duration'),
            outline-color dt('checkbox.transition.duration');
        outline-color: transparent;
        box-shadow: dt('checkbox.shadow');
    }

    .p-checkbox-icon {
        transition-duration: dt('checkbox.transition.duration');
        color: dt('checkbox.icon.color');
        font-size: dt('checkbox.icon.size');
        width: dt('checkbox.icon.size');
        height: dt('checkbox.icon.size');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        border-color: dt('checkbox.hover.border.color');
    }

    .p-checkbox-checked .p-checkbox-box {
        border-color: dt('checkbox.checked.border.color');
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked .p-checkbox-icon {
        color: dt('checkbox.icon.checked.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
        border-color: dt('checkbox.checked.hover.border.color');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-icon {
        color: dt('checkbox.icon.checked.hover.color');
    }

    .p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.focus.border.color');
        box-shadow: dt('checkbox.focus.ring.shadow');
        outline: dt('checkbox.focus.ring.width') dt('checkbox.focus.ring.style') dt('checkbox.focus.ring.color');
        outline-offset: dt('checkbox.focus.ring.offset');
    }

    .p-checkbox-checked:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
        border-color: dt('checkbox.checked.focus.border.color');
    }

    .p-checkbox.p-invalid > .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }

    .p-checkbox.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.filled.background');
    }

    .p-checkbox-checked.p-variant-filled .p-checkbox-box {
        background: dt('checkbox.checked.background');
    }

    .p-checkbox-checked.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
        background: dt('checkbox.checked.hover.background');
    }

    .p-checkbox.p-disabled {
        opacity: 1;
    }

    .p-checkbox.p-disabled .p-checkbox-box {
        background: dt('checkbox.disabled.background');
        border-color: dt('checkbox.checked.disabled.border.color');
    }

    .p-checkbox.p-disabled .p-checkbox-box .p-checkbox-icon {
        color: dt('checkbox.icon.disabled.color');
    }

    .p-checkbox-sm,
    .p-checkbox-sm .p-checkbox-box {
        width: dt('checkbox.sm.width');
        height: dt('checkbox.sm.height');
    }

    .p-checkbox-sm .p-checkbox-icon {
        font-size: dt('checkbox.icon.sm.size');
        width: dt('checkbox.icon.sm.size');
        height: dt('checkbox.icon.sm.size');
    }

    .p-checkbox-lg,
    .p-checkbox-lg .p-checkbox-box {
        width: dt('checkbox.lg.width');
        height: dt('checkbox.lg.height');
    }

    .p-checkbox-lg .p-checkbox-icon {
        font-size: dt('checkbox.icon.lg.size');
        width: dt('checkbox.icon.lg.size');
        height: dt('checkbox.icon.lg.size');
    }
`;var Cm=["icon"],wm=["input"],km=(t,r,e)=>({checked:t,class:r,dataP:e});function Tm(t,r){if(t&1&&F(0,"span",8),t&2){let e=d(3);C(e.cx("icon")),s("ngClass",e.checkboxIcon)("pBind",e.ptm("icon")),D("data-p",e.dataP)}}function Sm(t,r){if(t&1&&(O(),F(0,"svg",9)),t&2){let e=d(3);C(e.cx("icon")),s("pBind",e.ptm("icon")),D("data-p",e.dataP)}}function Im(t,r){if(t&1&&(W(0),g(1,Tm,1,5,"span",6)(2,Sm,1,4,"svg",7),K()),t&2){let e=d(2);l(),s("ngIf",e.checkboxIcon),l(),s("ngIf",!e.checkboxIcon)}}function Em(t,r){if(t&1&&(O(),F(0,"svg",10)),t&2){let e=d(2);C(e.cx("icon")),s("pBind",e.ptm("icon")),D("data-p",e.dataP)}}function Dm(t,r){if(t&1&&(W(0),g(1,Im,3,2,"ng-container",3)(2,Em,1,4,"svg",5),K()),t&2){let e=d();l(),s("ngIf",e.checked),l(),s("ngIf",e._indeterminate())}}function Mm(t,r){}function Lm(t,r){t&1&&g(0,Mm,0,0,"ng-template")}var Pm=`
    ${jl}

    /* For PrimeNG */
    p-checkBox.ng-invalid.ng-dirty .p-checkbox-box,
    p-check-box.ng-invalid.ng-dirty .p-checkbox-box,
    p-checkbox.ng-invalid.ng-dirty .p-checkbox-box {
        border-color: dt('checkbox.invalid.border.color');
    }
`,Fm={root:({instance:t})=>["p-checkbox p-component",{"p-checkbox-checked p-highlight":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-checkbox-sm p-inputfield-sm":t.size()==="small","p-checkbox-lg p-inputfield-lg":t.size()==="large"}],box:"p-checkbox-box",input:"p-checkbox-input",icon:"p-checkbox-icon"},Ul=(()=>{class t extends fe{name="checkbox";style=Pm;classes=Fm;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Ql=new ae("CHECKBOX_INSTANCE"),Rm={provide:lt,useExisting:ot(()=>co),multi:!0},co=(()=>{class t extends Lt{componentName="Checkbox";hostName="";value;binary;ariaLabelledBy;ariaLabel;tabindex;inputId;inputStyle;styleClass;inputClass;indeterminate=!1;formControl;checkboxIcon;readonly;autofocus;trueValue=!0;falseValue=!1;variant=ee();size=ee();onChange=new I;onFocus=new I;onBlur=new I;inputViewChild;get checked(){return this._indeterminate()?!1:this.binary?this.modelValue()===this.trueValue:Kr(this.value,this.modelValue())}_indeterminate=Z(void 0);checkboxIconTemplate;templates;_checkboxIconTemplate;focused=!1;_componentStyle=v(Ul);bindDirectiveInstance=v(A,{self:!0});$pcCheckbox=v(Ql,{optional:!0,skipSelf:!0})??void 0;$variant=J(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());onAfterContentInit(){this.templates?.forEach(e=>{switch(e.getType()){case"icon":this._checkboxIconTemplate=e.template;break;case"checkboxicon":this._checkboxIconTemplate=e.template;break}})}onChanges(e){e.indeterminate&&this._indeterminate.set(e.indeterminate.currentValue)}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}updateModel(e){let n,i=this.injector.get(hn,null,{optional:!0,self:!0}),o=i&&!this.formControl?i.value:this.modelValue();this.binary?(n=this._indeterminate()?this.trueValue:this.checked?this.falseValue:this.trueValue,this.writeModelValue(n),this.onModelChange(n)):(this.checked||this._indeterminate()?n=o.filter(a=>!on(a,this.value)):n=o?[...o,this.value]:[this.value],this.onModelChange(n),this.writeModelValue(n),this.formControl&&this.formControl.setValue(n)),this._indeterminate()&&this._indeterminate.set(!1),this.onChange.emit({checked:n,originalEvent:e})}handleChange(e){this.readonly||this.updateModel(e)}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),this.onModelTouched()}focus(){this.inputViewChild?.nativeElement.focus()}writeControlValue(e,n){n(e),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid(),checked:this.checked,disabled:this.$disabled(),filled:this.$variant()==="filled",[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-checkbox"],["p-checkBox"],["p-check-box"]],contentQueries:function(n,i,o){if(n&1&&Re(o,Cm,4)(o,Me,4),n&2){let a;k(a=T())&&(i.checkboxIconTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(wm,5),n&2){let o;k(o=T())&&(i.inputViewChild=o.first)}},hostVars:6,hostBindings:function(n,i){n&2&&(D("data-p-highlight",i.checked)("data-p-checked",i.checked)("data-p-disabled",i.$disabled())("data-p",i.dataP),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{hostName:"hostName",value:"value",binary:[2,"binary","binary",w],ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",tabindex:[2,"tabindex","tabindex",se],inputId:"inputId",inputStyle:"inputStyle",styleClass:"styleClass",inputClass:"inputClass",indeterminate:[2,"indeterminate","indeterminate",w],formControl:"formControl",checkboxIcon:"checkboxIcon",readonly:[2,"readonly","readonly",w],autofocus:[2,"autofocus","autofocus",w],trueValue:"trueValue",falseValue:"falseValue",variant:[1,"variant"],size:[1,"size"]},outputs:{onChange:"onChange",onFocus:"onFocus",onBlur:"onBlur"},features:[le([Rm,Ul,{provide:Ql,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:5,vars:26,consts:[["input",""],["type","checkbox",3,"focus","blur","change","checked","pBind"],[3,"pBind"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","minus",3,"class","pBind",4,"ngIf"],[3,"class","ngClass","pBind",4,"ngIf"],["data-p-icon","check",3,"class","pBind",4,"ngIf"],[3,"ngClass","pBind"],["data-p-icon","check",3,"pBind"],["data-p-icon","minus",3,"pBind"]],template:function(n,i){n&1&&(c(0,"input",1,0),x("focus",function(a){return i.onInputFocus(a)})("blur",function(a){return i.onInputBlur(a)})("change",function(a){return i.handleChange(a)}),p(),c(2,"div",2),g(3,Dm,3,2,"ng-container",3)(4,Lm,1,0,null,4),p()),n&2&&(Ae(i.inputStyle),C(i.cn(i.cx("input"),i.inputClass)),s("checked",i.checked)("pBind",i.ptm("input")),D("id",i.inputId)("value",i.value)("name",i.name())("tabindex",i.tabindex)("required",i.required()?"":void 0)("readonly",i.readonly?"":void 0)("disabled",i.$disabled()?"":void 0)("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel),l(2),C(i.cx("box")),s("pBind",i.ptm("box")),D("data-p",i.dataP),l(),s("ngIf",!i.checkboxIconTemplate&&!i._checkboxIconTemplate),l(),s("ngTemplateOutlet",i.checkboxIconTemplate||i._checkboxIconTemplate)("ngTemplateOutletContext",Wn(22,km,i.checked,i.cx("icon"),i.dataP)))},dependencies:[te,at,ze,Le,ie,Pi,hl,Ve,A],encapsulation:2,changeDetection:0})}return t})(),po=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[co,ie,ie]})}return t})();var Hn=(()=>{class t extends Lt{pcFluid=v(An,{optional:!0,host:!0,skipSelf:!0});fluid=ee(void 0,{transform:w});variant=ee();size=ee();inputSize=ee();pattern=ee();min=ee();max=ee();step=ee();minlength=ee();maxlength=ee();$variant=J(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());get hasFluid(){return this.fluid()??!!this.pcFluid}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275dir=Oe({type:t,inputs:{fluid:[1,"fluid"],variant:[1,"variant"],size:[1,"size"],inputSize:[1,"inputSize"],pattern:[1,"pattern"],min:[1,"min"],max:[1,"max"],step:[1,"step"],minlength:[1,"minlength"],maxlength:[1,"maxlength"]},features:[L]})}return t})();var Gl=`
    .p-inputtext {
        font-family: inherit;
        font-feature-settings: inherit;
        font-size: 1rem;
        color: dt('inputtext.color');
        background: dt('inputtext.background');
        padding-block: dt('inputtext.padding.y');
        padding-inline: dt('inputtext.padding.x');
        border: 1px solid dt('inputtext.border.color');
        transition:
            background dt('inputtext.transition.duration'),
            color dt('inputtext.transition.duration'),
            border-color dt('inputtext.transition.duration'),
            outline-color dt('inputtext.transition.duration'),
            box-shadow dt('inputtext.transition.duration');
        appearance: none;
        border-radius: dt('inputtext.border.radius');
        outline-color: transparent;
        box-shadow: dt('inputtext.shadow');
    }

    .p-inputtext:enabled:hover {
        border-color: dt('inputtext.hover.border.color');
    }

    .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
        box-shadow: dt('inputtext.focus.ring.shadow');
        outline: dt('inputtext.focus.ring.width') dt('inputtext.focus.ring.style') dt('inputtext.focus.ring.color');
        outline-offset: dt('inputtext.focus.ring.offset');
    }

    .p-inputtext.p-invalid {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.p-variant-filled {
        background: dt('inputtext.filled.background');
    }

    .p-inputtext.p-variant-filled:enabled:hover {
        background: dt('inputtext.filled.hover.background');
    }

    .p-inputtext.p-variant-filled:enabled:focus {
        background: dt('inputtext.filled.focus.background');
    }

    .p-inputtext:disabled {
        opacity: 1;
        background: dt('inputtext.disabled.background');
        color: dt('inputtext.disabled.color');
    }

    .p-inputtext::placeholder {
        color: dt('inputtext.placeholder.color');
    }

    .p-inputtext.p-invalid::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }

    .p-inputtext-sm {
        font-size: dt('inputtext.sm.font.size');
        padding-block: dt('inputtext.sm.padding.y');
        padding-inline: dt('inputtext.sm.padding.x');
    }

    .p-inputtext-lg {
        font-size: dt('inputtext.lg.font.size');
        padding-block: dt('inputtext.lg.padding.y');
        padding-inline: dt('inputtext.lg.padding.x');
    }

    .p-inputtext-fluid {
        width: 100%;
    }
`;var Om=`
    ${Gl}

    /* For PrimeNG */
   .p-inputtext.ng-invalid.ng-dirty {
        border-color: dt('inputtext.invalid.border.color');
    }

    .p-inputtext.ng-invalid.ng-dirty::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,Vm={root:({instance:t})=>["p-inputtext p-component",{"p-filled":t.$filled(),"p-inputtext-sm":t.pSize==="small","p-inputtext-lg":t.pSize==="large","p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-inputtext-fluid":t.hasFluid}]},Wl=(()=>{class t extends fe{name="inputtext";style=Om;classes=Vm;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Kl=new ae("INPUTTEXT_INSTANCE"),$n=(()=>{class t extends eo{componentName="InputText";hostName="";ptInputText=ee();pInputTextPT=ee();pInputTextUnstyled=ee();bindDirectiveInstance=v(A,{self:!0});$pcInputText=v(Kl,{optional:!0,skipSelf:!0})??void 0;ngControl=v(hn,{optional:!0,self:!0});pcFluid=v(An,{optional:!0,host:!0,skipSelf:!0});pSize;variant=ee();fluid=ee(void 0,{transform:w});invalid=ee(void 0,{transform:w});$variant=J(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());_componentStyle=v(Wl);constructor(){super(),Xe(()=>{let e=this.ptInputText()||this.pInputTextPT();e&&this.directivePT.set(e)}),Xe(()=>{this.pInputTextUnstyled()&&this.directiveUnstyled.set(this.pInputTextUnstyled())})}onAfterViewInit(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value),this.cd.detectChanges()}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("root"))}onDoCheck(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}onInput(){this.writeModelValue(this.ngControl?.value??this.el.nativeElement.value)}get hasFluid(){return this.fluid()??!!this.pcFluid}get dataP(){return this.cn({invalid:this.invalid(),fluid:this.hasFluid,filled:this.$variant()==="filled",[this.pSize]:this.pSize})}static \u0275fac=function(n){return new(n||t)};static \u0275dir=Oe({type:t,selectors:[["","pInputText",""]],hostVars:3,hostBindings:function(n,i){n&1&&x("input",function(){return i.onInput()}),n&2&&(D("data-p",i.dataP),C(i.cx("root")))},inputs:{hostName:"hostName",ptInputText:[1,"ptInputText"],pInputTextPT:[1,"pInputTextPT"],pInputTextUnstyled:[1,"pInputTextUnstyled"],pSize:"pSize",variant:[1,"variant"],fluid:[1,"fluid"],invalid:[1,"invalid"]},features:[le([Wl,{provide:Kl,useExisting:t},{provide:be,useExisting:t}]),we([A]),L]})}return t})(),Yl=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({})}return t})();var Zl=`
    .p-datepicker {
        display: inline-flex;
        max-width: 100%;
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-datepicker-input {
        flex: 1 1 auto;
        width: 1%;
    }

    .p-datepicker-dropdown {
        cursor: pointer;
        display: inline-flex;
        user-select: none;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.dropdown.width');
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
        background: dt('datepicker.dropdown.background');
        border: 1px solid dt('datepicker.dropdown.border.color');
        border-inline-start: 0 none;
        color: dt('datepicker.dropdown.color');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        outline-color: transparent;
    }

    .p-datepicker-dropdown:not(:disabled):hover {
        background: dt('datepicker.dropdown.hover.background');
        border-color: dt('datepicker.dropdown.hover.border.color');
        color: dt('datepicker.dropdown.hover.color');
    }

    .p-datepicker-dropdown:not(:disabled):active {
        background: dt('datepicker.dropdown.active.background');
        border-color: dt('datepicker.dropdown.active.border.color');
        color: dt('datepicker.dropdown.active.color');
    }

    .p-datepicker-dropdown:focus-visible {
        box-shadow: dt('datepicker.dropdown.focus.ring.shadow');
        outline: dt('datepicker.dropdown.focus.ring.width') dt('datepicker.dropdown.focus.ring.style') dt('datepicker.dropdown.focus.ring.color');
        outline-offset: dt('datepicker.dropdown.focus.ring.offset');
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) {
        position: relative;
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker-input-icon-container {
        cursor: pointer;
        position: absolute;
        top: 50%;
        inset-inline-end: dt('form.field.padding.x');
        margin-block-start: calc(-1 * (dt('icon.size') / 2));
        color: dt('datepicker.input.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-datepicker:has(.p-datepicker-input:disabled) .p-datepicker-input-icon-container {
        cursor: default;
    }

    .p-datepicker-fluid {
        display: flex;
    }

    .p-datepicker .p-datepicker-panel {
        min-width: 100%;
    }

    .p-datepicker-panel {
        width: auto;
        padding: dt('datepicker.panel.padding');
        background: dt('datepicker.panel.background');
        color: dt('datepicker.panel.color');
        border: 1px solid dt('datepicker.panel.border.color');
        border-radius: dt('datepicker.panel.border.radius');
        box-shadow: dt('datepicker.panel.shadow');
    }

    .p-datepicker-panel-inline {
        display: inline-block;
        overflow-x: auto;
        box-shadow: none;
    }

    .p-datepicker-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: dt('datepicker.header.padding');
        background: dt('datepicker.header.background');
        color: dt('datepicker.header.color');
        border-block-end: 1px solid dt('datepicker.header.border.color');
    }

    .p-datepicker-next-button:dir(rtl) {
        order: -1;
    }

    .p-datepicker-prev-button:dir(rtl) {
        order: 1;
    }

    .p-datepicker-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: dt('datepicker.title.gap');
        font-weight: dt('datepicker.title.font.weight');
    }

    .p-datepicker-select-year,
    .p-datepicker-select-month {
        border: none;
        background: transparent;
        margin: 0;
        cursor: pointer;
        font-weight: inherit;
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration');
    }

    .p-datepicker-select-month {
        padding: dt('datepicker.select.month.padding');
        color: dt('datepicker.select.month.color');
        border-radius: dt('datepicker.select.month.border.radius');
    }

    .p-datepicker-select-year {
        padding: dt('datepicker.select.year.padding');
        color: dt('datepicker.select.year.color');
        border-radius: dt('datepicker.select.year.border.radius');
    }

    .p-datepicker-select-month:enabled:hover {
        background: dt('datepicker.select.month.hover.background');
        color: dt('datepicker.select.month.hover.color');
    }

    .p-datepicker-select-year:enabled:hover {
        background: dt('datepicker.select.year.hover.background');
        color: dt('datepicker.select.year.hover.color');
    }

    .p-datepicker-select-month:focus-visible,
    .p-datepicker-select-year:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-calendar-container {
        display: flex;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar {
        flex: 1 1 auto;
        border-inline-start: 1px solid dt('datepicker.group.border.color');
        padding-inline-end: dt('datepicker.group.gap');
        padding-inline-start: dt('datepicker.group.gap');
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:first-child {
        padding-inline-start: 0;
        border-inline-start: 0 none;
    }

    .p-datepicker-calendar-container .p-datepicker-calendar:last-child {
        padding-inline-end: 0;
    }

    .p-datepicker-day-view {
        width: 100%;
        border-collapse: collapse;
        font-size: 1rem;
        margin: dt('datepicker.day.view.margin');
    }

    .p-datepicker-weekday-cell {
        padding: dt('datepicker.week.day.padding');
    }

    .p-datepicker-weekday {
        font-weight: dt('datepicker.week.day.font.weight');
        color: dt('datepicker.week.day.color');
    }

    .p-datepicker-day-cell {
        padding: dt('datepicker.date.padding');
    }

    .p-datepicker-day {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        margin: 0 auto;
        overflow: hidden;
        position: relative;
        width: dt('datepicker.date.width');
        height: dt('datepicker.date.height');
        border-radius: dt('datepicker.date.border.radius');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border: 1px solid transparent;
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-day:not(.p-datepicker-day-selected):not(.p-disabled):hover {
        background: dt('datepicker.date.hover.background');
        color: dt('datepicker.date.hover.color');
    }

    .p-datepicker-day:focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day {
        background: dt('datepicker.today.background');
        color: dt('datepicker.today.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected {
        background: dt('datepicker.date.selected.background');
        color: dt('datepicker.date.selected.color');
    }

    .p-datepicker-today > .p-datepicker-day-selected-range {
        background: dt('datepicker.date.range.selected.background');
        color: dt('datepicker.date.range.selected.color');
    }

    .p-datepicker-weeknumber {
        text-align: center;
    }

    .p-datepicker-month-view {
        margin: dt('datepicker.month.view.margin');
    }

    .p-datepicker-month {
        width: 33.3%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.month.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.month.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-month:not(.p-disabled):not(.p-datepicker-month-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-month-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-month:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-year-view {
        margin: dt('datepicker.year.view.margin');
    }

    .p-datepicker-year {
        width: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        padding: dt('datepicker.year.padding');
        transition:
            background dt('datepicker.transition.duration'),
            color dt('datepicker.transition.duration'),
            border-color dt('datepicker.transition.duration'),
            box-shadow dt('datepicker.transition.duration'),
            outline-color dt('datepicker.transition.duration');
        border-radius: dt('datepicker.year.border.radius');
        outline-color: transparent;
        color: dt('datepicker.date.color');
    }

    .p-datepicker-year:not(.p-disabled):not(.p-datepicker-year-selected):hover {
        color: dt('datepicker.date.hover.color');
        background: dt('datepicker.date.hover.background');
    }

    .p-datepicker-year-selected {
        color: dt('datepicker.date.selected.color');
        background: dt('datepicker.date.selected.background');
    }

    .p-datepicker-year:not(.p-disabled):focus-visible {
        box-shadow: dt('datepicker.date.focus.ring.shadow');
        outline: dt('datepicker.date.focus.ring.width') dt('datepicker.date.focus.ring.style') dt('datepicker.date.focus.ring.color');
        outline-offset: dt('datepicker.date.focus.ring.offset');
    }

    .p-datepicker-buttonbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: dt('datepicker.buttonbar.padding');
        border-block-start: 1px solid dt('datepicker.buttonbar.border.color');
    }

    .p-datepicker-buttonbar .p-button {
        width: auto;
    }

    .p-datepicker-time-picker {
        display: flex;
        justify-content: center;
        align-items: center;
        border-block-start: 1px solid dt('datepicker.time.picker.border.color');
        padding: 0;
        gap: dt('datepicker.time.picker.gap');
    }

    .p-datepicker-calendar-container + .p-datepicker-time-picker {
        padding: dt('datepicker.time.picker.padding');
    }

    .p-datepicker-time-picker > div {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: dt('datepicker.time.picker.button.gap');
    }

    .p-datepicker-time-picker span {
        font-size: 1rem;
    }

    .p-datepicker-timeonly .p-datepicker-time-picker {
        border-block-start: 0 none;
    }

    .p-datepicker-time-picker:dir(rtl) {
        flex-direction: row-reverse;
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.sm.width');
    }

    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-sm) .p-datepicker-input-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown {
        width: dt('datepicker.dropdown.lg.width');
    }

    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-dropdown .p-icon,
    .p-datepicker:has(.p-inputtext-lg) .p-datepicker-input-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-datepicker-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        color: dt('form.field.icon.color');
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-datepicker:has(.p-datepicker-dropdown) .p-datepicker-clear-icon {
        inset-inline-end: calc(dt('datepicker.dropdown.width') + dt('form.field.padding.x'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container) .p-datepicker-clear-icon {
        inset-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-datepicker:has(.p-datepicker-input-icon-container):has(.p-datepicker-clear-icon) .p-datepicker-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 3) + calc(dt('icon.size') * 2));
    }

    .p-inputgroup .p-datepicker-dropdown {
        border-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child:has(.p-datepicker-dropdown) > .p-datepicker-input {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
    }

    .p-inputgroup > .p-datepicker:last-child .p-datepicker-dropdown {
        border-start-end-radius: dt('datepicker.dropdown.border.radius');
        border-end-end-radius: dt('datepicker.dropdown.border.radius');
    }
`;var zm=["date"],qm=["header"],Am=["footer"],Nm=["disabledDate"],Hm=["decade"],$m=["previousicon"],jm=["nexticon"],Um=["triggericon"],Qm=["clearicon"],Gm=["decrementicon"],Wm=["incrementicon"],Km=["inputicon"],Ym=["buttonbar"],Zm=["inputfield"],Xm=["contentWrapper"],Jm=[[["p-header"]],[["p-footer"]]],eh=["p-header","p-footer"],th=t=>({clickCallBack:t}),Xl=t=>({visibility:t}),ar=t=>({$implicit:t}),nh=t=>({date:t}),ih=(t,r)=>({month:t,index:r}),oh=t=>({year:t}),rh=(t,r)=>({todayCallback:t,clearCallback:r});function ah(t,r){if(t&1){let e=P();O(),c(0,"svg",13),x("click",function(){_(e);let i=d(3);return b(i.clear())}),p()}if(t&2){let e=d(3);C(e.cx("clearIcon")),s("pBind",e.ptm("inputIcon"))}}function lh(t,r){}function sh(t,r){t&1&&g(0,lh,0,0,"ng-template")}function dh(t,r){if(t&1){let e=P();c(0,"span",14),x("click",function(){_(e);let i=d(3);return b(i.clear())}),g(1,sh,1,0,null,6),p()}if(t&2){let e=d(3);C(e.cx("clearIcon")),s("pBind",e.ptm("inputIcon")),l(),s("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)}}function ch(t,r){if(t&1&&(W(0),g(1,ah,1,3,"svg",11)(2,dh,2,4,"span",12),K()),t&2){let e=d(2);l(),s("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),l(),s("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function ph(t,r){if(t&1&&F(0,"span",17),t&2){let e=d(3);s("ngClass",e.icon)("pBind",e.ptm("dropdownIcon"))}}function uh(t,r){if(t&1&&(O(),F(0,"svg",19)),t&2){let e=d(4);s("pBind",e.ptm("dropdownIcon"))}}function mh(t,r){}function hh(t,r){t&1&&g(0,mh,0,0,"ng-template")}function fh(t,r){if(t&1&&(W(0),g(1,uh,1,1,"svg",18)(2,hh,1,0,null,6),K()),t&2){let e=d(3);l(),s("ngIf",!e.triggerIconTemplate&&!e._triggerIconTemplate),l(),s("ngTemplateOutlet",e.triggerIconTemplate||e._triggerIconTemplate)}}function gh(t,r){if(t&1){let e=P();c(0,"button",15),x("click",function(i){_(e),d();let o=Se(1),a=d();return b(a.onButtonClick(i,o))}),g(1,ph,1,2,"span",16)(2,fh,3,2,"ng-container",7),p()}if(t&2){let e=d(2);C(e.cx("dropdown")),s("disabled",e.$disabled())("pBind",e.ptm("dropdown")),D("aria-label",e.iconButtonAriaLabel)("aria-expanded",e.overlayVisible??!1)("aria-controls",e.overlayVisible?e.panelId:null),l(),s("ngIf",e.icon),l(),s("ngIf",!e.icon)}}function _h(t,r){if(t&1){let e=P();O(),c(0,"svg",23),x("click",function(i){_(e);let o=d(3);return b(o.onButtonClick(i))}),p()}if(t&2){let e=d(3);C(e.cx("inputIcon")),s("pBind",e.ptm("inputIcon"))}}function bh(t,r){t&1&&U(0)}function yh(t,r){if(t&1&&(W(0),c(1,"span",20),g(2,_h,1,3,"svg",21)(3,bh,1,0,"ng-container",22),p(),K()),t&2){let e=d(2);l(),C(e.cx("inputIconContainer")),s("pBind",e.ptm("inputIconContainer")),D("data-p",e.inputIconDataP),l(),s("ngIf",!e.inputIconTemplate&&!e._inputIconTemplate),l(),s("ngTemplateOutlet",e.inputIconTemplate||e._inputIconTemplate)("ngTemplateOutletContext",oe(7,th,e.onButtonClick.bind(e)))}}function vh(t,r){if(t&1){let e=P();c(0,"input",9,1),x("focus",function(i){_(e);let o=d();return b(o.onInputFocus(i))})("keydown",function(i){_(e);let o=d();return b(o.onInputKeydown(i))})("click",function(){_(e);let i=d();return b(i.onInputClick())})("blur",function(i){_(e);let o=d();return b(o.onInputBlur(i))})("input",function(i){_(e);let o=d();return b(o.onUserInput(i))}),p(),g(2,ch,3,2,"ng-container",7)(3,gh,3,9,"button",10)(4,yh,4,9,"ng-container",7)}if(t&2){let e=d();C(e.cn(e.cx("pcInputText"),e.inputStyleClass)),s("pSize",e.size())("value",e.inputFieldValue)("ngStyle",e.inputStyle)("pAutoFocus",e.autofocus)("variant",e.$variant())("fluid",e.hasFluid)("invalid",e.invalid())("pt",e.ptm("pcInputText"))("unstyled",e.unstyled()),D("size",e.inputSize())("id",e.inputId)("name",e.name())("aria-required",e.required())("aria-expanded",e.overlayVisible??!1)("aria-controls",e.overlayVisible?e.panelId:null)("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel)("required",e.required()?"":void 0)("readonly",e.readonlyInput?"":void 0)("disabled",e.$disabled()?"":void 0)("placeholder",e.placeholder)("tabindex",e.tabindex)("inputmode",e.touchUI?"off":null),l(2),s("ngIf",e.showClear&&!e.$disabled()&&(e.inputfieldViewChild==null||e.inputfieldViewChild.nativeElement==null?null:e.inputfieldViewChild.nativeElement.value)),l(),s("ngIf",e.showIcon&&e.iconDisplay==="button"),l(),s("ngIf",e.iconDisplay==="input"&&e.showIcon)}}function xh(t,r){t&1&&U(0)}function Ch(t,r){t&1&&(O(),F(0,"svg",30))}function wh(t,r){}function kh(t,r){t&1&&g(0,wh,0,0,"ng-template")}function Th(t,r){if(t&1&&(c(0,"span"),g(1,kh,1,0,null,6),p()),t&2){let e=d(4);l(),s("ngTemplateOutlet",e.previousIconTemplate||e._previousIconTemplate)}}function Sh(t,r){if(t&1&&g(0,Ch,1,0,"svg",29)(1,Th,2,1,"span",7),t&2){let e=d(3);s("ngIf",!e.previousIconTemplate&&!e._previousIconTemplate),l(),s("ngIf",e.previousIconTemplate||e._previousIconTemplate)}}function Ih(t,r){if(t&1){let e=P();c(0,"button",31),x("click",function(i){_(e);let o=d(3);return b(o.switchToMonthView(i))})("keydown",function(i){_(e);let o=d(3);return b(o.onContainerButtonKeydown(i))}),m(1),p()}if(t&2){let e=d().$implicit,n=d(2);C(n.cx("selectMonth")),s("pBind",n.ptm("selectMonth")),D("disabled",n.switchViewButtonDisabled()?"":void 0)("aria-label",n.getTranslation("chooseMonth"))("data-pc-group-section","navigator"),l(),$(" ",n.getMonthName(e.month)," ")}}function Eh(t,r){if(t&1){let e=P();c(0,"button",31),x("click",function(i){_(e);let o=d(3);return b(o.switchToYearView(i))})("keydown",function(i){_(e);let o=d(3);return b(o.onContainerButtonKeydown(i))}),m(1),p()}if(t&2){let e=d().$implicit,n=d(2);C(n.cx("selectYear")),s("pBind",n.ptm("selectYear")),D("disabled",n.switchViewButtonDisabled()?"":void 0)("aria-label",n.getTranslation("chooseYear"))("data-pc-group-section","navigator"),l(),$(" ",n.getYear(e)," ")}}function Dh(t,r){if(t&1&&(W(0),m(1),K()),t&2){let e=d(4);l(),In("",e.yearPickerValues()[0]," - ",e.yearPickerValues()[e.yearPickerValues().length-1])}}function Mh(t,r){t&1&&U(0)}function Lh(t,r){if(t&1&&(c(0,"span",20),g(1,Dh,2,2,"ng-container",7)(2,Mh,1,0,"ng-container",22),p()),t&2){let e=d(3);C(e.cx("decade")),s("pBind",e.ptm("decade")),l(),s("ngIf",!e.decadeTemplate&&!e._decadeTemplate),l(),s("ngTemplateOutlet",e.decadeTemplate||e._decadeTemplate)("ngTemplateOutletContext",oe(6,ar,e.yearPickerValues))}}function Ph(t,r){t&1&&(O(),F(0,"svg",33))}function Fh(t,r){}function Rh(t,r){t&1&&g(0,Fh,0,0,"ng-template")}function Bh(t,r){if(t&1&&(W(0),g(1,Rh,1,0,null,6),K()),t&2){let e=d(4);l(),s("ngTemplateOutlet",e.nextIconTemplate||e._nextIconTemplate)}}function Oh(t,r){if(t&1&&g(0,Ph,1,0,"svg",32)(1,Bh,2,1,"ng-container",7),t&2){let e=d(3);s("ngIf",!e.nextIconTemplate&&!e._nextIconTemplate),l(),s("ngIf",e.nextIconTemplate||e._nextIconTemplate)}}function Vh(t,r){if(t&1&&(c(0,"th",20)(1,"span",20),m(2),p()()),t&2){let e=d(4);C(e.cx("weekHeader")),s("pBind",e.ptm("weekHeader")),l(),s("pBind",e.ptm("weekHeaderLabel")),l(),Q(e.getTranslation("weekHeader"))}}function zh(t,r){if(t&1&&(c(0,"th",37)(1,"span",20),m(2),p()()),t&2){let e=r.$implicit,n=d(4);C(n.cx("weekDayCell")),s("pBind",n.ptm("weekDayCell")),l(),C(n.cx("weekDay")),s("pBind",n.ptm("weekDay")),l(),Q(e)}}function qh(t,r){if(t&1&&(c(0,"td",20)(1,"span",20),m(2),p()()),t&2){let e=d().index,n=d(2).$implicit,i=d(2);C(i.cx("weekNumber")),s("pBind",i.ptm("weekNumber")),l(),C(i.cx("weekLabelContainer")),s("pBind",i.ptm("weekLabelContainer")),l(),$(" ",n.weekNumbers[e]," ")}}function Ah(t,r){if(t&1&&(W(0),m(1),K()),t&2){let e=d(2).$implicit;l(),Q(e.day)}}function Nh(t,r){t&1&&U(0)}function Hh(t,r){if(t&1&&(W(0),g(1,Nh,1,0,"ng-container",22),K()),t&2){let e=d(2).$implicit,n=d(5);l(),s("ngTemplateOutlet",n.dateTemplate||n._dateTemplate)("ngTemplateOutletContext",oe(2,ar,e))}}function $h(t,r){t&1&&U(0)}function jh(t,r){if(t&1&&(W(0),g(1,$h,1,0,"ng-container",22),K()),t&2){let e=d(2).$implicit,n=d(5);l(),s("ngTemplateOutlet",n.disabledDateTemplate||n._disabledDateTemplate)("ngTemplateOutletContext",oe(2,ar,e))}}function Uh(t,r){if(t&1&&(c(0,"div",40),m(1),p()),t&2){let e=d(2).$implicit;l(),$(" ",e.day," ")}}function Qh(t,r){if(t&1){let e=P();W(0),c(1,"span",38),x("click",function(i){_(e);let o=d().$implicit,a=d(5);return b(a.onDateSelect(i,o))})("keydown",function(i){_(e);let o=d().$implicit,a=d(3).index,u=d(2);return b(u.onDateCellKeydown(i,o,a))}),g(2,Ah,2,1,"ng-container",7)(3,Hh,2,4,"ng-container",7)(4,jh,2,4,"ng-container",7),p(),g(5,Uh,2,1,"div",39),K()}if(t&2){let e=d().$implicit,n=d(5);l(),s("ngClass",n.dayClass(e))("pBind",n.ptm("day")),D("data-date",n.formatDateKey(n.formatDateMetaToDate(e))),l(),s("ngIf",!n.dateTemplate&&!n._dateTemplate&&(e.selectable||!n.disabledDateTemplate&&!n._disabledDateTemplate)),l(),s("ngIf",e.selectable||!n.disabledDateTemplate&&!n._disabledDateTemplate),l(),s("ngIf",!e.selectable),l(),s("ngIf",n.isSelected(e))}}function Gh(t,r){if(t&1&&(c(0,"td",20),g(1,Qh,6,7,"ng-container",7),p()),t&2){let e=r.$implicit,n=d(5);C(n.cx("dayCell",oe(5,nh,e))),s("pBind",n.ptm("dayCell")),D("aria-label",e.day),l(),s("ngIf",e.otherMonth?n.showOtherMonths:!0)}}function Wh(t,r){if(t&1&&(c(0,"tr",20),g(1,qh,3,7,"td",8)(2,Gh,2,7,"td",24),p()),t&2){let e=r.$implicit,n=d(4);s("pBind",n.ptm("tableBodyRow")),l(),s("ngIf",n.showWeek),l(),s("ngForOf",e)}}function Kh(t,r){if(t&1&&(c(0,"table",34)(1,"thead",20)(2,"tr",20),g(3,Vh,3,5,"th",8)(4,zh,3,7,"th",35),p()(),c(5,"tbody",20),g(6,Wh,3,3,"tr",36),p()()),t&2){let e=d().$implicit,n=d(2);C(n.cx("dayView")),s("pBind",n.ptm("table")),l(),s("pBind",n.ptm("tableHeader")),l(),s("pBind",n.ptm("tableHeaderRow")),l(),s("ngIf",n.showWeek),l(),s("ngForOf",n.weekDays),l(),s("pBind",n.ptm("tableBody")),l(),s("ngForOf",e.dates)}}function Yh(t,r){if(t&1){let e=P();c(0,"div",20)(1,"div",20)(2,"p-button",25),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("onClick",function(i){_(e);let o=d(2);return b(o.onPrevButtonClick(i))}),g(3,Sh,2,2,"ng-template",null,2,Ie),p(),c(5,"div",20),g(6,Ih,2,7,"button",26)(7,Eh,2,7,"button",26)(8,Lh,3,8,"span",8),p(),c(9,"p-button",27),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("onClick",function(i){_(e);let o=d(2);return b(o.onNextButtonClick(i))}),g(10,Oh,2,2,"ng-template",null,2,Ie),p()(),g(12,Kh,7,9,"table",28),p()}if(t&2){let e=r.index,n=d(2);C(n.cx("calendar")),s("pBind",n.ptm("calendar")),l(),C(n.cx("header")),s("pBind",n.ptm("header")),l(),s("styleClass",n.cx("pcPrevButton"))("ngStyle",oe(23,Xl,e===0?"visible":"hidden"))("ariaLabel",n.prevIconAriaLabel)("pt",n.ptm("pcPrevButton")),D("data-pc-group-section","navigator"),l(3),C(n.cx("title")),s("pBind",n.ptm("title")),l(),s("ngIf",n.currentView==="date"),l(),s("ngIf",n.currentView!=="year"),l(),s("ngIf",n.currentView==="year"),l(),s("styleClass",n.cx("pcNextButton"))("ngStyle",oe(25,Xl,e===n.months.length-1?"visible":"hidden"))("ariaLabel",n.nextIconAriaLabel)("pt",n.ptm("pcNextButton")),D("data-pc-group-section","navigator"),l(3),s("ngIf",n.currentView==="date")}}function Zh(t,r){if(t&1&&(c(0,"div",40),m(1),p()),t&2){let e=d().$implicit;l(),$(" ",e," ")}}function Xh(t,r){if(t&1){let e=P();c(0,"span",42),x("click",function(i){let o=_(e).index,a=d(3);return b(a.onMonthSelect(i,o))})("keydown",function(i){let o=_(e).index,a=d(3);return b(a.onMonthCellKeydown(i,o))}),m(1),g(2,Zh,2,1,"div",39),p()}if(t&2){let e=r.$implicit,n=r.index,i=d(3);C(i.cx("month",Pe(5,ih,e,n))),s("pBind",i.ptm("month")),l(),$(" ",e," "),l(),s("ngIf",i.isMonthSelected(n))}}function Jh(t,r){if(t&1&&(c(0,"div",20),g(1,Xh,3,8,"span",41),p()),t&2){let e=d(2);C(e.cx("monthView")),s("pBind",e.ptm("monthView")),l(),s("ngForOf",e.monthPickerValues())}}function e0(t,r){if(t&1&&(c(0,"div",40),m(1),p()),t&2){let e=d().$implicit;l(),$(" ",e," ")}}function t0(t,r){if(t&1){let e=P();c(0,"span",42),x("click",function(i){let o=_(e).$implicit,a=d(3);return b(a.onYearSelect(i,o))})("keydown",function(i){let o=_(e).$implicit,a=d(3);return b(a.onYearCellKeydown(i,o))}),m(1),g(2,e0,2,1,"div",39),p()}if(t&2){let e=r.$implicit,n=d(3);C(n.cx("year",oe(5,oh,e))),s("pBind",n.ptm("year")),l(),$(" ",e," "),l(),s("ngIf",n.isYearSelected(e))}}function n0(t,r){if(t&1&&(c(0,"div",20),g(1,t0,3,7,"span",41),p()),t&2){let e=d(2);C(e.cx("yearView")),s("pBind",e.ptm("yearView")),l(),s("ngForOf",e.yearPickerValues())}}function i0(t,r){if(t&1&&(W(0),c(1,"div",20),g(2,Yh,13,27,"div",24),p(),g(3,Jh,2,4,"div",8)(4,n0,2,4,"div",8),K()),t&2){let e=d();l(),C(e.cx("calendarContainer")),s("pBind",e.ptm("calendarContainer")),l(),s("ngForOf",e.months),l(),s("ngIf",e.currentView==="month"),l(),s("ngIf",e.currentView==="year")}}function o0(t,r){if(t&1&&(O(),F(0,"svg",46)),t&2){let e=d(3);s("pBind",e.ptm("pcIncrementButton").icon)}}function r0(t,r){}function a0(t,r){t&1&&g(0,r0,0,0,"ng-template")}function l0(t,r){if(t&1&&g(0,o0,1,1,"svg",45)(1,a0,1,0,null,6),t&2){let e=d(2);s("ngIf",!e.incrementIconTemplate&&!e._incrementIconTemplate),l(),s("ngTemplateOutlet",e.incrementIconTemplate||e._incrementIconTemplate)}}function s0(t,r){t&1&&(W(0),m(1,"0"),K())}function d0(t,r){if(t&1&&(O(),F(0,"svg",48)),t&2){let e=d(3);s("pBind",e.ptm("pcDecrementButton").icon)}}function c0(t,r){}function p0(t,r){t&1&&g(0,c0,0,0,"ng-template")}function u0(t,r){if(t&1&&g(0,d0,1,1,"svg",47)(1,p0,1,0,null,6),t&2){let e=d(2);s("ngIf",!e.decrementIconTemplate&&!e._decrementIconTemplate),l(),s("ngTemplateOutlet",e.decrementIconTemplate||e._decrementIconTemplate)}}function m0(t,r){if(t&1&&(O(),F(0,"svg",46)),t&2){let e=d(3);s("pBind",e.ptm("pcIncrementButton").icon)}}function h0(t,r){}function f0(t,r){t&1&&g(0,h0,0,0,"ng-template")}function g0(t,r){if(t&1&&g(0,m0,1,1,"svg",45)(1,f0,1,0,null,6),t&2){let e=d(2);s("ngIf",!e.incrementIconTemplate&&!e._incrementIconTemplate),l(),s("ngTemplateOutlet",e.incrementIconTemplate||e._incrementIconTemplate)}}function _0(t,r){t&1&&(W(0),m(1,"0"),K())}function b0(t,r){if(t&1&&(O(),F(0,"svg",48)),t&2){let e=d(3);s("pBind",e.ptm("pcDecrementButton").icon)}}function y0(t,r){}function v0(t,r){t&1&&g(0,y0,0,0,"ng-template")}function x0(t,r){if(t&1&&g(0,b0,1,1,"svg",47)(1,v0,1,0,null,6),t&2){let e=d(2);s("ngIf",!e.decrementIconTemplate&&!e._decrementIconTemplate),l(),s("ngTemplateOutlet",e.decrementIconTemplate||e._decrementIconTemplate)}}function C0(t,r){if(t&1&&(c(0,"div",20)(1,"span",20),m(2),p()()),t&2){let e=d(2);C(e.cx("separator")),s("pBind",e.ptm("separatorContainer")),l(),s("pBind",e.ptm("separator")),l(),Q(e.timeSeparator)}}function w0(t,r){if(t&1&&(O(),F(0,"svg",46)),t&2){let e=d(4);s("pBind",e.ptm("pcIncrementButton").icon)}}function k0(t,r){}function T0(t,r){t&1&&g(0,k0,0,0,"ng-template")}function S0(t,r){if(t&1&&g(0,w0,1,1,"svg",45)(1,T0,1,0,null,6),t&2){let e=d(3);s("ngIf",!e.incrementIconTemplate&&!e._incrementIconTemplate),l(),s("ngTemplateOutlet",e.incrementIconTemplate||e._incrementIconTemplate)}}function I0(t,r){t&1&&(W(0),m(1,"0"),K())}function E0(t,r){if(t&1&&(O(),F(0,"svg",48)),t&2){let e=d(4);s("pBind",e.ptm("pcDecrementButton").icon)}}function D0(t,r){}function M0(t,r){t&1&&g(0,D0,0,0,"ng-template")}function L0(t,r){if(t&1&&g(0,E0,1,1,"svg",47)(1,M0,1,0,null,6),t&2){let e=d(3);s("ngIf",!e.decrementIconTemplate&&!e._decrementIconTemplate),l(),s("ngTemplateOutlet",e.decrementIconTemplate||e._decrementIconTemplate)}}function P0(t,r){if(t&1){let e=P();c(0,"div",20)(1,"p-button",43),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d(2);return b(o.incrementSecond(i))})("keydown.space",function(i){_(e);let o=d(2);return b(o.incrementSecond(i))})("mousedown",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseDown(i,2,1))})("mouseup",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d(2);return b(i.onTimePickerElementMouseLeave())}),g(2,S0,2,2,"ng-template",null,2,Ie),p(),c(4,"span",20),g(5,I0,2,0,"ng-container",7),m(6),p(),c(7,"p-button",43),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d(2);return b(o.decrementSecond(i))})("keydown.space",function(i){_(e);let o=d(2);return b(o.decrementSecond(i))})("mousedown",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseDown(i,2,-1))})("mouseup",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d(2);return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d(2);return b(i.onTimePickerElementMouseLeave())}),g(8,L0,2,2,"ng-template",null,2,Ie),p()()}if(t&2){let e=d(2);C(e.cx("secondPicker")),s("pBind",e.ptm("secondPicker")),l(),s("styleClass",e.cx("pcIncrementButton"))("pt",e.ptm("pcIncrementButton")),D("aria-label",e.getTranslation("nextSecond"))("data-pc-group-section","timepickerbutton"),l(3),s("pBind",e.ptm("second")),l(),s("ngIf",e.currentSecond<10),l(),Q(e.currentSecond),l(),s("styleClass",e.cx("pcDecrementButton"))("pt",e.ptm("pcDecrementButton")),D("aria-label",e.getTranslation("prevSecond"))("data-pc-group-section","timepickerbutton")}}function F0(t,r){if(t&1&&(c(0,"div",20)(1,"span",20),m(2),p()()),t&2){let e=d(2);C(e.cx("separator")),s("pBind",e.ptm("separatorContainer")),l(),s("pBind",e.ptm("separator")),l(),Q(e.timeSeparator)}}function R0(t,r){if(t&1&&(O(),F(0,"svg",46)),t&2){let e=d(4);s("pBind",e.ptm("pcIncrementButton").icon)}}function B0(t,r){}function O0(t,r){t&1&&g(0,B0,0,0,"ng-template")}function V0(t,r){if(t&1&&g(0,R0,1,1,"svg",45)(1,O0,1,0,null,6),t&2){let e=d(3);s("ngIf",!e.incrementIconTemplate&&!e._incrementIconTemplate),l(),s("ngTemplateOutlet",e.incrementIconTemplate||e._incrementIconTemplate)}}function z0(t,r){if(t&1&&(O(),F(0,"svg",48)),t&2){let e=d(4);s("pBind",e.ptm("pcDecrementButton").icon)}}function q0(t,r){}function A0(t,r){t&1&&g(0,q0,0,0,"ng-template")}function N0(t,r){if(t&1&&g(0,z0,1,1,"svg",47)(1,A0,1,0,null,6),t&2){let e=d(3);s("ngIf",!e.decrementIconTemplate&&!e._decrementIconTemplate),l(),s("ngTemplateOutlet",e.decrementIconTemplate||e._decrementIconTemplate)}}function H0(t,r){if(t&1){let e=P();c(0,"div",20)(1,"p-button",49),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("onClick",function(i){_(e);let o=d(2);return b(o.toggleAMPM(i))})("keydown.enter",function(i){_(e);let o=d(2);return b(o.toggleAMPM(i))}),g(2,V0,2,2,"ng-template",null,2,Ie),p(),c(4,"span",20),m(5),p(),c(6,"p-button",50),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("click",function(i){_(e);let o=d(2);return b(o.toggleAMPM(i))})("keydown.enter",function(i){_(e);let o=d(2);return b(o.toggleAMPM(i))}),g(7,N0,2,2,"ng-template",null,2,Ie),p()()}if(t&2){let e=d(2);C(e.cx("ampmPicker")),s("pBind",e.ptm("ampmPicker")),l(),s("styleClass",e.cx("pcIncrementButton"))("pt",e.ptm("pcIncrementButton")),D("aria-label",e.getTranslation("am"))("data-pc-group-section","timepickerbutton"),l(3),s("pBind",e.ptm("ampm")),l(),Q(e.pm?"PM":"AM"),l(),s("styleClass",e.cx("pcDecrementButton"))("pt",e.ptm("pcDecrementButton")),D("aria-label",e.getTranslation("pm"))("data-pc-group-section","timepickerbutton")}}function $0(t,r){if(t&1){let e=P();c(0,"div",20)(1,"div",20)(2,"p-button",43),x("keydown",function(i){_(e);let o=d();return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d();return b(o.incrementHour(i))})("keydown.space",function(i){_(e);let o=d();return b(o.incrementHour(i))})("mousedown",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseDown(i,0,1))})("mouseup",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d();return b(i.onTimePickerElementMouseLeave())}),g(3,l0,2,2,"ng-template",null,2,Ie),p(),c(5,"span",20),g(6,s0,2,0,"ng-container",7),m(7),p(),c(8,"p-button",43),x("keydown",function(i){_(e);let o=d();return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d();return b(o.decrementHour(i))})("keydown.space",function(i){_(e);let o=d();return b(o.decrementHour(i))})("mousedown",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseDown(i,0,-1))})("mouseup",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d();return b(i.onTimePickerElementMouseLeave())}),g(9,u0,2,2,"ng-template",null,2,Ie),p()(),c(11,"div",44)(12,"span",20),m(13),p()(),c(14,"div",20)(15,"p-button",43),x("keydown",function(i){_(e);let o=d();return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d();return b(o.incrementMinute(i))})("keydown.space",function(i){_(e);let o=d();return b(o.incrementMinute(i))})("mousedown",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseDown(i,1,1))})("mouseup",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d();return b(i.onTimePickerElementMouseLeave())}),g(16,g0,2,2,"ng-template",null,2,Ie),p(),c(18,"span",20),g(19,_0,2,0,"ng-container",7),m(20),p(),c(21,"p-button",43),x("keydown",function(i){_(e);let o=d();return b(o.onContainerButtonKeydown(i))})("keydown.enter",function(i){_(e);let o=d();return b(o.decrementMinute(i))})("keydown.space",function(i){_(e);let o=d();return b(o.decrementMinute(i))})("mousedown",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseDown(i,1,-1))})("mouseup",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.enter",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("keyup.space",function(i){_(e);let o=d();return b(o.onTimePickerElementMouseUp(i))})("mouseleave",function(){_(e);let i=d();return b(i.onTimePickerElementMouseLeave())}),g(22,x0,2,2,"ng-template",null,2,Ie),p()(),g(24,C0,3,5,"div",8)(25,P0,10,14,"div",8)(26,F0,3,5,"div",8)(27,H0,9,13,"div",8),p()}if(t&2){let e=d();C(e.cx("timePicker")),s("pBind",e.ptm("timePicker")),l(),C(e.cx("hourPicker")),s("pBind",e.ptm("hourPicker")),l(),s("styleClass",e.cx("pcIncrementButton"))("pt",e.ptm("pcIncrementButton")),D("aria-label",e.getTranslation("nextHour"))("data-pc-group-section","timepickerbutton"),l(3),s("pBind",e.ptm("hour")),l(),s("ngIf",e.currentHour<10),l(),Q(e.currentHour),l(),s("styleClass",e.cx("pcDecrementButton"))("pt",e.ptm("pcDecrementButton")),D("aria-label",e.getTranslation("prevHour"))("data-pc-group-section","timepickerbutton"),l(3),s("pBind",e.ptm("separatorContainer")),l(),s("pBind",e.ptm("separator")),l(),Q(e.timeSeparator),l(),C(e.cx("minutePicker")),s("pBind",e.ptm("minutePicker")),l(),s("styleClass",e.cx("pcIncrementButton"))("pt",e.ptm("pcIncrementButton")),D("aria-label",e.getTranslation("nextMinute"))("data-pc-group-section","timepickerbutton"),l(3),s("pBind",e.ptm("minute")),l(),s("ngIf",e.currentMinute<10),l(),Q(e.currentMinute),l(),s("styleClass",e.cx("pcDecrementButton"))("pt",e.ptm("pcDecrementButton")),D("aria-label",e.getTranslation("prevMinute"))("data-pc-group-section","timepickerbutton"),l(3),s("ngIf",e.showSeconds),l(),s("ngIf",e.showSeconds),l(),s("ngIf",e.hourFormat=="12"),l(),s("ngIf",e.hourFormat=="12")}}function j0(t,r){t&1&&U(0)}function U0(t,r){if(t&1&&g(0,j0,1,0,"ng-container",22),t&2){let e=d(2);s("ngTemplateOutlet",e.buttonBarTemplate||e._buttonBarTemplate)("ngTemplateOutletContext",Pe(2,rh,e.onTodayButtonClick.bind(e),e.onClearButtonClick.bind(e)))}}function Q0(t,r){if(t&1){let e=P();c(0,"p-button",51),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("onClick",function(i){_(e);let o=d(2);return b(o.onTodayButtonClick(i))}),p(),c(1,"p-button",51),x("keydown",function(i){_(e);let o=d(2);return b(o.onContainerButtonKeydown(i))})("onClick",function(i){_(e);let o=d(2);return b(o.onClearButtonClick(i))}),p()}if(t&2){let e=d(2);s("styleClass",e.cx("pcTodayButton"))("label",e.getTranslation("today"))("ngClass",e.todayButtonStyleClass)("pt",e.ptm("pcTodayButton")),D("data-pc-group-section","button"),l(),s("styleClass",e.cx("pcClearButton"))("label",e.getTranslation("clear"))("ngClass",e.clearButtonStyleClass)("pt",e.ptm("pcClearButton")),D("data-pc-group-section","button")}}function G0(t,r){if(t&1&&(c(0,"div",20),V(1,U0,1,5,"ng-container")(2,Q0,2,10),p()),t&2){let e=d();C(e.cx("buttonbar")),s("pBind",e.ptm("buttonbar")),l(),z(e.buttonBarTemplate||e._buttonBarTemplate?1:2)}}function W0(t,r){t&1&&U(0)}var K0=`
${Zl}

/* For PrimeNG */
.p-datepicker.ng-invalid.ng-dirty .p-inputtext {
    border-color: dt('inputtext.invalid.border.color');
}
`,Y0={root:()=>({position:"relative"})},Z0={root:({instance:t})=>["p-datepicker p-component p-inputwrapper",{"p-invalid":t.invalid(),"p-datepicker-fluid":t.hasFluid,"p-inputwrapper-filled":t.$filled(),"p-variant-filled":t.$variant()==="filled","p-inputwrapper-focus":t.focus||t.overlayVisible,"p-focus":t.focus||t.overlayVisible}],pcInputText:"p-datepicker-input",dropdown:"p-datepicker-dropdown",inputIconContainer:"p-datepicker-input-icon-container",inputIcon:"p-datepicker-input-icon",panel:({instance:t})=>["p-datepicker-panel p-component",{"p-datepicker-panel p-component":!0,"p-datepicker-panel-inline":t.inline,"p-disabled":t.$disabled(),"p-datepicker-timeonly":t.timeOnly}],calendarContainer:"p-datepicker-calendar-container",calendar:"p-datepicker-calendar",header:"p-datepicker-header",pcPrevButton:"p-datepicker-prev-button",title:"p-datepicker-title",selectMonth:"p-datepicker-select-month",selectYear:"p-datepicker-select-year",decade:"p-datepicker-decade",pcNextButton:"p-datepicker-next-button",dayView:"p-datepicker-day-view",weekHeader:"p-datepicker-weekheader p-disabled",weekNumber:"p-datepicker-weeknumber",weekLabelContainer:"p-datepicker-weeklabel-container p-disabled",weekDayCell:"p-datepicker-weekday-cell",weekDay:"p-datepicker-weekday",dayCell:({date:t})=>["p-datepicker-day-cell",{"p-datepicker-other-month":t.otherMonth,"p-datepicker-today":t.today}],day:({instance:t,date:r})=>{let e="";if(t.isRangeSelection()&&t.isSelected(r)&&r.selectable){let n=t.value[0],i=t.value[1],o=n&&r.year===n.getFullYear()&&r.month===n.getMonth()&&r.day===n.getDate(),a=i&&r.year===i.getFullYear()&&r.month===i.getMonth()&&r.day===i.getDate();e=o||a?"p-datepicker-day-selected":"p-datepicker-day-selected-range"}return{"p-datepicker-day":!0,"p-datepicker-day-selected":!t.isRangeSelection()&&t.isSelected(r)&&r.selectable,"p-disabled":t.$disabled()||!r.selectable,[e]:!0}},monthView:"p-datepicker-month-view",month:({instance:t,index:r})=>["p-datepicker-month",{"p-datepicker-month-selected":t.isMonthSelected(r),"p-disabled":t.isMonthDisabled(r)}],yearView:"p-datepicker-year-view",year:({instance:t,year:r})=>["p-datepicker-year",{"p-datepicker-year-selected":t.isYearSelected(r),"p-disabled":t.isYearDisabled(r)}],timePicker:"p-datepicker-time-picker",hourPicker:"p-datepicker-hour-picker",pcIncrementButton:"p-datepicker-increment-button",pcDecrementButton:"p-datepicker-decrement-button",separator:"p-datepicker-separator",minutePicker:"p-datepicker-minute-picker",secondPicker:"p-datepicker-second-picker",ampmPicker:"p-datepicker-ampm-picker",buttonbar:"p-datepicker-buttonbar",pcTodayButton:"p-datepicker-today-button",pcClearButton:"p-datepicker-clear-button",clearIcon:"p-datepicker-clear-icon"},Jl=(()=>{class t extends fe{name="datepicker";style=K0;classes=Z0;inlineStyles=Y0;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var X0={provide:lt,useExisting:ot(()=>ts),multi:!0},es=new ae("DATEPICKER_INSTANCE"),ts=(()=>{class t extends Hn{zone;overlayService;componentName="DatePicker";bindDirectiveInstance=v(A,{self:!0});$pcDatePicker=v(es,{optional:!0,skipSelf:!0})??void 0;iconDisplay="button";styleClass;inputStyle;inputId;inputStyleClass;placeholder;ariaLabelledBy;ariaLabel;iconAriaLabel;get dateFormat(){return this._dateFormat}set dateFormat(e){this._dateFormat=e,this.initialized&&this.updateInputfield()}multipleSeparator=",";rangeSeparator="-";inline=!1;showOtherMonths=!0;selectOtherMonths;showIcon;icon;readonlyInput;shortYearCutoff="+10";get hourFormat(){return this._hourFormat}set hourFormat(e){this._hourFormat=e,this.initialized&&this.updateInputfield()}timeOnly;stepHour=1;stepMinute=1;stepSecond=1;showSeconds=!1;showOnFocus=!0;showWeek=!1;startWeekFromFirstDayOfYear=!1;showClear=!1;dataType="date";selectionMode="single";maxDateCount;showButtonBar;todayButtonStyleClass;clearButtonStyleClass;autofocus;autoZIndex=!0;baseZIndex=0;panelStyleClass;panelStyle;keepInvalid=!1;hideOnDateTimeSelect=!0;touchUI;timeSeparator=":";focusTrap=!0;showTransitionOptions=".12s cubic-bezier(0, 0, 0.2, 1)";hideTransitionOptions=".1s linear";tabindex;get minDate(){return this._minDate}set minDate(e){this._minDate=e,this.currentMonth!=null&&this.currentMonth!=null&&this.currentYear&&this.createMonths(this.currentMonth,this.currentYear)}get maxDate(){return this._maxDate}set maxDate(e){this._maxDate=e,this.currentMonth!=null&&this.currentMonth!=null&&this.currentYear&&this.createMonths(this.currentMonth,this.currentYear)}get disabledDates(){return this._disabledDates}set disabledDates(e){this._disabledDates=e,this.currentMonth!=null&&this.currentMonth!=null&&this.currentYear&&this.createMonths(this.currentMonth,this.currentYear)}get disabledDays(){return this._disabledDays}set disabledDays(e){this._disabledDays=e,this.currentMonth!=null&&this.currentMonth!=null&&this.currentYear&&this.createMonths(this.currentMonth,this.currentYear)}get showTime(){return this._showTime}set showTime(e){this._showTime=e,this.currentHour===void 0&&this.initTime(this.value||new Date),this.updateInputfield()}get responsiveOptions(){return this._responsiveOptions}set responsiveOptions(e){this._responsiveOptions=e,this.destroyResponsiveStyleElement(),this.createResponsiveStyle()}get numberOfMonths(){return this._numberOfMonths}set numberOfMonths(e){this._numberOfMonths=e,this.destroyResponsiveStyleElement(),this.createResponsiveStyle()}get firstDayOfWeek(){return this._firstDayOfWeek}set firstDayOfWeek(e){this._firstDayOfWeek=e,this.createWeekDays()}get view(){return this._view}set view(e){this._view=e,this.currentView=this._view}get defaultDate(){return this._defaultDate}set defaultDate(e){if(this._defaultDate=e,this.initialized){let n=e||new Date;this.currentMonth=n.getMonth(),this.currentYear=n.getFullYear(),this.initTime(n),this.createMonths(this.currentMonth,this.currentYear)}}appendTo=ee(void 0);motionOptions=ee(void 0);computedMotionOptions=J(()=>G(G({},this.ptm("motion")),this.motionOptions()));onFocus=new I;onBlur=new I;onClose=new I;onSelect=new I;onClear=new I;onInput=new I;onTodayClick=new I;onClearClick=new I;onMonthChange=new I;onYearChange=new I;onClickOutside=new I;onShow=new I;inputfieldViewChild;set content(e){this.contentViewChild=e,this.contentViewChild&&this.overlay&&(this.isMonthNavigate?(Promise.resolve(null).then(()=>this.updateFocus()),this.isMonthNavigate=!1):!this.focus&&!this.inline&&this.initFocusableCell())}_componentStyle=v(Jl);contentViewChild;value;dates;months;weekDays;currentMonth;currentYear;currentHour;currentMinute;currentSecond;p;pm;mask;maskClickListener;overlay;responsiveStyleElement;overlayVisible;overlayMinWidth;$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());calendarElement;timePickerTimer;documentClickListener;animationEndListener;ticksTo1970;yearOptions;focus;isKeydown;_minDate;_maxDate;_dateFormat;_hourFormat="24";_showTime;_yearRange;preventDocumentListener;dayClass(e){return this._componentStyle.classes.day({instance:this,date:e})}dateTemplate;headerTemplate;footerTemplate;disabledDateTemplate;decadeTemplate;previousIconTemplate;nextIconTemplate;triggerIconTemplate;clearIconTemplate;decrementIconTemplate;incrementIconTemplate;inputIconTemplate;buttonBarTemplate;_dateTemplate;_headerTemplate;_footerTemplate;_disabledDateTemplate;_decadeTemplate;_previousIconTemplate;_nextIconTemplate;_triggerIconTemplate;_clearIconTemplate;_decrementIconTemplate;_incrementIconTemplate;_inputIconTemplate;_buttonBarTemplate;_disabledDates;_disabledDays;selectElement;todayElement;focusElement;scrollHandler;documentResizeListener;navigationState=null;isMonthNavigate;initialized;translationSubscription;_locale;_responsiveOptions;currentView;attributeSelector;panelId;_numberOfMonths=1;_firstDayOfWeek;_view="date";preventFocus;_defaultDate;_focusKey=null;window;get locale(){return this._locale}get iconButtonAriaLabel(){return this.iconAriaLabel?this.iconAriaLabel:this.getTranslation("chooseDate")}get prevIconAriaLabel(){return this.currentView==="year"?this.getTranslation("prevDecade"):this.currentView==="month"?this.getTranslation("prevYear"):this.getTranslation("prevMonth")}get nextIconAriaLabel(){return this.currentView==="year"?this.getTranslation("nextDecade"):this.currentView==="month"?this.getTranslation("nextYear"):this.getTranslation("nextMonth")}constructor(e,n){super(),this.zone=e,this.overlayService=n,this.window=this.document.defaultView}onInit(){this.attributeSelector=Te("pn_id_"),this.panelId=this.attributeSelector+"_panel";let e=this.defaultDate||new Date;this.createResponsiveStyle(),this.currentMonth=e.getMonth(),this.currentYear=e.getFullYear(),this.yearOptions=[],this.currentView=this.view,this.view==="date"&&(this.createWeekDays(),this.initTime(e),this.createMonths(this.currentMonth,this.currentYear),this.ticksTo1970=(1969*365+Math.floor(1970/4)-Math.floor(1970/100)+Math.floor(1970/400))*24*60*60*1e7),this.translationSubscription=this.config.translationObserver.subscribe(()=>{this.createWeekDays(),this.cd.markForCheck()}),this.initialized=!0}onAfterViewInit(){this.inline?this.contentViewChild&&this.contentViewChild.nativeElement.setAttribute(this.attributeSelector,""):!this.$disabled()&&this.overlay&&(this.initFocusableCell(),this.numberOfMonths===1&&this.contentViewChild&&this.contentViewChild.nativeElement&&(this.contentViewChild.nativeElement.style.width=Ye(this.el?.nativeElement)+"px"))}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}templates;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"date":this._dateTemplate=e.template;break;case"decade":this._decadeTemplate=e.template;break;case"disabledDate":this._disabledDateTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"inputicon":this._inputIconTemplate=e.template;break;case"buttonbar":this._buttonBarTemplate=e.template;break;case"previousicon":this._previousIconTemplate=e.template;break;case"nexticon":this._nextIconTemplate=e.template;break;case"triggericon":this._triggerIconTemplate=e.template;break;case"clearicon":this._clearIconTemplate=e.template;break;case"decrementicon":this._decrementIconTemplate=e.template;break;case"incrementicon":this._incrementIconTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;default:this._dateTemplate=e.template;break}})}getTranslation(e){return this.config.getTranslation(e)}populateYearOptions(e,n){this.yearOptions=[];for(let i=e;i<=n;i++)this.yearOptions.push(i)}createWeekDays(){this.weekDays=[];let e=this.getFirstDateOfWeek(),n=this.getTranslation(Ze.DAY_NAMES_MIN);for(let i=0;i<7;i++)this.weekDays.push(n[e]),e=e==6?0:++e}monthPickerValues(){let e=[];for(let n=0;n<=11;n++)e.push(this.config.getTranslation("monthNamesShort")[n]);return e}yearPickerValues(){let e=[],n=this.currentYear-this.currentYear%10;for(let i=0;i<10;i++)e.push(n+i);return e}createMonths(e,n){this.months=this.months=[];for(let i=0;i<this.numberOfMonths;i++){let o=e+i,a=n;o>11&&(o=o%12,a=n+Math.floor((e+i)/12)),this.months.push(this.createMonth(o,a))}}getWeekNumber(e){let n=new Date(e.getTime());if(this.startWeekFromFirstDayOfYear){let o=+this.getFirstDateOfWeek();n.setDate(n.getDate()+6+o-n.getDay())}else n.setDate(n.getDate()+4-(n.getDay()||7));let i=n.getTime();return n.setMonth(0),n.setDate(1),Math.floor(Math.round((i-n.getTime())/864e5)/7)+1}createMonth(e,n){let i=[],o=this.getFirstDayOfMonthIndex(e,n),a=this.getDaysCountInMonth(e,n),u=this.getDaysCountInPrevMonth(e,n),h=1,f=new Date,y=[],S=Math.ceil((a+o)/7);for(let N=0;N<S;N++){let B=[];if(N==0){for(let j=u-o+1;j<=u;j++){let H=this.getPreviousMonthAndYear(e,n);B.push({day:j,month:H.month,year:H.year,otherMonth:!0,today:this.isToday(f,j,H.month,H.year),selectable:this.isSelectable(j,H.month,H.year,!0)})}let q=7-B.length;for(let j=0;j<q;j++)B.push({day:h,month:e,year:n,today:this.isToday(f,h,e,n),selectable:this.isSelectable(h,e,n,!1)}),h++}else for(let q=0;q<7;q++){if(h>a){let j=this.getNextMonthAndYear(e,n);B.push({day:h-a,month:j.month,year:j.year,otherMonth:!0,today:this.isToday(f,h-a,j.month,j.year),selectable:this.isSelectable(h-a,j.month,j.year,!0)})}else B.push({day:h,month:e,year:n,today:this.isToday(f,h,e,n),selectable:this.isSelectable(h,e,n,!1)});h++}this.showWeek&&y.push(this.getWeekNumber(new Date(B[0].year,B[0].month,B[0].day))),i.push(B)}return{month:e,year:n,dates:i,weekNumbers:y}}initTime(e){this.pm=e.getHours()>11,this.showTime?(this.currentMinute=e.getMinutes(),this.currentSecond=this.showSeconds?e.getSeconds():0,this.setCurrentHourPM(e.getHours())):this.timeOnly&&(this.currentMinute=0,this.currentHour=0,this.currentSecond=0)}navBackward(e){if(this.$disabled()){e.preventDefault();return}this.isMonthNavigate=!0,this.currentView==="month"?(this.decrementYear(),setTimeout(()=>{this.updateFocus()},1)):this.currentView==="year"?(this.decrementDecade(),setTimeout(()=>{this.updateFocus()},1)):(this.currentMonth===0?(this.currentMonth=11,this.decrementYear()):this.currentMonth--,this.onMonthChange.emit({month:this.currentMonth+1,year:this.currentYear}),this.createMonths(this.currentMonth,this.currentYear))}navForward(e){if(this.$disabled()){e.preventDefault();return}this.isMonthNavigate=!0,this.currentView==="month"?(this.incrementYear(),setTimeout(()=>{this.updateFocus()},1)):this.currentView==="year"?(this.incrementDecade(),setTimeout(()=>{this.updateFocus()},1)):(this.currentMonth===11?(this.currentMonth=0,this.incrementYear()):this.currentMonth++,this.onMonthChange.emit({month:this.currentMonth+1,year:this.currentYear}),this.createMonths(this.currentMonth,this.currentYear))}decrementYear(){this.currentYear--;let e=this.yearOptions;if(this.currentYear<e[0]){let n=e[e.length-1]-e[0];this.populateYearOptions(e[0]-n,e[e.length-1]-n)}}decrementDecade(){this.currentYear=this.currentYear-10}incrementDecade(){this.currentYear=this.currentYear+10}incrementYear(){this.currentYear++;let e=this.yearOptions;if(this.currentYear>e[e.length-1]){let n=e[e.length-1]-e[0];this.populateYearOptions(e[0]+n,e[e.length-1]+n)}}switchToMonthView(e){this.setCurrentView("month"),e.preventDefault()}switchToYearView(e){this.setCurrentView("year"),e.preventDefault()}onDateSelect(e,n){if(this.$disabled()||!n.selectable){e.preventDefault();return}this.isMultipleSelection()&&this.isSelected(n)?(this.value=this.value.filter((i,o)=>!this.isDateEquals(i,n)),this.value.length===0&&(this.value=null),this.updateModel(this.value)):this.shouldSelectDate(n)&&this.selectDate(n),this.hideOnDateTimeSelect&&(this.isSingleSelection()||this.isRangeSelection()&&this.value[1])&&setTimeout(()=>{e.preventDefault(),this.hideOverlay(),this.mask&&this.disableModality(),this.cd.markForCheck()},150),this.updateInputfield(),e.preventDefault()}shouldSelectDate(e){return this.isMultipleSelection()&&this.maxDateCount!=null?this.maxDateCount>(this.value?this.value.length:0):!0}onMonthSelect(e,n){this.view==="month"?this.onDateSelect(e,{year:this.currentYear,month:n,day:1,selectable:!0}):(this.currentMonth=n,this.createMonths(this.currentMonth,this.currentYear),this.setCurrentView("date"),this.onMonthChange.emit({month:this.currentMonth+1,year:this.currentYear}))}onYearSelect(e,n){this.view==="year"?this.onDateSelect(e,{year:n,month:0,day:1,selectable:!0}):(this.currentYear=n,this.setCurrentView("month"),this.onYearChange.emit({month:this.currentMonth+1,year:this.currentYear}))}updateInputfield(){let e="";if(this.value){if(this.isSingleSelection())e=this.formatDateTime(this.value);else if(this.isMultipleSelection())for(let n=0;n<this.value.length;n++){let i=this.formatDateTime(this.value[n]);e+=i,n!==this.value.length-1&&(e+=this.multipleSeparator+" ")}else if(this.isRangeSelection()&&this.value&&this.value.length){let n=this.value[0],i=this.value[1];e=this.formatDateTime(n),i&&(e+=" "+this.rangeSeparator+" "+this.formatDateTime(i))}}this.writeModelValue(e),this.inputFieldValue=e,this.inputfieldViewChild&&this.inputfieldViewChild.nativeElement&&(this.inputfieldViewChild.nativeElement.value=this.inputFieldValue)}inputFieldValue=null;formatDateTime(e){let n=this.keepInvalid?e:null,i=this.isValidDateForTimeConstraints(e);return this.isValidDate(e)?this.timeOnly?n=this.formatTime(e):(n=this.formatDate(e,this.getDateFormat()),this.showTime&&(n+=" "+this.formatTime(e))):this.dataType==="string"&&(n=e),n=i?n:"",n}formatDateMetaToDate(e){return new Date(e.year,e.month,e.day)}formatDateKey(e){return`${e.getFullYear()}-${e.getMonth()}-${e.getDate()}`}setCurrentHourPM(e){this.hourFormat=="12"?(this.pm=e>11,e>=12?this.currentHour=e==12?12:e-12:this.currentHour=e==0?12:e):this.currentHour=e}setCurrentView(e){this.currentView=e,this.cd.detectChanges(),this.alignOverlay()}selectDate(e){let n=this.formatDateMetaToDate(e);if(this.showTime&&(this.hourFormat=="12"?this.currentHour===12?n.setHours(this.pm?12:0):n.setHours(this.pm?this.currentHour+12:this.currentHour):n.setHours(this.currentHour),n.setMinutes(this.currentMinute),n.setSeconds(this.currentSecond)),this.minDate&&this.minDate>n&&(n=this.minDate,this.setCurrentHourPM(n.getHours()),this.currentMinute=n.getMinutes(),this.currentSecond=n.getSeconds()),this.maxDate&&this.maxDate<n&&(n=this.maxDate,this.setCurrentHourPM(n.getHours()),this.currentMinute=n.getMinutes(),this.currentSecond=n.getSeconds()),this.isSingleSelection())this.updateModel(n);else if(this.isMultipleSelection())this.updateModel(this.value?[...this.value,n]:[n]);else if(this.isRangeSelection())if(this.value&&this.value.length){let i=this.value[0],o=this.value[1];!o&&n.getTime()>=i.getTime()?o=n:(i=n,o=null),this.updateModel([i,o])}else this.updateModel([n,null]);this.onSelect.emit(n)}updateModel(e){if(this.value=e,this.dataType=="date")this.writeModelValue(this.value),this.onModelChange(this.value);else if(this.dataType=="string")if(this.isSingleSelection())this.onModelChange(this.formatDateTime(this.value));else{let n=null;Array.isArray(this.value)&&(n=this.value.map(i=>this.formatDateTime(i))),this.writeModelValue(n),this.onModelChange(n)}}getFirstDayOfMonthIndex(e,n){let i=new Date;i.setDate(1),i.setMonth(e),i.setFullYear(n);let o=i.getDay()+this.getSundayIndex();return o>=7?o-7:o}getDaysCountInMonth(e,n){return 32-this.daylightSavingAdjust(new Date(n,e,32)).getDate()}getDaysCountInPrevMonth(e,n){let i=this.getPreviousMonthAndYear(e,n);return this.getDaysCountInMonth(i.month,i.year)}getPreviousMonthAndYear(e,n){let i,o;return e===0?(i=11,o=n-1):(i=e-1,o=n),{month:i,year:o}}getNextMonthAndYear(e,n){let i,o;return e===11?(i=0,o=n+1):(i=e+1,o=n),{month:i,year:o}}getSundayIndex(){let e=this.getFirstDateOfWeek();return e>0?7-e:0}isSelected(e){if(this.value){if(this.isSingleSelection())return this.isDateEquals(this.value,e);if(this.isMultipleSelection()){let n=!1;for(let i of this.value)if(n=this.isDateEquals(i,e),n)break;return n}else if(this.isRangeSelection())return this.value[1]?this.isDateEquals(this.value[0],e)||this.isDateEquals(this.value[1],e)||this.isDateBetween(this.value[0],this.value[1],e):this.isDateEquals(this.value[0],e)}else return!1}isComparable(){return this.value!=null&&typeof this.value!="string"}isMonthSelected(e){if(!this.isComparable())return!1;if(this.isMultipleSelection())return this.value.some(n=>n.getMonth()===e&&n.getFullYear()===this.currentYear);if(this.isRangeSelection())if(this.value[1]){let n=new Date(this.currentYear,e,1),i=new Date(this.value[0].getFullYear(),this.value[0].getMonth(),1),o=new Date(this.value[1].getFullYear(),this.value[1].getMonth(),1);return n>=i&&n<=o}else return this.value[0]?.getFullYear()===this.currentYear&&this.value[0]?.getMonth()===e;else return this.value.getMonth()===e&&this.value.getFullYear()===this.currentYear}isMonthDisabled(e,n){let i=n??this.currentYear;for(let o=1;o<this.getDaysCountInMonth(e,i)+1;o++)if(this.isSelectable(o,e,i,!1))return!1;return!0}isYearDisabled(e){return Array(12).fill(0).every((n,i)=>this.isMonthDisabled(i,e))}isYearSelected(e){if(this.isComparable()){let n=this.isRangeSelection()?this.value[0]:this.value;return this.isMultipleSelection()?!1:n.getFullYear()===e}return!1}isDateEquals(e,n){return e&&ni(e)?e.getDate()===n.day&&e.getMonth()===n.month&&e.getFullYear()===n.year:!1}isDateBetween(e,n,i){let o=!1;if(ni(e)&&ni(n)){let a=this.formatDateMetaToDate(i);return e.getTime()<=a.getTime()&&n.getTime()>=a.getTime()}return o}isSingleSelection(){return this.selectionMode==="single"}isRangeSelection(){return this.selectionMode==="range"}isMultipleSelection(){return this.selectionMode==="multiple"}isToday(e,n,i,o){return e.getDate()===n&&e.getMonth()===i&&e.getFullYear()===o}isSelectable(e,n,i,o){let a=!0,u=!0,h=!0,f=!0;return o&&!this.selectOtherMonths?!1:(this.minDate&&(this.minDate.getFullYear()>i||this.minDate.getFullYear()===i&&this.currentView!="year"&&(this.minDate.getMonth()>n||this.minDate.getMonth()===n&&this.minDate.getDate()>e))&&(a=!1),this.maxDate&&(this.maxDate.getFullYear()<i||this.maxDate.getFullYear()===i&&(this.maxDate.getMonth()<n||this.maxDate.getMonth()===n&&this.maxDate.getDate()<e))&&(u=!1),this.disabledDates&&(h=!this.isDateDisabled(e,n,i)),this.disabledDays&&(f=!this.isDayDisabled(e,n,i)),a&&u&&h&&f)}isDateDisabled(e,n,i){if(this.disabledDates){for(let o of this.disabledDates)if(o.getFullYear()===i&&o.getMonth()===n&&o.getDate()===e)return!0}return!1}isDayDisabled(e,n,i){if(this.disabledDays){let a=new Date(i,n,e).getDay();return this.disabledDays.indexOf(a)!==-1}return!1}onInputFocus(e){this.focus=!0,this.showOnFocus&&this.showOverlay(),this.onFocus.emit(e)}onInputClick(){this.showOnFocus&&!this.overlayVisible&&this.showOverlay()}onInputBlur(e){this.focus=!1,this.onBlur.emit(e),this.keepInvalid||this.updateInputfield(),this.onModelTouched()}onButtonClick(e,n=this.inputfieldViewChild?.nativeElement){this.$disabled()||(this.overlayVisible?this.hideOverlay():(n.focus(),this.showOverlay()))}clear(){this.value=null,this.inputFieldValue=null,this.writeModelValue(this.value),this.onModelChange(this.value),this.updateInputfield(),this.onClear.emit()}onOverlayClick(e){this.overlayService.add({originalEvent:e,target:this.el.nativeElement})}getMonthName(e){return this.config.getTranslation("monthNames")[e]}getYear(e){return this.currentView==="month"?this.currentYear:e.year}switchViewButtonDisabled(){return this.numberOfMonths>1||this.$disabled()}onPrevButtonClick(e){this.navigationState={backward:!0,button:!0},this.navBackward(e)}onNextButtonClick(e){this.navigationState={backward:!1,button:!0},this.navForward(e)}onContainerButtonKeydown(e){switch(e.which){case 9:if(this.inline||this.trapFocus(e),this.inline){let n=Ee(this.el?.nativeElement,".p-datepicker-header"),i=e.target;if(this.timeOnly)return;i==n?.children[n?.children?.length-1]&&this.initFocusableCell()}break;case 27:this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,e.preventDefault();break;default:break}}onInputKeydown(e){this.isKeydown=!0,e.keyCode===40&&this.contentViewChild?this.trapFocus(e):e.keyCode===27?this.overlayVisible&&(this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,e.preventDefault()):e.keyCode===13?this.overlayVisible&&(this.overlayVisible=!1,e.preventDefault()):e.keyCode===9&&this.contentViewChild&&(Jn(this.contentViewChild.nativeElement).forEach(n=>n.tabIndex="-1"),this.overlayVisible&&(this.overlayVisible=!1))}onDateCellKeydown(e,n,i){let o=e.currentTarget,a=o.parentElement,u=this.formatDateMetaToDate(n);switch(e.which){case 40:{o.tabIndex="-1";let q=ei(a),j=a.parentElement.nextElementSibling;if(j){let H=j.children[q].children[0];Ke(H,"p-disabled")?(this.navigationState={backward:!1},this.navForward(e)):(j.children[q].children[0].tabIndex="0",j.children[q].children[0].focus())}else this.navigationState={backward:!1},this.navForward(e);e.preventDefault();break}case 38:{o.tabIndex="-1";let q=ei(a),j=a.parentElement.previousElementSibling;if(j){let H=j.children[q].children[0];Ke(H,"p-disabled")?(this.navigationState={backward:!0},this.navBackward(e)):(H.tabIndex="0",H.focus())}else this.navigationState={backward:!0},this.navBackward(e);e.preventDefault();break}case 37:{o.tabIndex="-1";let q=a.previousElementSibling;if(q){let j=q.children[0];Ke(j,"p-disabled")||Ke(j.parentElement,"p-datepicker-weeknumber")?this.navigateToMonth(!0,i):(j.tabIndex="0",j.focus())}else this.navigateToMonth(!0,i);e.preventDefault();break}case 39:{o.tabIndex="-1";let q=a.nextElementSibling;if(q){let j=q.children[0];Ke(j,"p-disabled")?this.navigateToMonth(!1,i):(j.tabIndex="0",j.focus())}else this.navigateToMonth(!1,i);e.preventDefault();break}case 13:case 32:{this.onDateSelect(e,n),e.preventDefault();break}case 27:{this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,e.preventDefault();break}case 9:{this.inline||this.trapFocus(e);break}case 33:{o.tabIndex="-1";let q=new Date(u.getFullYear(),u.getMonth()-1,u.getDate()),j=this.formatDateKey(q);this.navigateToMonth(!0,i,`span[data-date='${j}']:not(.p-disabled):not(.p-ink)`),e.preventDefault();break}case 34:{o.tabIndex="-1";let q=new Date(u.getFullYear(),u.getMonth()+1,u.getDate()),j=this.formatDateKey(q);this.navigateToMonth(!1,i,`span[data-date='${j}']:not(.p-disabled):not(.p-ink)`),e.preventDefault();break}case 36:o.tabIndex="-1";let h=new Date(u.getFullYear(),u.getMonth(),1),f=this.formatDateKey(h),y=Ee(o.offsetParent,`span[data-date='${f}']:not(.p-disabled):not(.p-ink)`);y&&(y.tabIndex="0",y.focus()),e.preventDefault();break;case 35:o.tabIndex="-1";let S=new Date(u.getFullYear(),u.getMonth()+1,0),N=this.formatDateKey(S),B=Ee(o.offsetParent,`span[data-date='${N}']:not(.p-disabled):not(.p-ink)`);S&&(B.tabIndex="0",B.focus()),e.preventDefault();break;default:break}}onMonthCellKeydown(e,n){let i=e.currentTarget;switch(e.which){case 38:case 40:{i.tabIndex="-1";var o=i.parentElement.children,a=ei(i);let u=o[e.which===40?a+3:a-3];u&&(u.tabIndex="0",u.focus()),e.preventDefault();break}case 37:{i.tabIndex="-1";let u=i.previousElementSibling;u?(u.tabIndex="0",u.focus()):(this.navigationState={backward:!0},this.navBackward(e)),e.preventDefault();break}case 39:{i.tabIndex="-1";let u=i.nextElementSibling;u?(u.tabIndex="0",u.focus()):(this.navigationState={backward:!1},this.navForward(e)),e.preventDefault();break}case 13:case 32:{this.onMonthSelect(e,n),e.preventDefault();break}case 27:{this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,e.preventDefault();break}case 9:{this.inline||this.trapFocus(e);break}default:break}}onYearCellKeydown(e,n){let i=e.currentTarget;switch(e.which){case 38:case 40:{i.tabIndex="-1";var o=i.parentElement.children,a=ei(i);let u=o[e.which===40?a+2:a-2];u&&(u.tabIndex="0",u.focus()),e.preventDefault();break}case 37:{i.tabIndex="-1";let u=i.previousElementSibling;u?(u.tabIndex="0",u.focus()):(this.navigationState={backward:!0},this.navBackward(e)),e.preventDefault();break}case 39:{i.tabIndex="-1";let u=i.nextElementSibling;u?(u.tabIndex="0",u.focus()):(this.navigationState={backward:!1},this.navForward(e)),e.preventDefault();break}case 13:case 32:{this.onYearSelect(e,n),e.preventDefault();break}case 27:{this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,e.preventDefault();break}case 9:{this.trapFocus(e);break}default:break}}navigateToMonth(e,n,i){if(e)if(this.numberOfMonths===1||n===0)this.navigationState={backward:!0},this._focusKey=i,this.navBackward(event);else{let o=this.contentViewChild.nativeElement.children[n-1];if(i){let a=Ee(o,i);a.tabIndex="0",a.focus()}else{let a=Ut(o,".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)"),u=a[a.length-1];u.tabIndex="0",u.focus()}}else if(this.numberOfMonths===1||n===this.numberOfMonths-1)this.navigationState={backward:!1},this._focusKey=i,this.navForward(event);else{let o=this.contentViewChild.nativeElement.children[n+1];if(i){let a=Ee(o,i);a.tabIndex="0",a.focus()}else{let a=Ee(o,".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");a.tabIndex="0",a.focus()}}}updateFocus(){let e;if(this.navigationState){if(this.navigationState.button)this.initFocusableCell(),this.navigationState.backward?Ee(this.contentViewChild.nativeElement,".p-datepicker-prev-button").focus():Ee(this.contentViewChild.nativeElement,".p-datepicker-next-button").focus();else{if(this.navigationState.backward){let n;this.currentView==="month"?n=Ut(this.contentViewChild.nativeElement,".p-datepicker-month-view .p-datepicker-month:not(.p-disabled)"):this.currentView==="year"?n=Ut(this.contentViewChild.nativeElement,".p-datepicker-year-view .p-datepicker-year:not(.p-disabled)"):n=Ut(this.contentViewChild.nativeElement,this._focusKey||".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)"),n&&n.length>0&&(e=n[n.length-1])}else this.currentView==="month"?e=Ee(this.contentViewChild.nativeElement,".p-datepicker-month-view .p-datepicker-month:not(.p-disabled)"):this.currentView==="year"?e=Ee(this.contentViewChild.nativeElement,".p-datepicker-year-view .p-datepicker-year:not(.p-disabled)"):e=Ee(this.contentViewChild.nativeElement,this._focusKey||".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)");e&&(e.tabIndex="0",e.focus())}this.navigationState=null,this._focusKey=null}else this.initFocusableCell()}initFocusableCell(){let e=this.contentViewChild?.nativeElement,n;if(this.currentView==="month"){let i=Ut(e,".p-datepicker-month-view .p-datepicker-month:not(.p-disabled)"),o=Ee(e,".p-datepicker-month-view .p-datepicker-month.p-highlight");i.forEach(a=>a.tabIndex=-1),n=o||i[0],i.length===0&&Ut(e,'.p-datepicker-month-view .p-datepicker-month.p-disabled[tabindex = "0"]').forEach(u=>u.tabIndex=-1)}else if(this.currentView==="year"){let i=Ut(e,".p-datepicker-year-view .p-datepicker-year:not(.p-disabled)"),o=Ee(e,".p-datepicker-year-view .p-datepicker-year.p-highlight");i.forEach(a=>a.tabIndex=-1),n=o||i[0],i.length===0&&Ut(e,'.p-datepicker-year-view .p-datepicker-year.p-disabled[tabindex = "0"]').forEach(u=>u.tabIndex=-1)}else if(n=Ee(e,"span.p-highlight"),!n){let i=Ee(e,"td.p-datepicker-today span:not(.p-disabled):not(.p-ink)");i?n=i:n=Ee(e,".p-datepicker-calendar td span:not(.p-disabled):not(.p-ink)")}n&&(n.tabIndex="0",!this.preventFocus&&(!this.navigationState||!this.navigationState.button)&&setTimeout(()=>{this.$disabled()||n.focus()},1),this.preventFocus=!1)}trapFocus(e){let n=Jn(this.contentViewChild.nativeElement);if(n&&n.length>0)if(!n[0].ownerDocument.activeElement)n[0].focus();else{let i=n.indexOf(n[0].ownerDocument.activeElement);if(e.shiftKey)if(i==-1||i===0)if(this.focusTrap)n[n.length-1].focus();else{if(i===-1)return this.hideOverlay();if(i===0)return}else n[i-1].focus();else if(i==-1)if(this.timeOnly)n[0].focus();else{let o=0;for(let a=0;a<n.length;a++)n[a].tagName==="SPAN"&&(o=a);n[o].focus()}else if(i===n.length-1){if(!this.focusTrap&&i!=-1)return this.hideOverlay();n[0].focus()}else n[i+1].focus()}e.preventDefault()}onMonthDropdownChange(e){this.currentMonth=parseInt(e),this.onMonthChange.emit({month:this.currentMonth+1,year:this.currentYear}),this.createMonths(this.currentMonth,this.currentYear)}onYearDropdownChange(e){this.currentYear=parseInt(e),this.onYearChange.emit({month:this.currentMonth+1,year:this.currentYear}),this.createMonths(this.currentMonth,this.currentYear)}convertTo24Hour(e,n){return this.hourFormat=="12"?e===12?n?12:0:n?e+12:e:e}constrainTime(e,n,i,o){let a=[e,n,i],u=!1,h=this.value,f=this.convertTo24Hour(e,o),y=this.isRangeSelection(),S=this.isMultipleSelection();(y||S)&&(this.value||(this.value=[new Date,new Date]),y&&(h=this.value[1]||this.value[0]),S&&(h=this.value[this.value.length-1]));let B=h?h.toDateString():null,q=this.minDate&&B&&this.minDate.toDateString()===B,j=this.maxDate&&B&&this.maxDate.toDateString()===B;switch(q&&(u=this.minDate.getHours()>=12),!0){case(q&&u&&this.minDate.getHours()===12&&this.minDate.getHours()>f):a[0]=11;case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()>n):a[1]=this.minDate.getMinutes();case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()===n&&this.minDate.getSeconds()>i):a[2]=this.minDate.getSeconds();break;case(q&&!u&&this.minDate.getHours()-1===f&&this.minDate.getHours()>f):a[0]=11,this.pm=!0;case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()>n):a[1]=this.minDate.getMinutes();case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()===n&&this.minDate.getSeconds()>i):a[2]=this.minDate.getSeconds();break;case(q&&u&&this.minDate.getHours()>f&&f!==12):this.setCurrentHourPM(this.minDate.getHours()),a[0]=this.currentHour||0;case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()>n):a[1]=this.minDate.getMinutes();case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()===n&&this.minDate.getSeconds()>i):a[2]=this.minDate.getSeconds();break;case(q&&this.minDate.getHours()>f):a[0]=this.minDate.getHours();case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()>n):a[1]=this.minDate.getMinutes();case(q&&this.minDate.getHours()===f&&this.minDate.getMinutes()===n&&this.minDate.getSeconds()>i):a[2]=this.minDate.getSeconds();break;case(j&&this.maxDate.getHours()<f):a[0]=this.maxDate.getHours();case(j&&this.maxDate.getHours()===f&&this.maxDate.getMinutes()<n):a[1]=this.maxDate.getMinutes();case(j&&this.maxDate.getHours()===f&&this.maxDate.getMinutes()===n&&this.maxDate.getSeconds()<i):a[2]=this.maxDate.getSeconds();break}return a}incrementHour(e){let n=this.currentHour??0,i=(this.currentHour??0)+this.stepHour,o=this.pm;this.hourFormat=="24"?i=i>=24?i-24:i:this.hourFormat=="12"&&(n<12&&i>11&&(o=!this.pm),i=i>=13?i-12:i),this.toggleAMPMIfNotMinDate(o),[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(i,this.currentMinute,this.currentSecond,o),e.preventDefault()}toggleAMPMIfNotMinDate(e){let n=this.value,i=n?n.toDateString():null;this.minDate&&i&&this.minDate.toDateString()===i&&this.minDate.getHours()>=12?this.pm=!0:this.pm=e}onTimePickerElementMouseDown(e,n,i){this.$disabled()||(this.repeat(e,null,n,i),e.preventDefault())}onTimePickerElementMouseUp(e){this.$disabled()||(this.clearTimePickerTimer(),this.updateTime())}onTimePickerElementMouseLeave(){!this.$disabled()&&this.timePickerTimer&&(this.clearTimePickerTimer(),this.updateTime())}repeat(e,n,i,o){let a=n||500;switch(this.clearTimePickerTimer(),this.timePickerTimer=setTimeout(()=>{this.repeat(e,100,i,o),this.cd.markForCheck()},a),i){case 0:o===1?this.incrementHour(e):this.decrementHour(e);break;case 1:o===1?this.incrementMinute(e):this.decrementMinute(e);break;case 2:o===1?this.incrementSecond(e):this.decrementSecond(e);break}this.updateInputfield()}clearTimePickerTimer(){this.timePickerTimer&&(clearTimeout(this.timePickerTimer),this.timePickerTimer=null)}decrementHour(e){let n=(this.currentHour??0)-this.stepHour,i=this.pm;this.hourFormat=="24"?n=n<0?24+n:n:this.hourFormat=="12"&&(this.currentHour===12&&(i=!this.pm),n=n<=0?12+n:n),this.toggleAMPMIfNotMinDate(i),[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(n,this.currentMinute,this.currentSecond,i),e.preventDefault()}incrementMinute(e){let n=(this.currentMinute??0)+this.stepMinute;n=n>59?n-60:n,[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(this.currentHour||0,n,this.currentSecond,this.pm),e.preventDefault()}decrementMinute(e){let n=(this.currentMinute??0)-this.stepMinute;n=n<0?60+n:n,[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(this.currentHour||0,n,this.currentSecond||0,this.pm),e.preventDefault()}incrementSecond(e){let n=this.currentSecond+this.stepSecond;n=n>59?n-60:n,[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(this.currentHour||0,this.currentMinute||0,n,this.pm),e.preventDefault()}decrementSecond(e){let n=this.currentSecond-this.stepSecond;n=n<0?60+n:n,[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(this.currentHour||0,this.currentMinute||0,n,this.pm),e.preventDefault()}updateTime(){let e=this.value;this.isRangeSelection()&&(e=this.value[1]||this.value[0]),this.isMultipleSelection()&&(e=this.value[this.value.length-1]),e=e?new Date(e.getTime()):new Date,this.hourFormat=="12"?this.currentHour===12?e.setHours(this.pm?12:0):e.setHours(this.pm?this.currentHour+12:this.currentHour):e.setHours(this.currentHour),e.setMinutes(this.currentMinute),e.setSeconds(this.currentSecond),this.isRangeSelection()&&(this.value[1]?e=[this.value[0],e]:e=[e,null]),this.isMultipleSelection()&&(e=[...this.value.slice(0,-1),e]),this.updateModel(e),this.onSelect.emit(e),this.updateInputfield()}toggleAMPM(e){let n=!this.pm;this.pm=n,[this.currentHour,this.currentMinute,this.currentSecond]=this.constrainTime(this.currentHour||0,this.currentMinute||0,this.currentSecond||0,n),this.updateTime(),e.preventDefault()}onUserInput(e){if(!this.isKeydown)return;this.isKeydown=!1;let n=e.target.value;try{let i=this.parseValueFromString(n);this.isValidSelection(i)?(this.updateModel(i),this.updateUI()):this.keepInvalid&&this.updateModel(i)}catch{let o=this.keepInvalid?n:null;this.updateModel(o)}this.onInput.emit(e)}isValidSelection(e){if(this.isSingleSelection())return this.isSelectable(e.getDate(),e.getMonth(),e.getFullYear(),!1);let n=e.every(i=>this.isSelectable(i.getDate(),i.getMonth(),i.getFullYear(),!1));return n&&this.isRangeSelection()&&(n=e.length===1||e.length>1&&e[1]>=e[0]),n}parseValueFromString(e){if(!e||e.trim().length===0)return null;let n;if(this.isSingleSelection())n=this.parseDateTime(e);else if(this.isMultipleSelection()){let i=e.split(this.multipleSeparator);n=[];for(let o of i)n.push(this.parseDateTime(o.trim()))}else if(this.isRangeSelection()){let i=e.split(" "+this.rangeSeparator+" ");n=[];for(let o=0;o<i.length;o++)n[o]=this.parseDateTime(i[o].trim())}return n}parseDateTime(e){let n,i=e.split(" ");if(this.timeOnly)n=new Date,this.populateTime(n,i[0],i[1]);else{let o=this.getDateFormat();if(this.showTime){let a=this.hourFormat=="12"?i.pop():null,u=i.pop();n=this.parseDate(i.join(" "),o),this.populateTime(n,u,a)}else n=this.parseDate(e,o)}return n}populateTime(e,n,i){if(this.hourFormat=="12"&&!i)throw"Invalid Time";this.pm=i==="PM"||i==="pm";let o=this.parseTime(n);e.setHours(o.hour),e.setMinutes(o.minute),e.setSeconds(o.second)}isValidDate(e){return ni(e)&&Wt(e)}updateUI(){let e=this.value;Array.isArray(e)&&(e=e.length===2?e[1]:e[0]);let n=this.defaultDate&&this.isValidDate(this.defaultDate)&&!this.value?this.defaultDate:e&&this.isValidDate(e)?e:new Date;this.currentMonth=n.getMonth(),this.currentYear=n.getFullYear(),this.createMonths(this.currentMonth,this.currentYear),(this.showTime||this.timeOnly)&&(this.setCurrentHourPM(n.getHours()),this.currentMinute=n.getMinutes(),this.currentSecond=this.showSeconds?n.getSeconds():0)}showOverlay(){this.overlayVisible||(this.updateUI(),this.touchUI||(this.preventFocus=!0),this.overlayMinWidth=this.el.nativeElement.offsetWidth,this.overlayVisible=!0)}hideOverlay(){this.inputfieldViewChild?.nativeElement.focus(),this.overlayVisible=!1,this.clearTimePickerTimer(),this.touchUI&&this.disableModality(),this.cd.markForCheck()}toggle(){this.inline||(this.overlayVisible?this.hideOverlay():(this.showOverlay(),this.inputfieldViewChild?.nativeElement.focus()))}onOverlayBeforeEnter(e){this.overlay=e.element,this.$attrSelector&&this.overlay.setAttribute(this.$attrSelector,"");let n=this.inline?void 0:{position:"absolute",top:"0",minWidth:`${this.overlayMinWidth}px`};Mn(this.overlay,n||{}),this.appendOverlay(),this.alignOverlay(),this.setZIndex(),this.updateFocus(),this.bindListeners(),this.onShow.emit(e.element)}onOverlayAfterLeave(e){this.autoZIndex&&Ue.clear(e.element),this.restoreOverlayAppend(),this.onOverlayHide(),this.onClose.emit(e.element)}appendOverlay(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?this.document.body.appendChild(this.overlay):qt(this.$appendTo(),this.overlay))}restoreOverlayAppend(){this.overlay&&this.$appendTo()!=="self"&&this.el.nativeElement.appendChild(this.overlay)}alignOverlay(){this.touchUI?this.enableModality(this.overlay):this.overlay&&(this.$appendTo()&&this.$appendTo()!=="self"?Xn(this.overlay,this.inputfieldViewChild?.nativeElement):vi(this.overlay,this.inputfieldViewChild?.nativeElement))}bindListeners(){this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindScrollListener()}setZIndex(){this.autoZIndex&&(this.touchUI?Ue.set("modal",this.overlay,this.baseZIndex||this.config.zIndex.modal):Ue.set("overlay",this.overlay,this.baseZIndex||this.config.zIndex.overlay))}enableModality(e){!this.mask&&this.touchUI&&(this.mask=this.renderer.createElement("div"),this.renderer.setStyle(this.mask,"zIndex",String(parseInt(e.style.zIndex)-1)),dn(this.mask,"p-overlay-mask p-datepicker-mask p-datepicker-mask-scrollblocker p-overlay-mask p-overlay-mask-enter-active"),this.maskClickListener=this.renderer.listen(this.mask,"click",i=>{this.disableModality(),this.overlayVisible=!1}),this.renderer.appendChild(this.document.body,this.mask),ci())}disableModality(){this.mask&&(dn(this.mask,"p-overlay-mask-leave"),this.animationEndListener||(this.animationEndListener=this.renderer.listen(this.mask,"animationend",this.destroyMask.bind(this))))}destroyMask(){if(!this.mask)return;this.renderer.removeChild(this.document.body,this.mask);let e=this.document.body.children,n;for(let i=0;i<e.length;i++){let o=e[i];if(Ke(o,"p-datepicker-mask-scrollblocker")){n=!0;break}}n||xn(),this.unbindAnimationEndListener(),this.unbindMaskClickListener(),this.mask=null}unbindMaskClickListener(){this.maskClickListener&&(this.maskClickListener(),this.maskClickListener=null)}unbindAnimationEndListener(){this.animationEndListener&&this.mask&&(this.animationEndListener(),this.animationEndListener=null)}getDateFormat(){return this.dateFormat||this.getTranslation("dateFormat")}getFirstDateOfWeek(){return this._firstDayOfWeek||this.getTranslation(Ze.FIRST_DAY_OF_WEEK)}formatDate(e,n){if(!e)return"";let i,o=y=>{let S=i+1<n.length&&n.charAt(i+1)===y;return S&&i++,S},a=(y,S,N)=>{let B=""+S;if(o(y))for(;B.length<N;)B="0"+B;return B},u=(y,S,N,B)=>o(y)?B[S]:N[S],h="",f=!1;if(e)for(i=0;i<n.length;i++)if(f)n.charAt(i)==="'"&&!o("'")?f=!1:h+=n.charAt(i);else switch(n.charAt(i)){case"d":h+=a("d",e.getDate(),2);break;case"D":h+=u("D",e.getDay(),this.getTranslation(Ze.DAY_NAMES_SHORT),this.getTranslation(Ze.DAY_NAMES));break;case"o":h+=a("o",Math.round((new Date(e.getFullYear(),e.getMonth(),e.getDate()).getTime()-new Date(e.getFullYear(),0,0).getTime())/864e5),3);break;case"m":h+=a("m",e.getMonth()+1,2);break;case"M":h+=u("M",e.getMonth(),this.getTranslation(Ze.MONTH_NAMES_SHORT),this.getTranslation(Ze.MONTH_NAMES));break;case"y":h+=o("y")?e.getFullYear():(e.getFullYear()%100<10?"0":"")+e.getFullYear()%100;break;case"@":h+=e.getTime();break;case"!":h+=e.getTime()*1e4+this.ticksTo1970;break;case"'":o("'")?h+="'":f=!0;break;default:h+=n.charAt(i)}return h}formatTime(e){if(!e)return"";let n="",i=e.getHours(),o=e.getMinutes(),a=e.getSeconds();return this.hourFormat=="12"&&i>11&&i!=12&&(i-=12),this.hourFormat=="12"?n+=i===0?12:i<10?"0"+i:i:n+=i<10?"0"+i:i,n+=":",n+=o<10?"0"+o:o,this.showSeconds&&(n+=":",n+=a<10?"0"+a:a),this.hourFormat=="12"&&(n+=e.getHours()>11?" PM":" AM"),n}parseTime(e){let n=e.split(":"),i=this.showSeconds?3:2;if(n.length!==i)throw"Invalid time";let o=parseInt(n[0]),a=parseInt(n[1]),u=this.showSeconds?parseInt(n[2]):null;if(isNaN(o)||isNaN(a)||o>23||a>59||this.hourFormat=="12"&&o>12||this.showSeconds&&(isNaN(u)||u>59))throw"Invalid time";return this.hourFormat=="12"&&(o!==12&&this.pm?o+=12:!this.pm&&o===12&&(o-=12)),{hour:o,minute:a,second:u}}parseDate(e,n){if(n==null||e==null)throw"Invalid arguments";if(e=typeof e=="object"?e.toString():e+"",e==="")return null;let i,o,a,u=0,h=typeof this.shortYearCutoff!="string"?this.shortYearCutoff:new Date().getFullYear()%100+parseInt(this.shortYearCutoff,10),f=-1,y=-1,S=-1,N=-1,B=!1,q,j=xe=>{let He=i+1<n.length&&n.charAt(i+1)===xe;return He&&i++,He},H=xe=>{let He=j(xe),dt=xe==="@"?14:xe==="!"?20:xe==="y"&&He?4:xe==="o"?3:2,$t=xe==="y"?dt:1,fi=new RegExp("^\\d{"+$t+","+dt+"}"),en=e.substring(u).match(fi);if(!en)throw"Missing number at position "+u;return u+=en[0].length,parseInt(en[0],10)},pe=(xe,He,dt)=>{let $t=-1,fi=j(xe)?dt:He,en=[];for(let Pt=0;Pt<fi.length;Pt++)en.push([Pt,fi[Pt]]);en.sort((Pt,jn)=>-(Pt[1].length-jn[1].length));for(let Pt=0;Pt<en.length;Pt++){let jn=en[Pt][1];if(e.substr(u,jn.length).toLowerCase()===jn.toLowerCase()){$t=en[Pt][0],u+=jn.length;break}}if($t!==-1)return $t+1;throw"Unknown name at position "+u},ke=()=>{if(e.charAt(u)!==n.charAt(i))throw"Unexpected literal at position "+u;u++};for(this.view==="month"&&(S=1),i=0;i<n.length;i++)if(B)n.charAt(i)==="'"&&!j("'")?B=!1:ke();else switch(n.charAt(i)){case"d":S=H("d");break;case"D":pe("D",this.getTranslation(Ze.DAY_NAMES_SHORT),this.getTranslation(Ze.DAY_NAMES));break;case"o":N=H("o");break;case"m":y=H("m");break;case"M":y=pe("M",this.getTranslation(Ze.MONTH_NAMES_SHORT),this.getTranslation(Ze.MONTH_NAMES));break;case"y":f=H("y");break;case"@":q=new Date(H("@")),f=q.getFullYear(),y=q.getMonth()+1,S=q.getDate();break;case"!":q=new Date((H("!")-this.ticksTo1970)/1e4),f=q.getFullYear(),y=q.getMonth()+1,S=q.getDate();break;case"'":j("'")?ke():B=!0;break;default:ke()}if(u<e.length&&(a=e.substr(u),!/^\s+/.test(a)))throw"Extra/unparsed characters found in date: "+a;if(f===-1?f=new Date().getFullYear():f<100&&(f+=new Date().getFullYear()-new Date().getFullYear()%100+(f<=h?0:-100)),N>-1){y=1,S=N;do{if(o=this.getDaysCountInMonth(f,y-1),S<=o)break;y++,S-=o}while(!0)}if(this.view==="year"&&(y=y===-1?1:y,S=S===-1?1:S),q=this.daylightSavingAdjust(new Date(f,y-1,S)),q.getFullYear()!==f||q.getMonth()+1!==y||q.getDate()!==S)throw"Invalid date";return q}daylightSavingAdjust(e){return e?(e.setHours(e.getHours()>12?e.getHours()+2:0),e):null}isValidDateForTimeConstraints(e){return this.keepInvalid?!0:(!this.minDate||e>=this.minDate)&&(!this.maxDate||e<=this.maxDate)}onTodayButtonClick(e){let n=new Date,i={day:n.getDate(),month:n.getMonth(),year:n.getFullYear(),otherMonth:n.getMonth()!==this.currentMonth||n.getFullYear()!==this.currentYear,today:!0,selectable:!0};this.createMonths(n.getMonth(),n.getFullYear()),this.onDateSelect(e,i),this.onTodayClick.emit(n)}onClearButtonClick(e){this.updateModel(null),this.updateInputfield(),this.hideOverlay(),this.onClearClick.emit(e)}createResponsiveStyle(){if(this.numberOfMonths>1&&this.responsiveOptions){this.responsiveStyleElement||(this.responsiveStyleElement=this.renderer.createElement("style"),this.responsiveStyleElement.type="text/css",cn(this.responsiveStyleElement,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.body,this.responsiveStyleElement));let e="";if(this.responsiveOptions){let n=[...this.responsiveOptions].filter(i=>!!(i.breakpoint&&i.numMonths)).sort((i,o)=>-1*i.breakpoint.localeCompare(o.breakpoint,void 0,{numeric:!0}));for(let i=0;i<n.length;i++){let{breakpoint:o,numMonths:a}=n[i],u=`
                        .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${a}) .p-datepicker-next {
                            display: inline-flex !important;
                        }
                    `;for(let h=a;h<this.numberOfMonths;h++)u+=`
                            .p-datepicker[${this.attributeSelector}] .p-datepicker-group:nth-child(${h+1}) {
                                display: none !important;
                            }
                        `;e+=`
                        @media screen and (max-width: ${o}) {
                            ${u}
                        }
                    `}}this.responsiveStyleElement.innerHTML=e,cn(this.responsiveStyleElement,"nonce",this.config?.csp()?.nonce)}}destroyResponsiveStyleElement(){this.responsiveStyleElement&&(this.responsiveStyleElement.remove(),this.responsiveStyleElement=null)}bindDocumentClickListener(){this.documentClickListener||this.zone.runOutsideAngular(()=>{let e=this.el?this.el.nativeElement.ownerDocument:this.document;this.documentClickListener=this.renderer.listen(e,"mousedown",n=>{this.isOutsideClicked(n)&&this.overlayVisible&&this.zone.run(()=>{this.hideOverlay(),this.onClickOutside.emit(n),this.cd.markForCheck()})})})}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}bindDocumentResizeListener(){!this.documentResizeListener&&!this.touchUI&&(this.documentResizeListener=this.renderer.listen(this.window,"resize",this.onWindowResize.bind(this)))}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new rn(this.el?.nativeElement,()=>{this.overlayVisible&&this.hideOverlay()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}isOutsideClicked(e){return!(this.el.nativeElement.isSameNode(e.target)||this.isNavIconClicked(e)||this.el.nativeElement.contains(e.target)||this.overlay&&this.overlay.contains(e.target))}isNavIconClicked(e){return Ke(e.target,"p-datepicker-prev-button")||Ke(e.target,"p-datepicker-prev-icon")||Ke(e.target,"p-datepicker-next-button")||Ke(e.target,"p-datepicker-next-icon")}onWindowResize(){this.overlayVisible&&!nn()&&this.hideOverlay()}onOverlayHide(){this.currentView=this.view,this.mask&&this.destroyMask(),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.overlay=null}writeControlValue(e){if(this.value=e,this.value&&typeof this.value=="string")try{this.value=this.parseValueFromString(this.value)}catch{this.keepInvalid&&(this.value=e)}this.updateInputfield(),this.updateUI(),this.cd.markForCheck()}onDestroy(){this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.translationSubscription&&this.translationSubscription.unsubscribe(),this.overlay&&this.autoZIndex&&Ue.clear(this.overlay),this.destroyResponsiveStyleElement(),this.clearTimePickerTimer(),this.restoreOverlayAppend(),this.onOverlayHide()}static \u0275fac=function(n){return new(n||t)(Qe(Be),Qe(pn))};static \u0275cmp=E({type:t,selectors:[["p-datePicker"],["p-datepicker"],["p-date-picker"]],contentQueries:function(n,i,o){if(n&1&&Re(o,zm,4)(o,qm,4)(o,Am,4)(o,Nm,4)(o,Hm,4)(o,$m,4)(o,jm,4)(o,Um,4)(o,Qm,4)(o,Gm,4)(o,Wm,4)(o,Km,4)(o,Ym,4)(o,Me,4),n&2){let a;k(a=T())&&(i.dateTemplate=a.first),k(a=T())&&(i.headerTemplate=a.first),k(a=T())&&(i.footerTemplate=a.first),k(a=T())&&(i.disabledDateTemplate=a.first),k(a=T())&&(i.decadeTemplate=a.first),k(a=T())&&(i.previousIconTemplate=a.first),k(a=T())&&(i.nextIconTemplate=a.first),k(a=T())&&(i.triggerIconTemplate=a.first),k(a=T())&&(i.clearIconTemplate=a.first),k(a=T())&&(i.decrementIconTemplate=a.first),k(a=T())&&(i.incrementIconTemplate=a.first),k(a=T())&&(i.inputIconTemplate=a.first),k(a=T())&&(i.buttonBarTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(Zm,5)(Xm,5),n&2){let o;k(o=T())&&(i.inputfieldViewChild=o.first),k(o=T())&&(i.content=o.first)}},hostVars:4,hostBindings:function(n,i){n&2&&(Ae(i.sx("root")),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{iconDisplay:"iconDisplay",styleClass:"styleClass",inputStyle:"inputStyle",inputId:"inputId",inputStyleClass:"inputStyleClass",placeholder:"placeholder",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",iconAriaLabel:"iconAriaLabel",dateFormat:"dateFormat",multipleSeparator:"multipleSeparator",rangeSeparator:"rangeSeparator",inline:[2,"inline","inline",w],showOtherMonths:[2,"showOtherMonths","showOtherMonths",w],selectOtherMonths:[2,"selectOtherMonths","selectOtherMonths",w],showIcon:[2,"showIcon","showIcon",w],icon:"icon",readonlyInput:[2,"readonlyInput","readonlyInput",w],shortYearCutoff:"shortYearCutoff",hourFormat:"hourFormat",timeOnly:[2,"timeOnly","timeOnly",w],stepHour:[2,"stepHour","stepHour",se],stepMinute:[2,"stepMinute","stepMinute",se],stepSecond:[2,"stepSecond","stepSecond",se],showSeconds:[2,"showSeconds","showSeconds",w],showOnFocus:[2,"showOnFocus","showOnFocus",w],showWeek:[2,"showWeek","showWeek",w],startWeekFromFirstDayOfYear:"startWeekFromFirstDayOfYear",showClear:[2,"showClear","showClear",w],dataType:"dataType",selectionMode:"selectionMode",maxDateCount:[2,"maxDateCount","maxDateCount",se],showButtonBar:[2,"showButtonBar","showButtonBar",w],todayButtonStyleClass:"todayButtonStyleClass",clearButtonStyleClass:"clearButtonStyleClass",autofocus:[2,"autofocus","autofocus",w],autoZIndex:[2,"autoZIndex","autoZIndex",w],baseZIndex:[2,"baseZIndex","baseZIndex",se],panelStyleClass:"panelStyleClass",panelStyle:"panelStyle",keepInvalid:[2,"keepInvalid","keepInvalid",w],hideOnDateTimeSelect:[2,"hideOnDateTimeSelect","hideOnDateTimeSelect",w],touchUI:[2,"touchUI","touchUI",w],timeSeparator:"timeSeparator",focusTrap:[2,"focusTrap","focusTrap",w],showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",tabindex:[2,"tabindex","tabindex",se],minDate:"minDate",maxDate:"maxDate",disabledDates:"disabledDates",disabledDays:"disabledDays",showTime:"showTime",responsiveOptions:"responsiveOptions",numberOfMonths:"numberOfMonths",firstDayOfWeek:"firstDayOfWeek",view:"view",defaultDate:"defaultDate",appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"]},outputs:{onFocus:"onFocus",onBlur:"onBlur",onClose:"onClose",onSelect:"onSelect",onClear:"onClear",onInput:"onInput",onTodayClick:"onTodayClick",onClearClick:"onClearClick",onMonthChange:"onMonthChange",onYearChange:"onYearChange",onClickOutside:"onClickOutside",onShow:"onShow"},features:[le([X0,Jl,{provide:es,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:eh,decls:11,vars:17,consts:[["contentWrapper",""],["inputfield",""],["icon",""],[3,"ngIf"],["name","p-anchored-overlay",3,"onBeforeEnter","onAfterLeave","visible","appear","options"],[3,"click","ngStyle","pBind"],[4,"ngTemplateOutlet"],[4,"ngIf"],[3,"class","pBind",4,"ngIf"],["pInputText","","data-p-maskable","","type","text","role","combobox","aria-autocomplete","none","aria-haspopup","dialog","autocomplete","off",3,"focus","keydown","click","blur","input","pSize","value","ngStyle","pAutoFocus","variant","fluid","invalid","pt","unstyled"],["type","button","aria-haspopup","dialog","tabindex","0",3,"class","disabled","pBind","click",4,"ngIf"],["data-p-icon","times",3,"class","pBind","click",4,"ngIf"],[3,"class","pBind","click",4,"ngIf"],["data-p-icon","times",3,"click","pBind"],[3,"click","pBind"],["type","button","aria-haspopup","dialog","tabindex","0",3,"click","disabled","pBind"],[3,"ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],["data-p-icon","calendar",3,"pBind",4,"ngIf"],["data-p-icon","calendar",3,"pBind"],[3,"pBind"],["data-p-icon","calendar",3,"class","pBind","click",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","calendar",3,"click","pBind"],[3,"class","pBind",4,"ngFor","ngForOf"],["rounded","","variant","text","severity","secondary","type","button",3,"keydown","onClick","styleClass","ngStyle","ariaLabel","pt"],["type","button","pRipple","",3,"class","pBind","click","keydown",4,"ngIf"],["rounded","","variant","text","severity","secondary",3,"keydown","onClick","styleClass","ngStyle","ariaLabel","pt"],["role","grid",3,"class","pBind",4,"ngIf"],["data-p-icon","chevron-left",4,"ngIf"],["data-p-icon","chevron-left"],["type","button","pRipple","",3,"click","keydown","pBind"],["data-p-icon","chevron-right",4,"ngIf"],["data-p-icon","chevron-right"],["role","grid",3,"pBind"],["scope","col",3,"class","pBind",4,"ngFor","ngForOf"],[3,"pBind",4,"ngFor","ngForOf"],["scope","col",3,"pBind"],["draggable","false","pRipple","",3,"click","keydown","ngClass","pBind"],["class","p-hidden-accessible","aria-live","polite",4,"ngIf"],["aria-live","polite",1,"p-hidden-accessible"],["pRipple","",3,"class","pBind","click","keydown",4,"ngFor","ngForOf"],["pRipple","",3,"click","keydown","pBind"],["rounded","","variant","text","severity","secondary",3,"keydown","keydown.enter","keydown.space","mousedown","mouseup","keyup.enter","keyup.space","mouseleave","styleClass","pt"],[1,"p-datepicker-separator",3,"pBind"],["data-p-icon","chevron-up",3,"pBind",4,"ngIf"],["data-p-icon","chevron-up",3,"pBind"],["data-p-icon","chevron-down",3,"pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"pBind"],["text","","rounded","","severity","secondary",3,"keydown","onClick","keydown.enter","styleClass","pt"],["text","","rounded","","severity","secondary",3,"keydown","click","keydown.enter","styleClass","pt"],["size","small","severity","secondary","variant","text","size","small",3,"keydown","onClick","styleClass","label","ngClass","pt"]],template:function(n,i){n&1&&(Ge(Jm),g(0,vh,5,28,"ng-template",3),c(1,"p-motion",4),x("onBeforeEnter",function(a){return i.onOverlayBeforeEnter(a)})("onAfterLeave",function(a){return i.onOverlayAfterLeave(a)}),c(2,"div",5,0),x("click",function(a){return i.onOverlayClick(a)}),Ne(4),g(5,xh,1,0,"ng-container",6)(6,i0,5,6,"ng-container",7)(7,$0,28,38,"div",8)(8,G0,3,4,"div",8),Ne(9,1),g(10,W0,1,0,"ng-container",6),p()()),n&2&&(s("ngIf",!i.inline),l(),s("visible",i.inline||i.overlayVisible)("appear",!i.inline)("options",i.computedMotionOptions()),l(),C(i.cn(i.cx("panel"),i.panelStyleClass)),s("ngStyle",i.panelStyle)("pBind",i.ptm("panel")),D("id",i.panelId)("aria-label",i.getTranslation("chooseDate"))("role",i.inline?null:"dialog")("aria-modal",i.inline?null:"true"),l(3),s("ngTemplateOutlet",i.headerTemplate||i._headerTemplate),l(),s("ngIf",!i.timeOnly),l(),s("ngIf",(i.showTime||i.timeOnly)&&i.currentView==="date"),l(),s("ngIf",i.showButtonBar),l(2),s("ngTemplateOutlet",i.footerTemplate||i._footerTemplate))},dependencies:[te,at,jt,ze,Le,rt,Nn,Jt,dl,cl,pl,io,fn,sl,Xt,$n,ie,Ve,A,gn,Fi],encapsulation:2,changeDetection:0})}return t})(),ns=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[ts,ie,ie]})}return t})();var J0=["data-p-icon","filter-fill"],is=(()=>{class t extends re{static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["","data-p-icon","filter-fill"]],features:[L],attrs:J0,decls:1,vars:0,consts:[["d","M13.7274 0.33847C13.6228 0.130941 13.4095 0 13.1764 0H0.82351C0.590451 0 0.377157 0.130941 0.272568 0.33847C0.167157 0.545999 0.187746 0.795529 0.325275 0.98247L4.73527 6.99588V13.3824C4.73527 13.7233 5.01198 14 5.35292 14H8.64704C8.98798 14 9.26469 13.7233 9.26469 13.3824V6.99588L13.6747 0.98247C13.8122 0.795529 13.8328 0.545999 13.7274 0.33847Z","fill","currentColor"]],template:function(n,i){n&1&&(O(),X(0,"path",0))},encapsulation:2})}return t})();var os=`
    .p-inputnumber {
        display: inline-flex;
        position: relative;
    }

    .p-inputnumber-button {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 0 0 auto;
        cursor: pointer;
        background: dt('inputnumber.button.background');
        color: dt('inputnumber.button.color');
        width: dt('inputnumber.button.width');
        transition:
            background dt('inputnumber.transition.duration'),
            color dt('inputnumber.transition.duration'),
            border-color dt('inputnumber.transition.duration'),
            outline-color dt('inputnumber.transition.duration');
    }

    .p-inputnumber-button:disabled {
        cursor: auto;
    }

    .p-inputnumber-button:not(:disabled):hover {
        background: dt('inputnumber.button.hover.background');
        color: dt('inputnumber.button.hover.color');
    }

    .p-inputnumber-button:not(:disabled):active {
        background: dt('inputnumber.button.active.background');
        color: dt('inputnumber.button.active.color');
    }

    .p-inputnumber-stacked .p-inputnumber-button {
        position: relative;
        flex: 1 1 auto;
        border: 0 none;
    }

    .p-inputnumber-stacked .p-inputnumber-button-group {
        display: flex;
        flex-direction: column;
        position: absolute;
        inset-block-start: 1px;
        inset-inline-end: 1px;
        height: calc(100% - 2px);
        z-index: 1;
    }

    .p-inputnumber-stacked .p-inputnumber-increment-button {
        padding: 0;
        border-start-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-decrement-button {
        padding: 0;
        border-end-end-radius: calc(dt('inputnumber.button.border.radius') - 1px);
    }

    .p-inputnumber-stacked .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-horizontal .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-horizontal .p-inputnumber-increment-button {
        order: 3;
        border-start-end-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        border-inline-start: 0 none;
    }

    .p-inputnumber-horizontal .p-inputnumber-input {
        order: 2;
        border-radius: 0;
    }

    .p-inputnumber-horizontal .p-inputnumber-decrement-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-inline-end: 0 none;
    }

    .p-floatlabel:has(.p-inputnumber-horizontal) label {
        margin-inline-start: dt('inputnumber.button.width');
    }

    .p-inputnumber-vertical {
        flex-direction: column;
    }

    .p-inputnumber-vertical .p-inputnumber-button {
        border: 1px solid dt('inputnumber.button.border.color');
        padding: dt('inputnumber.button.vertical.padding');
    }

    .p-inputnumber-vertical .p-inputnumber-button:hover {
        border-color: dt('inputnumber.button.hover.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-button:active {
        border-color: dt('inputnumber.button.active.border.color');
    }

    .p-inputnumber-vertical .p-inputnumber-increment-button {
        order: 1;
        border-start-start-radius: dt('inputnumber.button.border.radius');
        border-start-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-end: 0 none;
    }

    .p-inputnumber-vertical .p-inputnumber-input {
        order: 2;
        border-radius: 0;
        text-align: center;
    }

    .p-inputnumber-vertical .p-inputnumber-decrement-button {
        order: 3;
        border-end-start-radius: dt('inputnumber.button.border.radius');
        border-end-end-radius: dt('inputnumber.button.border.radius');
        width: 100%;
        border-block-start: 0 none;
    }

    .p-inputnumber-input {
        flex: 1 1 auto;
    }

    .p-inputnumber-fluid {
        width: 100%;
    }

    .p-inputnumber-fluid .p-inputnumber-input {
        width: 1%;
    }

    .p-inputnumber-fluid.p-inputnumber-vertical .p-inputnumber-input {
        width: 100%;
    }

    .p-inputnumber:has(.p-inputtext-sm) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
    }

    .p-inputnumber:has(.p-inputtext-lg) .p-inputnumber-button .p-icon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
    }

    .p-inputnumber-clear-icon {
        position: absolute;
        top: 50%;
        margin-top: -0.5rem;
        cursor: pointer;
        inset-inline-end: dt('form.field.padding.x');
        color: dt('form.field.icon.color');
    }

    .p-inputnumber:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-stacked .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }

    .p-inputnumber-stacked:has(.p-inputnumber-clear-icon) .p-inputnumber-input {
        padding-inline-end: calc(dt('inputnumber.button.width') + (dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-inputnumber-horizontal .p-inputnumber-clear-icon {
        inset-inline-end: calc(dt('inputnumber.button.width') + dt('form.field.padding.x'));
    }
`;var ef=["clearicon"],tf=["incrementbuttonicon"],nf=["decrementbuttonicon"],of=["input"];function rf(t,r){if(t&1){let e=P();O(),c(0,"svg",7),x("click",function(){_(e);let i=d(2);return b(i.clear())}),p()}if(t&2){let e=d(2);C(e.cx("clearIcon")),s("pBind",e.ptm("clearIcon"))}}function af(t,r){}function lf(t,r){t&1&&g(0,af,0,0,"ng-template")}function sf(t,r){if(t&1){let e=P();c(0,"span",8),x("click",function(){_(e);let i=d(2);return b(i.clear())}),g(1,lf,1,0,null,9),p()}if(t&2){let e=d(2);C(e.cx("clearIcon")),s("pBind",e.ptm("clearIcon")),l(),s("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)}}function df(t,r){if(t&1&&(W(0),g(1,rf,1,3,"svg",5)(2,sf,2,4,"span",6),K()),t&2){let e=d();l(),s("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),l(),s("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function cf(t,r){if(t&1&&F(0,"span",13),t&2){let e=d(2);s("pBind",e.ptm("incrementButtonIcon"))("ngClass",e.incrementButtonIcon)}}function pf(t,r){if(t&1&&(O(),F(0,"svg",15)),t&2){let e=d(3);s("pBind",e.ptm("incrementButtonIcon"))}}function uf(t,r){}function mf(t,r){t&1&&g(0,uf,0,0,"ng-template")}function hf(t,r){if(t&1&&(W(0),g(1,pf,1,1,"svg",14)(2,mf,1,0,null,9),K()),t&2){let e=d(2);l(),s("ngIf",!e.incrementButtonIconTemplate&&!e._incrementButtonIconTemplate),l(),s("ngTemplateOutlet",e.incrementButtonIconTemplate||e._incrementButtonIconTemplate)}}function ff(t,r){if(t&1&&F(0,"span",13),t&2){let e=d(2);s("pBind",e.ptm("decrementButtonIcon"))("ngClass",e.decrementButtonIcon)}}function gf(t,r){if(t&1&&(O(),F(0,"svg",17)),t&2){let e=d(3);s("pBind",e.ptm("decrementButtonIcon"))}}function _f(t,r){}function bf(t,r){t&1&&g(0,_f,0,0,"ng-template")}function yf(t,r){if(t&1&&(W(0),g(1,gf,1,1,"svg",16)(2,bf,1,0,null,9),K()),t&2){let e=d(2);l(),s("ngIf",!e.decrementButtonIconTemplate&&!e._decrementButtonIconTemplate),l(),s("ngTemplateOutlet",e.decrementButtonIconTemplate||e._decrementButtonIconTemplate)}}function vf(t,r){if(t&1){let e=P();c(0,"span",10)(1,"button",11),x("mousedown",function(i){_(e);let o=d();return b(o.onUpButtonMouseDown(i))})("mouseup",function(){_(e);let i=d();return b(i.onUpButtonMouseUp())})("mouseleave",function(){_(e);let i=d();return b(i.onUpButtonMouseLeave())})("keydown",function(i){_(e);let o=d();return b(o.onUpButtonKeyDown(i))})("keyup",function(){_(e);let i=d();return b(i.onUpButtonKeyUp())}),g(2,cf,1,2,"span",12)(3,hf,3,2,"ng-container",2),p(),c(4,"button",11),x("mousedown",function(i){_(e);let o=d();return b(o.onDownButtonMouseDown(i))})("mouseup",function(){_(e);let i=d();return b(i.onDownButtonMouseUp())})("mouseleave",function(){_(e);let i=d();return b(i.onDownButtonMouseLeave())})("keydown",function(i){_(e);let o=d();return b(o.onDownButtonKeyDown(i))})("keyup",function(){_(e);let i=d();return b(i.onDownButtonKeyUp())}),g(5,ff,1,2,"span",12)(6,yf,3,2,"ng-container",2),p()()}if(t&2){let e=d();C(e.cx("buttonGroup")),s("pBind",e.ptm("buttonGroup")),D("data-p",e.dataP),l(),C(e.cn(e.cx("incrementButton"),e.incrementButtonClass)),s("pBind",e.ptm("incrementButton")),D("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),l(),s("ngIf",e.incrementButtonIcon),l(),s("ngIf",!e.incrementButtonIcon),l(),C(e.cn(e.cx("decrementButton"),e.decrementButtonClass)),s("pBind",e.ptm("decrementButton")),D("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),l(),s("ngIf",e.decrementButtonIcon),l(),s("ngIf",!e.decrementButtonIcon)}}function xf(t,r){if(t&1&&F(0,"span",13),t&2){let e=d(2);s("pBind",e.ptm("incrementButtonIcon"))("ngClass",e.incrementButtonIcon)}}function Cf(t,r){if(t&1&&(O(),F(0,"svg",15)),t&2){let e=d(3);s("pBind",e.ptm("incrementButtonIcon"))}}function wf(t,r){}function kf(t,r){t&1&&g(0,wf,0,0,"ng-template")}function Tf(t,r){if(t&1&&(W(0),g(1,Cf,1,1,"svg",14)(2,kf,1,0,null,9),K()),t&2){let e=d(2);l(),s("ngIf",!e.incrementButtonIconTemplate&&!e._incrementButtonIconTemplate),l(),s("ngTemplateOutlet",e.incrementButtonIconTemplate||e._incrementButtonIconTemplate)}}function Sf(t,r){if(t&1){let e=P();c(0,"button",11),x("mousedown",function(i){_(e);let o=d();return b(o.onUpButtonMouseDown(i))})("mouseup",function(){_(e);let i=d();return b(i.onUpButtonMouseUp())})("mouseleave",function(){_(e);let i=d();return b(i.onUpButtonMouseLeave())})("keydown",function(i){_(e);let o=d();return b(o.onUpButtonKeyDown(i))})("keyup",function(){_(e);let i=d();return b(i.onUpButtonKeyUp())}),g(1,xf,1,2,"span",12)(2,Tf,3,2,"ng-container",2),p()}if(t&2){let e=d();C(e.cn(e.cx("incrementButton"),e.incrementButtonClass)),s("pBind",e.ptm("incrementButton")),D("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),l(),s("ngIf",e.incrementButtonIcon),l(),s("ngIf",!e.incrementButtonIcon)}}function If(t,r){if(t&1&&F(0,"span",13),t&2){let e=d(2);s("pBind",e.ptm("decrementButtonIcon"))("ngClass",e.decrementButtonIcon)}}function Ef(t,r){if(t&1&&(O(),F(0,"svg",17)),t&2){let e=d(3);s("pBind",e.ptm("decrementButtonIcon"))}}function Df(t,r){}function Mf(t,r){t&1&&g(0,Df,0,0,"ng-template")}function Lf(t,r){if(t&1&&(W(0),g(1,Ef,1,1,"svg",16)(2,Mf,1,0,null,9),K()),t&2){let e=d(2);l(),s("ngIf",!e.decrementButtonIconTemplate&&!e._decrementButtonIconTemplate),l(),s("ngTemplateOutlet",e.decrementButtonIconTemplate||e._decrementButtonIconTemplate)}}function Pf(t,r){if(t&1){let e=P();c(0,"button",11),x("mousedown",function(i){_(e);let o=d();return b(o.onDownButtonMouseDown(i))})("mouseup",function(){_(e);let i=d();return b(i.onDownButtonMouseUp())})("mouseleave",function(){_(e);let i=d();return b(i.onDownButtonMouseLeave())})("keydown",function(i){_(e);let o=d();return b(o.onDownButtonKeyDown(i))})("keyup",function(){_(e);let i=d();return b(i.onDownButtonKeyUp())}),g(1,If,1,2,"span",12)(2,Lf,3,2,"ng-container",2),p()}if(t&2){let e=d();C(e.cn(e.cx("decrementButton"),e.decrementButtonClass)),s("pBind",e.ptm("decrementButton")),D("disabled",e.$disabled()?"":void 0)("aria-hidden",!0)("data-p",e.dataP),l(),s("ngIf",e.decrementButtonIcon),l(),s("ngIf",!e.decrementButtonIcon)}}var Ff=`
    ${os}

    /* For PrimeNG */
    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext {
        border-color: dt('inputtext.invalid.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext:enabled:focus,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext:enabled:focus {
        border-color: dt('inputtext.focus.border.color');
    }

    p-inputNumber.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-input-number.ng-invalid.ng-dirty > .p-inputtext::placeholder,
    p-inputnumber.ng-invalid.ng-dirty > .p-inputtext::placeholder {
        color: dt('inputtext.invalid.placeholder.color');
    }
`,Rf={root:({instance:t})=>["p-inputnumber p-component p-inputwrapper",{"p-inputwrapper-filled":t.$filled()||t.allowEmpty===!1,"p-inputwrapper-focus":t.focused,"p-inputnumber-stacked":t.showButtons&&t.buttonLayout==="stacked","p-inputnumber-horizontal":t.showButtons&&t.buttonLayout==="horizontal","p-inputnumber-vertical":t.showButtons&&t.buttonLayout==="vertical","p-inputnumber-fluid":t.hasFluid,"p-invalid":t.invalid()}],pcInputText:"p-inputnumber-input",buttonGroup:"p-inputnumber-button-group",incrementButton:({instance:t})=>["p-inputnumber-button p-inputnumber-increment-button",{"p-disabled":t.showButtons&&t.max()!=null&&t.maxlength()}],decrementButton:({instance:t})=>["p-inputnumber-button p-inputnumber-decrement-button",{"p-disabled":t.showButtons&&t.min()!=null&&t.minlength()}],clearIcon:"p-inputnumber-clear-icon"},rs=(()=>{class t extends fe{name="inputnumber";style=Ff;classes=Rf;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var as=new ae("INPUTNUMBER_INSTANCE"),Bf={provide:lt,useExisting:ot(()=>uo),multi:!0},uo=(()=>{class t extends Hn{injector;componentName="InputNumber";$pcInputNumber=v(as,{optional:!0,skipSelf:!0})??void 0;_componentStyle=v(rs);bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}showButtons=!1;format=!0;buttonLayout="stacked";inputId;styleClass;placeholder;tabindex;title;ariaLabelledBy;ariaDescribedBy;ariaLabel;ariaRequired;autocomplete;incrementButtonClass;decrementButtonClass;incrementButtonIcon;decrementButtonIcon;readonly;allowEmpty=!0;locale;localeMatcher;mode="decimal";currency;currencyDisplay;useGrouping=!0;minFractionDigits;maxFractionDigits;prefix;suffix;inputStyle;inputStyleClass;showClear=!1;autofocus;onInput=new I;onFocus=new I;onBlur=new I;onKeyDown=new I;onClear=new I;clearIconTemplate;incrementButtonIconTemplate;decrementButtonIconTemplate;templates;input;_clearIconTemplate;_incrementButtonIconTemplate;_decrementButtonIconTemplate;value;focused;initialized;groupChar="";prefixChar="";suffixChar="";isSpecialChar;timer;lastValue;_numeral;numberFormat;_decimal;_decimalChar="";_group;_minusSign;_currency;_prefix;_suffix;_index;ngControl=null;constructor(e){super(),this.injector=e}onChanges(e){["locale","localeMatcher","mode","currency","currencyDisplay","useGrouping","minFractionDigits","maxFractionDigits","prefix","suffix"].some(i=>!!e[i])&&this.updateConstructParser()}onInit(){this.ngControl=this.injector.get(hn,null,{optional:!0}),this.constructParser(),this.initialized=!0}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"clearicon":this._clearIconTemplate=e.template;break;case"incrementbuttonicon":this._incrementButtonIconTemplate=e.template;break;case"decrementbuttonicon":this._decrementButtonIconTemplate=e.template;break}})}getOptions(){let e=(a,u,h)=>{if(!(a==null||isNaN(a)||!isFinite(a)))return Math.max(u,Math.min(h,Math.floor(a)))},n=e(this.minFractionDigits,0,20),i=e(this.maxFractionDigits,0,100),o=n!=null&&i!=null&&n>i?i:n;return{localeMatcher:this.localeMatcher,style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,useGrouping:this.useGrouping,minimumFractionDigits:o,maximumFractionDigits:i}}constructParser(){let e=this.getOptions(),n=Object.fromEntries(Object.entries(e).filter(([a,u])=>u!==void 0));this.numberFormat=new Intl.NumberFormat(this.locale,n);let i=[...new Intl.NumberFormat(this.locale,{useGrouping:!1}).format(9876543210)].reverse(),o=new Map(i.map((a,u)=>[a,u]));this._numeral=new RegExp(`[${i.join("")}]`,"g"),this._group=this.getGroupingExpression(),this._minusSign=this.getMinusSignExpression(),this._currency=this.getCurrencyExpression(),this._decimal=this.getDecimalExpression(),this._decimalChar=this.getDecimalChar(),this._suffix=this.getSuffixExpression(),this._prefix=this.getPrefixExpression(),this._index=a=>o.get(a)}updateConstructParser(){this.initialized&&this.constructParser()}escapeRegExp(e){return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")}getDecimalExpression(){let e=this.getDecimalChar();return new RegExp(`[${e}]`,"g")}getDecimalChar(){return new Intl.NumberFormat(this.locale,ue(G({},this.getOptions()),{useGrouping:!1})).format(1.1).replace(this._currency,"").trim().replace(this._numeral,"")}getGroupingExpression(){let e=new Intl.NumberFormat(this.locale,{useGrouping:!0});return this.groupChar=e.format(1e6).trim().replace(this._numeral,"").charAt(0),new RegExp(`[${this.groupChar}]`,"g")}getMinusSignExpression(){let e=new Intl.NumberFormat(this.locale,{useGrouping:!1});return new RegExp(`[${e.format(-1).trim().replace(this._numeral,"")}]`,"g")}getCurrencyExpression(){if(this.currency){let e=new Intl.NumberFormat(this.locale,{style:"currency",currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0});return new RegExp(`[${e.format(1).replace(/\s/g,"").replace(this._numeral,"").replace(this._group,"")}]`,"g")}return new RegExp("[]","g")}getPrefixExpression(){if(this.prefix)this.prefixChar=this.prefix;else{let e=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay});this.prefixChar=e.format(1).split("1")[0]}return new RegExp(`${this.escapeRegExp(this.prefixChar||"")}`,"g")}getSuffixExpression(){if(this.suffix)this.suffixChar=this.suffix;else{let e=new Intl.NumberFormat(this.locale,{style:this.mode,currency:this.currency,currencyDisplay:this.currencyDisplay,minimumFractionDigits:0,maximumFractionDigits:0});this.suffixChar=e.format(1).split("1")[1]}return new RegExp(`${this.escapeRegExp(this.suffixChar||"")}`,"g")}formatValue(e){if(e!=null){if(e==="-")return e;if(this.format){let i=new Intl.NumberFormat(this.locale,this.getOptions()).format(e);return this.prefix&&e!=this.prefix&&(i=this.prefix+i),this.suffix&&e!=this.suffix&&(i=i+this.suffix),i}return e.toString()}return""}parseValue(e){let n=this._suffix?new RegExp(this._suffix,""):/(?:)/,i=this._prefix?new RegExp(this._prefix,""):/(?:)/,o=this._currency?new RegExp(this._currency,""):/(?:)/,a=e.replace(n,"").replace(i,"").trim().replace(/\s/g,"").replace(o,"").replace(this._group,"").replace(this._minusSign,"-").replace(this._decimal,".").replace(this._numeral,this._index);if(a){if(a==="-")return a;let u=+a;return isNaN(u)?null:u}return null}repeat(e,n,i){if(this.readonly)return;let o=n||500;this.clearTimer(),this.timer=setTimeout(()=>{this.repeat(e,40,i)},o),this.spin(e,i)}spin(e,n){let i=(this.step()??1)*n,o=this.parseValue(this.input?.nativeElement.value)||0,a=this.validateValue(o+i),u=this.maxlength();u&&u<this.formatValue(a).length||(this.updateInput(a,null,"spin",null),this.updateModel(e,a),this.handleOnInput(e,o,a))}clear(){this.value=null,this.onModelChange(this.value),this.onClear.emit()}onUpButtonMouseDown(e){if(e.button===2){this.clearTimer();return}this.$disabled()||(this.input?.nativeElement.focus(),this.repeat(e,null,1),e.preventDefault())}onUpButtonMouseUp(){this.$disabled()||this.clearTimer()}onUpButtonMouseLeave(){this.$disabled()||this.clearTimer()}onUpButtonKeyDown(e){(e.keyCode===32||e.keyCode===13)&&this.repeat(e,null,1)}onUpButtonKeyUp(){this.$disabled()||this.clearTimer()}onDownButtonMouseDown(e){if(e.button===2){this.clearTimer();return}this.$disabled()||(this.input?.nativeElement.focus(),this.repeat(e,null,-1),e.preventDefault())}onDownButtonMouseUp(){this.$disabled()||this.clearTimer()}onDownButtonMouseLeave(){this.$disabled()||this.clearTimer()}onDownButtonKeyUp(){this.$disabled()||this.clearTimer()}onDownButtonKeyDown(e){(e.keyCode===32||e.keyCode===13)&&this.repeat(e,null,-1)}onUserInput(e){this.readonly||(this.isSpecialChar&&(e.target.value=this.lastValue),this.isSpecialChar=!1)}onInputKeyDown(e){if(this.readonly)return;if(this.lastValue=e.target.value,e.shiftKey||e.altKey){this.isSpecialChar=!0;return}let n=e.target.selectionStart,i=e.target.selectionEnd,o=e.target.value,a=null;switch(e.altKey&&e.preventDefault(),e.key){case"ArrowUp":this.spin(e,1),e.preventDefault();break;case"ArrowDown":this.spin(e,-1),e.preventDefault();break;case"ArrowLeft":for(let u=n;u<=o.length;u++){let h=u===0?0:u-1;if(this.isNumeralChar(o.charAt(h))){this.input.nativeElement.setSelectionRange(u,u);break}}break;case"ArrowRight":for(let u=i;u>=0;u--)if(this.isNumeralChar(o.charAt(u))){this.input.nativeElement.setSelectionRange(u,u);break}break;case"Tab":case"Enter":a=this.validateValue(this.parseValue(this.input.nativeElement.value)),this.input.nativeElement.value=this.formatValue(a),this.input.nativeElement.setAttribute("aria-valuenow",a),this.updateModel(e,a);break;case"Backspace":{if(e.preventDefault(),n===i){if(n==1&&this.prefix||n==o.length&&this.suffix)break;let u=o.charAt(n-1),{decimalCharIndex:h,decimalCharIndexWithoutPrefix:f}=this.getDecimalCharIndexes(o);if(this.isNumeralChar(u)){let y=this.getDecimalLength(o);if(this._group.test(u))this._group.lastIndex=0,a=o.slice(0,n-2)+o.slice(n-1);else if(this._decimal.test(u))this._decimal.lastIndex=0,y?this.input?.nativeElement.setSelectionRange(n-1,n-1):a=o.slice(0,n-1)+o.slice(n);else if(h>0&&n>h){let S=this.isDecimalMode()&&(this.minFractionDigits||0)<y?"":"0";a=o.slice(0,n-1)+S+o.slice(n)}else f===1?(a=o.slice(0,n-1)+"0"+o.slice(n),a=this.parseValue(a)>0?a:""):a=o.slice(0,n-1)+o.slice(n)}else this.mode==="currency"&&this._currency&&u.search(this._currency)!=-1&&(a=o.slice(1));this.updateValue(e,a,null,"delete-single")}else a=this.deleteRange(o,n,i),this.updateValue(e,a,null,"delete-range");break}case"Delete":if(e.preventDefault(),n===i){if(n==0&&this.prefix||n==o.length-1&&this.suffix)break;let u=o.charAt(n),{decimalCharIndex:h,decimalCharIndexWithoutPrefix:f}=this.getDecimalCharIndexes(o);if(this.isNumeralChar(u)){let y=this.getDecimalLength(o);if(this._group.test(u))this._group.lastIndex=0,a=o.slice(0,n)+o.slice(n+2);else if(this._decimal.test(u))this._decimal.lastIndex=0,y?this.input?.nativeElement.setSelectionRange(n+1,n+1):a=o.slice(0,n)+o.slice(n+1);else if(h>0&&n>h){let S=this.isDecimalMode()&&(this.minFractionDigits||0)<y?"":"0";a=o.slice(0,n)+S+o.slice(n+1)}else f===1?(a=o.slice(0,n)+"0"+o.slice(n+1),a=this.parseValue(a)>0?a:""):a=o.slice(0,n)+o.slice(n+1)}this.updateValue(e,a,null,"delete-back-single")}else a=this.deleteRange(o,n,i),this.updateValue(e,a,null,"delete-range");break;case"Home":this.min()&&(this.updateModel(e,this.min()),e.preventDefault());break;case"End":this.max()&&(this.updateModel(e,this.max()),e.preventDefault());break;default:break}this.onKeyDown.emit(e)}onInputKeyPress(e){if(this.readonly)return;let n=e.which||e.keyCode,i=String.fromCharCode(n),o=this.isDecimalSign(i),a=this.isMinusSign(i);n!=13&&e.preventDefault(),!o&&e.code==="NumpadDecimal"&&(o=!0,i=this._decimalChar,n=i.charCodeAt(0));let{value:u,selectionStart:h,selectionEnd:f}=this.input.nativeElement,y=this.parseValue(u+i),S=y!=null?y.toString():"",N=u.substring(h,f),B=this.parseValue(N),q=B!=null?B.toString():"";if(h!==f&&q.length>0){this.insert(e,i,{isDecimalSign:o,isMinusSign:a});return}let j=this.maxlength();j&&S.length>j||(48<=n&&n<=57||a||o)&&this.insert(e,i,{isDecimalSign:o,isMinusSign:a})}onPaste(e){if(!this.$disabled()&&!this.readonly){e.preventDefault();let n=(e.clipboardData||this.document.defaultView.clipboardData).getData("Text");if(this.inputId==="integeronly"&&/[^\d-]/.test(n))return;if(n){this.maxlength()&&(n=n.toString().substring(0,this.maxlength()));let i=this.parseValue(n);i!=null&&this.insert(e,i.toString())}}}allowMinusSign(){let e=this.min();return e==null||e<0}isMinusSign(e){return this._minusSign.test(e)||e==="-"?(this._minusSign.lastIndex=0,!0):!1}isDecimalSign(e){return this._decimal.test(e)?(this._decimal.lastIndex=0,!0):!1}isDecimalMode(){return this.mode==="decimal"}getDecimalCharIndexes(e){let n=e.search(this._decimal);this._decimal.lastIndex=0;let o=e.replace(this._prefix,"").trim().replace(/\s/g,"").replace(this._currency,"").search(this._decimal);return this._decimal.lastIndex=0,{decimalCharIndex:n,decimalCharIndexWithoutPrefix:o}}getCharIndexes(e){let n=e.search(this._decimal);this._decimal.lastIndex=0;let i=e.search(this._minusSign);this._minusSign.lastIndex=0;let o=e.search(this._suffix);this._suffix.lastIndex=0;let a=e.search(this._currency);return this._currency.lastIndex=0,{decimalCharIndex:n,minusCharIndex:i,suffixCharIndex:o,currencyCharIndex:a}}insert(e,n,i={isDecimalSign:!1,isMinusSign:!1}){let o=n.search(this._minusSign);if(this._minusSign.lastIndex=0,!this.allowMinusSign()&&o!==-1)return;let a=this.input?.nativeElement.selectionStart,u=this.input?.nativeElement.selectionEnd,h=this.input?.nativeElement.value.trim(),{decimalCharIndex:f,minusCharIndex:y,suffixCharIndex:S,currencyCharIndex:N}=this.getCharIndexes(h),B;if(i.isMinusSign)a===0&&(B=h,(y===-1||u!==0)&&(B=this.insertText(h,n,0,u)),this.updateValue(e,B,n,"insert"));else if(i.isDecimalSign)f>0&&a===f?this.updateValue(e,h,n,"insert"):f>a&&f<u?(B=this.insertText(h,n,a,u),this.updateValue(e,B,n,"insert")):f===-1&&this.maxFractionDigits&&(B=this.insertText(h,n,a,u),this.updateValue(e,B,n,"insert"));else{let q=this.numberFormat.resolvedOptions().maximumFractionDigits,j=a!==u?"range-insert":"insert";if(f>0&&a>f){if(a+n.length-(f+1)<=q){let H=N>=a?N-1:S>=a?S:h.length;B=h.slice(0,a)+n+h.slice(a+n.length,H)+h.slice(H),this.updateValue(e,B,n,j)}}else B=this.insertText(h,n,a,u),this.updateValue(e,B,n,j)}}insertText(e,n,i,o){if((n==="."?n:n.split(".")).length===2){let u=e.slice(i,o).search(this._decimal);return this._decimal.lastIndex=0,u>0?e.slice(0,i)+this.formatValue(n)+e.slice(o):e||this.formatValue(n)}else return o-i===e.length?this.formatValue(n):i===0?n+e.slice(o):o===e.length?e.slice(0,i)+n:e.slice(0,i)+n+e.slice(o)}deleteRange(e,n,i){let o;return i-n===e.length?o="":n===0?o=e.slice(i):i===e.length?o=e.slice(0,n):o=e.slice(0,n)+e.slice(i),o}initCursor(){let e=this.input?.nativeElement.selectionStart,n=this.input?.nativeElement.selectionEnd,i=this.input?.nativeElement.value,o=i.length,a=null,u=(this.prefixChar||"").length;i=i.replace(this._prefix,""),(e===n||e!==0||n<u)&&(e-=u);let h=i.charAt(e);if(this.isNumeralChar(h))return e+u;let f=e-1;for(;f>=0;)if(h=i.charAt(f),this.isNumeralChar(h)){a=f+u;break}else f--;if(a!==null)this.input?.nativeElement.setSelectionRange(a+1,a+1);else{for(f=e;f<o;)if(h=i.charAt(f),this.isNumeralChar(h)){a=f+u;break}else f++;a!==null&&this.input?.nativeElement.setSelectionRange(a,a)}return a||0}onInputClick(){let e=this.input?.nativeElement.value;!this.readonly&&e!==$r()&&this.initCursor()}isNumeralChar(e){return e.length===1&&(this._numeral.test(e)||this._decimal.test(e)||this._group.test(e)||this._minusSign.test(e))?(this.resetRegex(),!0):!1}resetRegex(){this._numeral.lastIndex=0,this._decimal.lastIndex=0,this._group.lastIndex=0,this._minusSign.lastIndex=0}updateValue(e,n,i,o){let a=this.input?.nativeElement.value,u=null;n!=null&&(u=this.parseValue(n),u=!u&&!this.allowEmpty?0:u,this.updateInput(u,i,o,n),this.handleOnInput(e,a,u))}handleOnInput(e,n,i){this.isValueChanged(n,i)&&(this.input.nativeElement.value=this.formatValue(i),this.input?.nativeElement.setAttribute("aria-valuenow",i),this.updateModel(e,i),this.onInput.emit({originalEvent:e,value:i,formattedValue:n}))}isValueChanged(e,n){if(n===null&&e!==null)return!0;if(n!=null){let i=typeof e=="string"?this.parseValue(e):e;return n!==i}return!1}validateValue(e){if(e==="-"||e==null)return null;let n=this.min(),i=this.max();return n!=null&&e<n?this.min():i!=null&&e>i?i:e}updateInput(e,n,i,o){n=n||"";let a=this.input?.nativeElement.value,u=this.formatValue(e),h=a.length;if(u!==o&&(u=this.concatValues(u,o)),h===0){this.input.nativeElement.value=u,this.input.nativeElement.setSelectionRange(0,0);let y=this.initCursor()+n.length;this.input.nativeElement.setSelectionRange(y,y)}else{let f=this.input.nativeElement.selectionStart,y=this.input.nativeElement.selectionEnd,S=this.maxlength();if(S&&u.length>S&&(u=u.slice(0,S),f=Math.min(f,S),y=Math.min(y,S)),S&&S<u.length)return;this.input.nativeElement.value=u;let N=u.length;if(i==="range-insert"){let B=this.parseValue((a||"").slice(0,f)),j=(B!==null?B.toString():"").split("").join(`(${this.groupChar})?`),H=new RegExp(j,"g");H.test(u);let pe=n.split("").join(`(${this.groupChar})?`),ke=new RegExp(pe,"g");ke.test(u.slice(H.lastIndex)),y=H.lastIndex+ke.lastIndex,this.input.nativeElement.setSelectionRange(y,y)}else if(N===h)i==="insert"||i==="delete-back-single"?this.input.nativeElement.setSelectionRange(y+1,y+1):i==="delete-single"?this.input.nativeElement.setSelectionRange(y-1,y-1):(i==="delete-range"||i==="spin")&&this.input.nativeElement.setSelectionRange(y,y);else if(i==="delete-back-single"){let B=a.charAt(y-1),q=a.charAt(y),j=h-N,H=this._group.test(q);H&&j===1?y+=1:!H&&this.isNumeralChar(B)&&(y+=-1*j+1),this._group.lastIndex=0,this.input.nativeElement.setSelectionRange(y,y)}else if(a==="-"&&i==="insert"){this.input.nativeElement.setSelectionRange(0,0);let q=this.initCursor()+n.length+1;this.input.nativeElement.setSelectionRange(q,q)}else y=y+(N-h),this.input.nativeElement.setSelectionRange(y,y)}this.input.nativeElement.setAttribute("aria-valuenow",e)}concatValues(e,n){if(e&&n){let i=n.search(this._decimal);return this._decimal.lastIndex=0,this.suffixChar?i!==-1?e.replace(this.suffixChar,"").split(this._decimal)[0]+n.replace(this.suffixChar,"").slice(i)+this.suffixChar:e:i!==-1?e.split(this._decimal)[0]+n.slice(i):e}return e}getDecimalLength(e){if(e){let n=e.split(this._decimal);if(n.length===2)return n[1].replace(this._suffix,"").trim().replace(/\s/g,"").replace(this._currency,"").length}return 0}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1;let n=this.validateValue(this.parseValue(this.input.nativeElement.value)),i=n?.toString();this.input.nativeElement.value=this.formatValue(i),this.input.nativeElement.setAttribute("aria-valuenow",i),this.updateModel(e,n),this.onModelTouched(),this.onBlur.emit(e)}formattedValue(){let e=!this.value&&!this.allowEmpty?0:this.value;return this.formatValue(e)}updateModel(e,n){let i=this.ngControl?.control?.updateOn==="blur";this.value!==n?(this.value=n,i&&this.focused||this.onModelChange(n)):i&&this.onModelChange(n)}writeControlValue(e,n){this.value=e&&Number(e),n(e),this.cd.markForCheck()}clearTimer(){this.timer&&clearInterval(this.timer)}get dataP(){return this.cn({invalid:this.invalid(),disabled:this.$disabled(),focus:this.focused,fluid:this.hasFluid,filled:this.$variant()==="filled",empty:!this.$filled(),[this.size()]:this.size(),[this.buttonLayout]:this.showButtons&&this.buttonLayout})}static \u0275fac=function(n){return new(n||t)(Qe(Bt))};static \u0275cmp=E({type:t,selectors:[["p-inputNumber"],["p-inputnumber"],["p-input-number"]],contentQueries:function(n,i,o){if(n&1&&Re(o,ef,4)(o,tf,4)(o,nf,4)(o,Me,4),n&2){let a;k(a=T())&&(i.clearIconTemplate=a.first),k(a=T())&&(i.incrementButtonIconTemplate=a.first),k(a=T())&&(i.decrementButtonIconTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(of,5),n&2){let o;k(o=T())&&(i.input=o.first)}},hostVars:3,hostBindings:function(n,i){n&2&&(D("data-p",i.dataP),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{showButtons:[2,"showButtons","showButtons",w],format:[2,"format","format",w],buttonLayout:"buttonLayout",inputId:"inputId",styleClass:"styleClass",placeholder:"placeholder",tabindex:[2,"tabindex","tabindex",se],title:"title",ariaLabelledBy:"ariaLabelledBy",ariaDescribedBy:"ariaDescribedBy",ariaLabel:"ariaLabel",ariaRequired:[2,"ariaRequired","ariaRequired",w],autocomplete:"autocomplete",incrementButtonClass:"incrementButtonClass",decrementButtonClass:"decrementButtonClass",incrementButtonIcon:"incrementButtonIcon",decrementButtonIcon:"decrementButtonIcon",readonly:[2,"readonly","readonly",w],allowEmpty:[2,"allowEmpty","allowEmpty",w],locale:"locale",localeMatcher:"localeMatcher",mode:"mode",currency:"currency",currencyDisplay:"currencyDisplay",useGrouping:[2,"useGrouping","useGrouping",w],minFractionDigits:[2,"minFractionDigits","minFractionDigits",e=>se(e,void 0)],maxFractionDigits:[2,"maxFractionDigits","maxFractionDigits",e=>se(e,void 0)],prefix:"prefix",suffix:"suffix",inputStyle:"inputStyle",inputStyleClass:"inputStyleClass",showClear:[2,"showClear","showClear",w],autofocus:[2,"autofocus","autofocus",w]},outputs:{onInput:"onInput",onFocus:"onFocus",onBlur:"onBlur",onKeyDown:"onKeyDown",onClear:"onClear"},features:[le([Bf,rs,{provide:as,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:6,vars:38,consts:[["input",""],["pInputText","","role","spinbutton","inputmode","decimal",3,"input","keydown","keypress","paste","click","focus","blur","value","ngStyle","variant","invalid","pSize","pt","unstyled","pAutoFocus","fluid"],[4,"ngIf"],[3,"pBind","class",4,"ngIf"],["type","button","tabindex","-1",3,"pBind","class","mousedown","mouseup","mouseleave","keydown","keyup",4,"ngIf"],["data-p-icon","times",3,"pBind","class","click",4,"ngIf"],[3,"pBind","class","click",4,"ngIf"],["data-p-icon","times",3,"click","pBind"],[3,"click","pBind"],[4,"ngTemplateOutlet"],[3,"pBind"],["type","button","tabindex","-1",3,"mousedown","mouseup","mouseleave","keydown","keyup","pBind"],[3,"pBind","ngClass",4,"ngIf"],[3,"pBind","ngClass"],["data-p-icon","angle-up",3,"pBind",4,"ngIf"],["data-p-icon","angle-up",3,"pBind"],["data-p-icon","angle-down",3,"pBind",4,"ngIf"],["data-p-icon","angle-down",3,"pBind"]],template:function(n,i){n&1&&(c(0,"input",1,0),x("input",function(a){return i.onUserInput(a)})("keydown",function(a){return i.onInputKeyDown(a)})("keypress",function(a){return i.onInputKeyPress(a)})("paste",function(a){return i.onPaste(a)})("click",function(){return i.onInputClick()})("focus",function(a){return i.onInputFocus(a)})("blur",function(a){return i.onInputBlur(a)}),p(),g(2,df,3,2,"ng-container",2)(3,vf,7,20,"span",3)(4,Sf,3,8,"button",4)(5,Pf,3,8,"button",4)),n&2&&(C(i.cn(i.cx("pcInputText"),i.inputStyleClass)),s("value",i.formattedValue())("ngStyle",i.inputStyle)("variant",i.$variant())("invalid",i.invalid())("pSize",i.size())("pt",i.ptm("pcInputText"))("unstyled",i.unstyled())("pAutoFocus",i.autofocus)("fluid",i.hasFluid),D("id",i.inputId)("aria-valuemin",i.min())("aria-valuemax",i.max())("aria-valuenow",i.value)("placeholder",i.placeholder)("aria-label",i.ariaLabel)("aria-labelledby",i.ariaLabelledBy)("aria-describedby",i.ariaDescribedBy)("title",i.title)("size",i.inputSize())("name",i.name())("autocomplete",i.autocomplete)("maxlength",i.maxlength())("minlength",i.minlength())("tabindex",i.tabindex)("aria-required",i.ariaRequired)("min",i.min())("max",i.max())("step",i.step()??1)("required",i.required()?"":void 0)("readonly",i.readonly?"":void 0)("disabled",i.$disabled()?"":void 0)("data-p",i.dataP),l(2),s("ngIf",i.buttonLayout!="vertical"&&i.showClear&&i.value),l(),s("ngIf",i.showButtons&&i.buttonLayout==="stacked"),l(),s("ngIf",i.showButtons&&i.buttonLayout!=="stacked"),l(),s("ngIf",i.showButtons&&i.buttonLayout!=="stacked"))},dependencies:[te,at,ze,Le,rt,$n,Xt,fn,al,il,ie,Ve,A],encapsulation:2,changeDetection:0})}return t})(),ls=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[uo,ie,ie]})}return t})();var ss=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`;var Of=["*"],Vf={root:({instance:t})=>["p-iconfield",{"p-iconfield-left":t.iconPosition=="left","p-iconfield-right":t.iconPosition=="right"}]},ds=(()=>{class t extends fe{name="iconfield";style=ss;classes=Vf;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var cs=new ae("ICONFIELD_INSTANCE"),ps=(()=>{class t extends De{componentName="IconField";hostName="";_componentStyle=v(ds);$pcIconField=v(cs,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}iconPosition="left";styleClass;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostVars:2,hostBindings:function(n,i){n&2&&C(i.cn(i.cx("root"),i.styleClass))},inputs:{hostName:"hostName",iconPosition:"iconPosition",styleClass:"styleClass"},features:[le([ds,{provide:cs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:Of,decls:1,vars:0,template:function(n,i){n&1&&(Ge(),Ne(0))},dependencies:[te,Ve],encapsulation:2,changeDetection:0})}return t})();var zf=["*"],qf={root:"p-inputicon"},us=(()=>{class t extends fe{name="inputicon";classes=qf;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})(),ms=new ae("INPUTICON_INSTANCE"),hs=(()=>{class t extends De{componentName="InputIcon";hostName="";styleClass;_componentStyle=v(us);$pcInputIcon=v(ms,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:2,hostBindings:function(n,i){n&2&&C(i.cn(i.cx("root"),i.styleClass))},inputs:{hostName:"hostName",styleClass:"styleClass"},features:[le([us,{provide:ms,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:zf,decls:1,vars:0,template:function(n,i){n&1&&(Ge(),Ne(0))},dependencies:[te,ie,Ve],encapsulation:2,changeDetection:0})}return t})();var fs=["content"],Af=["overlay"],gs=["*","*"],Nf=()=>({mode:null}),ys=t=>({$implicit:t}),Hf=t=>({mode:t});function $f(t,r){t&1&&U(0)}function jf(t,r){if(t&1&&(Ne(0),g(1,$f,1,0,"ng-container",3)),t&2){let e=d();l(),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",oe(3,ys,Ct(2,Nf)))}}function Uf(t,r){t&1&&U(0)}function Qf(t,r){if(t&1){let e=P();c(0,"div",5,0),x("click",function(){_(e);let i=d(2);return b(i.onOverlayClick())}),c(2,"p-motion",6),x("onBeforeEnter",function(i){_(e);let o=d(2);return b(o.onOverlayBeforeEnter(i))})("onEnter",function(i){_(e);let o=d(2);return b(o.onOverlayEnter(i))})("onAfterEnter",function(i){_(e);let o=d(2);return b(o.onOverlayAfterEnter(i))})("onBeforeLeave",function(i){_(e);let o=d(2);return b(o.onOverlayBeforeLeave(i))})("onLeave",function(i){_(e);let o=d(2);return b(o.onOverlayLeave(i))})("onAfterLeave",function(i){_(e);let o=d(2);return b(o.onOverlayAfterLeave(i))}),c(3,"div",5,1),x("click",function(i){_(e);let o=d(2);return b(o.onOverlayContentClick(i))}),Ne(5,1),g(6,Uf,1,0,"ng-container",3),p()()()}if(t&2){let e=d(2);Ae(e.sx("root")),C(e.cn(e.cx("root"),e.styleClass)),s("pBind",e.ptm("root")),l(2),s("visible",e.visible)("appear",!0)("options",e.computedMotionOptions()),l(),C(e.cn(e.cx("content"),e.contentStyleClass)),s("pBind",e.ptm("content")),l(3),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",oe(15,ys,oe(13,Hf,e.overlayMode)))}}function Gf(t,r){if(t&1&&g(0,Qf,7,17,"div",4),t&2){let e=d();s("ngIf",e.modalVisible)}}var Wf={root:()=>({position:"absolute",top:"0"})},Kf=`
.p-overlay-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.p-overlay-content {
    transform-origin: inherit;
    will-change: transform;
}

/* Github Issue #18560 */
.p-component-overlay.p-component {
    position: relative;
}

.p-overlay-modal > .p-overlay-content {
    z-index: 1;
    width: 90%;
}

/* Position */
/* top */
.p-overlay-top {
    align-items: flex-start;
}
.p-overlay-top-start {
    align-items: flex-start;
    justify-content: flex-start;
}
.p-overlay-top-end {
    align-items: flex-start;
    justify-content: flex-end;
}

/* bottom */
.p-overlay-bottom {
    align-items: flex-end;
}
.p-overlay-bottom-start {
    align-items: flex-end;
    justify-content: flex-start;
}
.p-overlay-bottom-end {
    align-items: flex-end;
    justify-content: flex-end;
}

/* left */
.p-overlay-left {
    justify-content: flex-start;
}
.p-overlay-left-start {
    justify-content: flex-start;
    align-items: flex-start;
}
.p-overlay-left-end {
    justify-content: flex-start;
    align-items: flex-end;
}

/* right */
.p-overlay-right {
    justify-content: flex-end;
}
.p-overlay-right-start {
    justify-content: flex-end;
    align-items: flex-start;
}
.p-overlay-right-end {
    justify-content: flex-end;
    align-items: flex-end;
}

.p-overlay-content ~ .p-overlay-content {
    display: none;
}
`,Yf={host:"p-overlay-host",root:({instance:t})=>["p-overlay p-component",{"p-overlay-modal p-overlay-mask p-overlay-mask-enter-active":t.modal,"p-overlay-center":t.modal&&t.overlayResponsiveDirection==="center","p-overlay-top":t.modal&&t.overlayResponsiveDirection==="top","p-overlay-top-start":t.modal&&t.overlayResponsiveDirection==="top-start","p-overlay-top-end":t.modal&&t.overlayResponsiveDirection==="top-end","p-overlay-bottom":t.modal&&t.overlayResponsiveDirection==="bottom","p-overlay-bottom-start":t.modal&&t.overlayResponsiveDirection==="bottom-start","p-overlay-bottom-end":t.modal&&t.overlayResponsiveDirection==="bottom-end","p-overlay-left":t.modal&&t.overlayResponsiveDirection==="left","p-overlay-left-start":t.modal&&t.overlayResponsiveDirection==="left-start","p-overlay-left-end":t.modal&&t.overlayResponsiveDirection==="left-end","p-overlay-right":t.modal&&t.overlayResponsiveDirection==="right","p-overlay-right-start":t.modal&&t.overlayResponsiveDirection==="right-start","p-overlay-right-end":t.modal&&t.overlayResponsiveDirection==="right-end"}],content:"p-overlay-content"},_s=(()=>{class t extends fe{name="overlay";style=Kf;classes=Yf;inlineStyles=Wf;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})(),bs=new ae("OVERLAY_INSTANCE"),vs=(()=>{class t extends De{overlayService;zone;componentName="Overlay";$pcOverlay=v(bs,{optional:!0,skipSelf:!0})??void 0;hostName="";get visible(){return this._visible}set visible(e){this._visible=e,this._visible&&!this.modalVisible&&(this.modalVisible=!0)}get mode(){return this._mode||this.overlayOptions?.mode}set mode(e){this._mode=e}get style(){return ce.merge(this._style,this.modal?this.overlayResponsiveOptions?.style:this.overlayOptions?.style)}set style(e){this._style=e}get styleClass(){return ce.merge(this._styleClass,this.modal?this.overlayResponsiveOptions?.styleClass:this.overlayOptions?.styleClass)}set styleClass(e){this._styleClass=e}get contentStyle(){return ce.merge(this._contentStyle,this.modal?this.overlayResponsiveOptions?.contentStyle:this.overlayOptions?.contentStyle)}set contentStyle(e){this._contentStyle=e}get contentStyleClass(){return ce.merge(this._contentStyleClass,this.modal?this.overlayResponsiveOptions?.contentStyleClass:this.overlayOptions?.contentStyleClass)}set contentStyleClass(e){this._contentStyleClass=e}get target(){let e=this._target||this.overlayOptions?.target;return e===void 0?"@prev":e}set target(e){this._target=e}get autoZIndex(){let e=this._autoZIndex||this.overlayOptions?.autoZIndex;return e===void 0?!0:e}set autoZIndex(e){this._autoZIndex=e}get baseZIndex(){let e=this._baseZIndex||this.overlayOptions?.baseZIndex;return e===void 0?0:e}set baseZIndex(e){this._baseZIndex=e}get showTransitionOptions(){let e=this._showTransitionOptions||this.overlayOptions?.showTransitionOptions;return e===void 0?".12s cubic-bezier(0, 0, 0.2, 1)":e}set showTransitionOptions(e){this._showTransitionOptions=e}get hideTransitionOptions(){let e=this._hideTransitionOptions||this.overlayOptions?.hideTransitionOptions;return e===void 0?".1s linear":e}set hideTransitionOptions(e){this._hideTransitionOptions=e}get listener(){return this._listener||this.overlayOptions?.listener}set listener(e){this._listener=e}get responsive(){return this._responsive||this.overlayOptions?.responsive}set responsive(e){this._responsive=e}get options(){return this._options}set options(e){this._options=e}appendTo=ee(void 0);inline=ee(!1);motionOptions=ee(void 0);computedMotionOptions=J(()=>G(G({},this.ptm("motion")),this.motionOptions()||this.overlayOptions?.motionOptions));visibleChange=new I;onBeforeShow=new I;onShow=new I;onBeforeHide=new I;onHide=new I;onAnimationStart=new I;onAnimationDone=new I;onBeforeEnter=new I;onEnter=new I;onAfterEnter=new I;onBeforeLeave=new I;onLeave=new I;onAfterLeave=new I;overlayViewChild;contentViewChild;contentTemplate;templates;hostAttrSelector=ee();$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());_contentTemplate;_visible=!1;_mode;_style;_styleClass;_contentStyle;_contentStyleClass;_target;_autoZIndex;_baseZIndex;_showTransitionOptions;_hideTransitionOptions;_listener;_responsive;_options;modalVisible=!1;isOverlayClicked=!1;isOverlayContentClicked=!1;scrollHandler;documentClickListener;documentResizeListener;_componentStyle=v(_s);bindDirectiveInstance=v(A,{self:!0});documentKeyboardListener;parentDragSubscription=null;window;transformOptions={default:"scaleY(0.8)",center:"scale(0.7)",top:"translate3d(0px, -100%, 0px)","top-start":"translate3d(0px, -100%, 0px)","top-end":"translate3d(0px, -100%, 0px)",bottom:"translate3d(0px, 100%, 0px)","bottom-start":"translate3d(0px, 100%, 0px)","bottom-end":"translate3d(0px, 100%, 0px)",left:"translate3d(-100%, 0px, 0px)","left-start":"translate3d(-100%, 0px, 0px)","left-end":"translate3d(-100%, 0px, 0px)",right:"translate3d(100%, 0px, 0px)","right-start":"translate3d(100%, 0px, 0px)","right-end":"translate3d(100%, 0px, 0px)"};get modal(){if(qe(this.platformId))return this.mode==="modal"||this.overlayResponsiveOptions&&this.document.defaultView?.matchMedia(this.overlayResponsiveOptions.media?.replace("@media","")||`(max-width: ${this.overlayResponsiveOptions.breakpoint})`).matches}get overlayMode(){return this.mode||(this.modal?"modal":"overlay")}get overlayOptions(){return G(G({},this.config?.overlayOptions),this.options)}get overlayResponsiveOptions(){return G(G({},this.overlayOptions?.responsive),this.responsive)}get overlayResponsiveDirection(){return this.overlayResponsiveOptions?.direction||"center"}get overlayEl(){return this.overlayViewChild?.nativeElement}get contentEl(){return this.contentViewChild?.nativeElement}get targetEl(){return Ar(this.target,this.el?.nativeElement)}constructor(e,n){super(),this.overlayService=e,this.zone=n}onAfterContentInit(){this.templates?.forEach(e=>{e.getType()==="content"?this._contentTemplate=e.template:this._contentTemplate=e.template})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host"))}show(e,n=!1){this.onVisibleChange(!0),this.handleEvents("onShow",{overlay:e||this.overlayEl,target:this.targetEl,mode:this.overlayMode}),n&&mt(this.targetEl),this.modal&&dn(this.document?.body,"p-overflow-hidden")}hide(e,n=!1){if(this.visible)this.onVisibleChange(!1),this.handleEvents("onHide",{overlay:e||this.overlayEl,target:this.targetEl,mode:this.overlayMode}),n&&mt(this.targetEl),this.modal&&zt(this.document?.body,"p-overflow-hidden");else return}onVisibleChange(e){this._visible=e,this.visibleChange.emit(e)}onOverlayClick(){this.isOverlayClicked=!0}onOverlayContentClick(e){this.overlayService.add({originalEvent:e,target:this.targetEl}),this.isOverlayContentClicked=!0}container=Z(void 0);onOverlayBeforeEnter(e){this.handleEvents("onBeforeShow",{overlay:this.overlayEl,target:this.targetEl,mode:this.overlayMode}),this.container.set(this.overlayEl||e.element),this.show(this.overlayEl,!0),this.hostAttrSelector()&&this.overlayEl&&this.overlayEl.setAttribute(this.hostAttrSelector(),""),this.appendOverlay(),this.alignOverlay(),this.bindParentDragListener(),this.setZIndex(),this.handleEvents("onBeforeEnter",e)}onOverlayEnter(e){this.handleEvents("onEnter",e)}onOverlayAfterEnter(e){this.bindListeners(),this.handleEvents("onAfterEnter",e)}onOverlayBeforeLeave(e){this.handleEvents("onBeforeHide",{overlay:this.overlayEl,target:this.targetEl,mode:this.overlayMode}),this.handleEvents("onBeforeLeave",e)}onOverlayLeave(e){this.handleEvents("onLeave",e)}onOverlayAfterLeave(e){this.hide(this.overlayEl,!0),this.container.set(null),this.unbindListeners(),this.appendOverlay(),Ue.clear(this.overlayEl),this.modalVisible=!1,this.cd.markForCheck(),this.handleEvents("onAfterLeave",e)}handleEvents(e,n){this[e].emit(n),this.options&&this.options[e]&&this.options[e](n),this.config?.overlayOptions&&(this.config?.overlayOptions)[e]&&(this.config?.overlayOptions)[e](n)}setZIndex(){this.autoZIndex&&Ue.set(this.overlayMode,this.overlayEl,this.baseZIndex+this.config?.zIndex[this.overlayMode])}appendOverlay(){this.$appendTo()&&this.$appendTo()!=="self"&&(this.$appendTo()==="body"?qt(this.document.body,this.overlayEl):qt(this.$appendTo(),this.overlayEl))}alignOverlay(){this.modal||this.overlayEl&&this.targetEl&&(this.overlayEl.style.minWidth=Ye(this.targetEl)+"px",this.$appendTo()==="self"?vi(this.overlayEl,this.targetEl):Xn(this.overlayEl,this.targetEl))}bindListeners(){this.bindScrollListener(),this.bindDocumentClickListener(),this.bindDocumentResizeListener(),this.bindDocumentKeyboardListener()}unbindListeners(){this.unbindScrollListener(),this.unbindDocumentClickListener(),this.unbindDocumentResizeListener(),this.unbindDocumentKeyboardListener(),this.unbindParentDragListener()}bindParentDragListener(){!this.parentDragSubscription&&this.$appendTo()!=="self"&&this.targetEl&&(this.parentDragSubscription=this.overlayService.parentDragObservable.subscribe(e=>{e.contains(this.targetEl)&&this.hide(this.overlayEl,!0)}))}unbindParentDragListener(){this.parentDragSubscription&&(this.parentDragSubscription.unsubscribe(),this.parentDragSubscription=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new rn(this.targetEl,e=>{(!this.listener||this.listener(e,{type:"scroll",mode:this.overlayMode,valid:!0}))&&this.hide(e,!0)})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}bindDocumentClickListener(){this.documentClickListener||(this.documentClickListener=this.renderer.listen(this.document,"click",e=>{let i=!(this.targetEl&&(this.targetEl.isSameNode(e.target)||!this.isOverlayClicked&&this.targetEl.contains(e.target)))&&!this.isOverlayContentClicked;(this.listener?this.listener(e,{type:"outside",mode:this.overlayMode,valid:e.which!==3&&i}):i)&&this.hide(e),this.isOverlayClicked=this.isOverlayContentClicked=!1}))}unbindDocumentClickListener(){this.documentClickListener&&(this.documentClickListener(),this.documentClickListener=null)}bindDocumentResizeListener(){this.documentResizeListener||(this.documentResizeListener=this.renderer.listen(this.document.defaultView,"resize",e=>{(this.listener?this.listener(e,{type:"resize",mode:this.overlayMode,valid:!nn()}):!nn())&&this.hide(e,!0)}))}unbindDocumentResizeListener(){this.documentResizeListener&&(this.documentResizeListener(),this.documentResizeListener=null)}bindDocumentKeyboardListener(){this.documentKeyboardListener||this.zone.runOutsideAngular(()=>{this.documentKeyboardListener=this.renderer.listen(this.document.defaultView,"keydown",e=>{if(this.overlayOptions.hideOnEscape===!1||e.code!=="Escape")return;(this.listener?this.listener(e,{type:"keydown",mode:this.overlayMode,valid:!nn()}):!nn())&&this.zone.run(()=>{this.hide(e,!0)})})})}unbindDocumentKeyboardListener(){this.documentKeyboardListener&&(this.documentKeyboardListener(),this.documentKeyboardListener=null)}onDestroy(){this.hide(this.overlayEl,!0),this.overlayEl&&this.$appendTo()!=="self"&&(this.renderer.appendChild(this.el.nativeElement,this.overlayEl),Ue.clear(this.overlayEl)),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.unbindListeners()}static \u0275fac=function(n){return new(n||t)(Qe(pn),Qe(Be))};static \u0275cmp=E({type:t,selectors:[["p-overlay"]],contentQueries:function(n,i,o){if(n&1&&Re(o,fs,4)(o,Me,4),n&2){let a;k(a=T())&&(i.contentTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(Af,5)(fs,5),n&2){let o;k(o=T())&&(i.overlayViewChild=o.first),k(o=T())&&(i.contentViewChild=o.first)}},inputs:{hostName:"hostName",visible:"visible",mode:"mode",style:"style",styleClass:"styleClass",contentStyle:"contentStyle",contentStyleClass:"contentStyleClass",target:"target",autoZIndex:"autoZIndex",baseZIndex:"baseZIndex",showTransitionOptions:"showTransitionOptions",hideTransitionOptions:"hideTransitionOptions",listener:"listener",responsive:"responsive",options:"options",appendTo:[1,"appendTo"],inline:[1,"inline"],motionOptions:[1,"motionOptions"],hostAttrSelector:[1,"hostAttrSelector"]},outputs:{visibleChange:"visibleChange",onBeforeShow:"onBeforeShow",onShow:"onShow",onBeforeHide:"onBeforeHide",onHide:"onHide",onAnimationStart:"onAnimationStart",onAnimationDone:"onAnimationDone",onBeforeEnter:"onBeforeEnter",onEnter:"onEnter",onAfterEnter:"onAfterEnter",onBeforeLeave:"onBeforeLeave",onLeave:"onLeave",onAfterLeave:"onAfterLeave"},features:[le([_s,{provide:bs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:gs,decls:2,vars:1,consts:[["overlay",""],["content",""],[3,"class","style","pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","style","pBind","click",4,"ngIf"],[3,"click","pBind"],["name","p-anchored-overlay",3,"onBeforeEnter","onEnter","onAfterEnter","onBeforeLeave","onLeave","onAfterLeave","visible","appear","options"]],template:function(n,i){n&1&&(Ge(gs),V(0,jf,2,5)(1,Gf,1,1,"div",2)),n&2&&z(i.inline()?0:1)},dependencies:[te,ze,Le,ie,A,gn,Fi],encapsulation:2,changeDetection:0})}return t})();var xs=["content"],Zf=["item"],Xf=["loader"],Jf=["loadericon"],eg=["element"],tg=["*"],lr=(t,r)=>({$implicit:t,options:r}),ng=t=>({numCols:t}),ks=t=>({options:t}),ig=()=>({styleClass:"p-virtualscroller-loading-icon"}),og=(t,r)=>({rows:t,columns:r});function rg(t,r){t&1&&U(0)}function ag(t,r){if(t&1&&(W(0),g(1,rg,1,0,"ng-container",10),K()),t&2){let e=d(2);l(),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",Pe(2,lr,e.loadedItems,e.getContentOptions()))}}function lg(t,r){t&1&&U(0)}function sg(t,r){if(t&1&&(W(0),g(1,lg,1,0,"ng-container",10),K()),t&2){let e=r.$implicit,n=r.index,i=d(3);l(),s("ngTemplateOutlet",i.itemTemplate||i._itemTemplate)("ngTemplateOutletContext",Pe(2,lr,e,i.getOptions(n)))}}function dg(t,r){if(t&1&&(c(0,"div",11,3),g(2,sg,2,5,"ng-container",12),p()),t&2){let e=d(2);Ae(e.contentStyle),C(e.cn(e.cx("content"),e.contentStyleClass)),s("pBind",e.ptm("content")),l(2),s("ngForOf",e.loadedItems)("ngForTrackBy",e._trackBy)}}function cg(t,r){if(t&1&&F(0,"div",13),t&2){let e=d(2);C(e.cx("spacer")),s("ngStyle",e.spacerStyle)("pBind",e.ptm("spacer"))}}function pg(t,r){t&1&&U(0)}function ug(t,r){if(t&1&&(W(0),g(1,pg,1,0,"ng-container",10),K()),t&2){let e=r.index,n=d(4);l(),s("ngTemplateOutlet",n.loaderTemplate||n._loaderTemplate)("ngTemplateOutletContext",oe(4,ks,n.getLoaderOptions(e,n.both&&oe(2,ng,n.numItemsInViewport.cols))))}}function mg(t,r){if(t&1&&(W(0),g(1,ug,2,6,"ng-container",14),K()),t&2){let e=d(3);l(),s("ngForOf",e.loaderArr)}}function hg(t,r){t&1&&U(0)}function fg(t,r){if(t&1&&(W(0),g(1,hg,1,0,"ng-container",10),K()),t&2){let e=d(4);l(),s("ngTemplateOutlet",e.loaderIconTemplate||e._loaderIconTemplate)("ngTemplateOutletContext",oe(3,ks,Ct(2,ig)))}}function gg(t,r){if(t&1&&(O(),F(0,"svg",15)),t&2){let e=d(4);C(e.cx("loadingIcon")),s("spin",!0)("pBind",e.ptm("loadingIcon"))}}function _g(t,r){if(t&1&&g(0,fg,2,5,"ng-container",6)(1,gg,1,4,"ng-template",null,5,Ie),t&2){let e=Se(2),n=d(3);s("ngIf",n.loaderIconTemplate||n._loaderIconTemplate)("ngIfElse",e)}}function bg(t,r){if(t&1&&(c(0,"div",11),g(1,mg,2,1,"ng-container",6)(2,_g,3,2,"ng-template",null,4,Ie),p()),t&2){let e=Se(3),n=d(2);C(n.cx("loader")),s("pBind",n.ptm("loader")),l(),s("ngIf",n.loaderTemplate||n._loaderTemplate)("ngIfElse",e)}}function yg(t,r){if(t&1){let e=P();W(0),c(1,"div",7,1),x("scroll",function(i){_(e);let o=d();return b(o.onContainerScroll(i))}),g(3,ag,2,5,"ng-container",6)(4,dg,3,7,"ng-template",null,2,Ie)(6,cg,1,4,"div",8)(7,bg,4,5,"div",9),p(),K()}if(t&2){let e=Se(5),n=d();l(),C(n.cn(n.cx("root"),n.styleClass)),s("ngStyle",n._style)("pBind",n.ptm("root")),D("id",n._id)("tabindex",n.tabindex),l(2),s("ngIf",n.contentTemplate||n._contentTemplate)("ngIfElse",e),l(3),s("ngIf",n._showSpacer),l(),s("ngIf",!n.loaderDisabled&&n._showLoader&&n.d_loading)}}function vg(t,r){t&1&&U(0)}function xg(t,r){if(t&1&&(W(0),g(1,vg,1,0,"ng-container",10),K()),t&2){let e=d(2);l(),s("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",Pe(5,lr,e.items,Pe(2,og,e._items,e.loadedColumns)))}}function Cg(t,r){if(t&1&&(Ne(0),g(1,xg,2,8,"ng-container",16)),t&2){let e=d();l(),s("ngIf",e.contentTemplate||e._contentTemplate)}}var wg=`
.p-virtualscroller {
    position: relative;
    overflow: auto;
    contain: strict;
    transform: translateZ(0);
    will-change: scroll-position;
    outline: 0 none;
}

.p-virtualscroller-content {
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100%;
    min-width: 100%;
    will-change: transform;
}

.p-virtualscroller-spacer {
    position: absolute;
    top: 0;
    left: 0;
    height: 1px;
    width: 1px;
    transform-origin: 0 0;
    pointer-events: none;
}

.p-virtualscroller-loader {
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: dt('virtualscroller.loader.mask.background');
    color: dt('virtualscroller.loader.mask.color');
}

.p-virtualscroller-loader-mask {
    display: flex;
    align-items: center;
    justify-content: center;
}

.p-virtualscroller-loading-icon {
    font-size: dt('virtualscroller.loader.icon.size');
    width: dt('virtualscroller.loader.icon.size');
    height: dt('virtualscroller.loader.icon.size');
}

.p-virtualscroller-horizontal > .p-virtualscroller-content {
    display: flex;
}

.p-virtualscroller-inline .p-virtualscroller-content {
    position: static;
}
`,kg={root:({instance:t})=>["p-virtualscroller",{"p-virtualscroller-inline":t.inline,"p-virtualscroller-both p-both-scroll":t.both,"p-virtualscroller-horizontal p-horizontal-scroll":t.horizontal}],content:"p-virtualscroller-content",spacer:"p-virtualscroller-spacer",loader:({instance:t})=>["p-virtualscroller-loader",{"p-virtualscroller-loader-mask":!t.loaderTemplate}],loadingIcon:"p-virtualscroller-loading-icon"},Cs=(()=>{class t extends fe{name="virtualscroller";css=wg;classes=kg;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var ws=new ae("SCROLLER_INSTANCE"),mi=(()=>{class t extends De{zone;componentName="VirtualScroller";bindDirectiveInstance=v(A,{self:!0});$pcScroller=v(ws,{optional:!0,skipSelf:!0})??void 0;hostName="";get id(){return this._id}set id(e){this._id=e}get style(){return this._style}set style(e){this._style=e}get styleClass(){return this._styleClass}set styleClass(e){this._styleClass=e}get tabindex(){return this._tabindex}set tabindex(e){this._tabindex=e}get items(){return this._items}set items(e){this._items=e}get itemSize(){return this._itemSize}set itemSize(e){this._itemSize=e}get scrollHeight(){return this._scrollHeight}set scrollHeight(e){this._scrollHeight=e}get scrollWidth(){return this._scrollWidth}set scrollWidth(e){this._scrollWidth=e}get orientation(){return this._orientation}set orientation(e){this._orientation=e}get step(){return this._step}set step(e){this._step=e}get delay(){return this._delay}set delay(e){this._delay=e}get resizeDelay(){return this._resizeDelay}set resizeDelay(e){this._resizeDelay=e}get appendOnly(){return this._appendOnly}set appendOnly(e){this._appendOnly=e}get inline(){return this._inline}set inline(e){this._inline=e}get lazy(){return this._lazy}set lazy(e){this._lazy=e}get disabled(){return this._disabled}set disabled(e){this._disabled=e}get loaderDisabled(){return this._loaderDisabled}set loaderDisabled(e){this._loaderDisabled=e}get columns(){return this._columns}set columns(e){this._columns=e}get showSpacer(){return this._showSpacer}set showSpacer(e){this._showSpacer=e}get showLoader(){return this._showLoader}set showLoader(e){this._showLoader=e}get numToleratedItems(){return this._numToleratedItems}set numToleratedItems(e){this._numToleratedItems=e}get loading(){return this._loading}set loading(e){this._loading=e}get autoSize(){return this._autoSize}set autoSize(e){this._autoSize=e}get trackBy(){return this._trackBy}set trackBy(e){this._trackBy=e}get options(){return this._options}set options(e){this._options=e,e&&typeof e=="object"&&(Object.entries(e).forEach(([n,i])=>this[`_${n}`]!==i&&(this[`_${n}`]=i)),Object.entries(e).forEach(([n,i])=>this[`${n}`]!==i&&(this[`${n}`]=i)))}onLazyLoad=new I;onScroll=new I;onScrollIndexChange=new I;elementViewChild;contentViewChild;height;_id;_style;_styleClass;_tabindex=0;_items;_itemSize=0;_scrollHeight;_scrollWidth;_orientation="vertical";_step=0;_delay=0;_resizeDelay=10;_appendOnly=!1;_inline=!1;_lazy=!1;_disabled=!1;_loaderDisabled=!1;_columns;_showSpacer=!0;_showLoader=!1;_numToleratedItems;_loading;_autoSize=!1;_trackBy;_options;d_loading=!1;d_numToleratedItems;contentEl;contentTemplate;itemTemplate;loaderTemplate;loaderIconTemplate;templates;_contentTemplate;_itemTemplate;_loaderTemplate;_loaderIconTemplate;first=0;last=0;page=0;isRangeChanged=!1;numItemsInViewport=0;lastScrollPos=0;lazyLoadState={};loaderArr=[];spacerStyle={};contentStyle={};scrollTimeout;resizeTimeout;initialized=!1;windowResizeListener;defaultWidth;defaultHeight;defaultContentWidth;defaultContentHeight;_contentStyleClass;get contentStyleClass(){return this._contentStyleClass}set contentStyleClass(e){this._contentStyleClass=e}get vertical(){return this._orientation==="vertical"}get horizontal(){return this._orientation==="horizontal"}get both(){return this._orientation==="both"}get loadedItems(){return this._items&&!this.d_loading?this.both?this._items.slice(this._appendOnly?0:this.first.rows,this.last.rows).map(e=>this._columns?e:Array.isArray(e)?e.slice(this._appendOnly?0:this.first.cols,this.last.cols):e):this.horizontal&&this._columns?this._items:this._items.slice(this._appendOnly?0:this.first,this.last):[]}get loadedRows(){return this.d_loading?this._loaderDisabled?this.loaderArr:[]:this.loadedItems}get loadedColumns(){return this._columns&&(this.both||this.horizontal)?this.d_loading&&this._loaderDisabled?this.both?this.loaderArr[0]:this.loaderArr:this._columns.slice(this.both?this.first.cols:this.first,this.both?this.last.cols:this.last):this._columns}_componentStyle=v(Cs);constructor(e){super(),this.zone=e}onInit(){this.setInitialState()}onChanges(e){let n=!1;if(this.scrollHeight=="100%"&&(this.height="100%"),e.loading){let{previousValue:i,currentValue:o}=e.loading;this.lazy&&i!==o&&o!==this.d_loading&&(this.d_loading=o,n=!0)}if(e.orientation&&(this.lastScrollPos=this.both?{top:0,left:0}:0),e.numToleratedItems){let{previousValue:i,currentValue:o}=e.numToleratedItems;i!==o&&o!==this.d_numToleratedItems&&(this.d_numToleratedItems=o)}if(e.options){let{previousValue:i,currentValue:o}=e.options;this.lazy&&i?.loading!==o?.loading&&o?.loading!==this.d_loading&&(this.d_loading=o.loading,n=!0),i?.numToleratedItems!==o?.numToleratedItems&&o?.numToleratedItems!==this.d_numToleratedItems&&(this.d_numToleratedItems=o.numToleratedItems)}this.initialized&&!n&&(e.items?.previousValue?.length!==e.items?.currentValue?.length||e.itemSize||e.scrollHeight||e.scrollWidth)&&this.init()}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"content":this._contentTemplate=e.template;break;case"item":this._itemTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"loadericon":this._loaderIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}onAfterViewInit(){Promise.resolve().then(()=>{this.viewInit()})}onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptm("host")),this.initialized||this.viewInit()}onDestroy(){this.unbindResizeListener(),this.contentEl=null,this.initialized=!1}viewInit(){qe(this.platformId)&&!this.initialized&&Fo(this.elementViewChild?.nativeElement)&&(this.setInitialState(),this.setContentEl(this.contentEl),this.init(),this.defaultWidth=Gt(this.elementViewChild?.nativeElement),this.defaultHeight=Qt(this.elementViewChild?.nativeElement),this.defaultContentWidth=Gt(this.contentEl),this.defaultContentHeight=Qt(this.contentEl),this.initialized=!0)}init(){this._disabled||(this.bindResizeListener(),setTimeout(()=>{this.setSpacerSize(),this.setSize(),this.calculateOptions(),this.calculateAutoSize(),this.cd.detectChanges()},1))}setContentEl(e){this.contentEl=e||this.contentViewChild?.nativeElement||Ee(this.elementViewChild?.nativeElement,".p-virtualscroller-content")}setInitialState(){this.first=this.both?{rows:0,cols:0}:0,this.last=this.both?{rows:0,cols:0}:0,this.numItemsInViewport=this.both?{rows:0,cols:0}:0,this.lastScrollPos=this.both?{top:0,left:0}:0,(this.d_loading===void 0||this.d_loading===!1)&&(this.d_loading=this._loading||!1),this.d_numToleratedItems=this._numToleratedItems,this.loaderArr=this.loaderArr.length>0?this.loaderArr:[]}getElementRef(){return this.elementViewChild}getPageByFirst(e){return Math.floor(((e??this.first)+this.d_numToleratedItems*4)/(this._step||1))}isPageChanged(e){return this._step?this.page!==this.getPageByFirst(e??this.first):!0}scrollTo(e){this.elementViewChild?.nativeElement?.scrollTo(e)}scrollToIndex(e,n="auto"){if(this.both?e.every(o=>o>-1):e>-1){let o=this.first,{scrollTop:a=0,scrollLeft:u=0}=this.elementViewChild?.nativeElement,{numToleratedItems:h}=this.calculateNumItems(),f=this.getContentPosition(),y=this.itemSize,S=(pe=0,ke)=>pe<=ke?0:pe,N=(pe,ke,xe)=>pe*ke+xe,B=(pe=0,ke=0)=>this.scrollTo({left:pe,top:ke,behavior:n}),q=this.both?{rows:0,cols:0}:0,j=!1,H=!1;this.both?(q={rows:S(e[0],h[0]),cols:S(e[1],h[1])},B(N(q.cols,y[1],f.left),N(q.rows,y[0],f.top)),H=this.lastScrollPos.top!==a||this.lastScrollPos.left!==u,j=q.rows!==o.rows||q.cols!==o.cols):(q=S(e,h),this.horizontal?B(N(q,y,f.left),a):B(u,N(q,y,f.top)),H=this.lastScrollPos!==(this.horizontal?u:a),j=q!==o),this.isRangeChanged=j,H&&(this.first=q)}}scrollInView(e,n,i="auto"){if(n){let{first:o,viewport:a}=this.getRenderedRange(),u=(y=0,S=0)=>this.scrollTo({left:y,top:S,behavior:i}),h=n==="to-start",f=n==="to-end";if(h){if(this.both)a.first.rows-o.rows>e[0]?u(a.first.cols*this._itemSize[1],(a.first.rows-1)*this._itemSize[0]):a.first.cols-o.cols>e[1]&&u((a.first.cols-1)*this._itemSize[1],a.first.rows*this._itemSize[0]);else if(a.first-o>e){let y=(a.first-1)*this._itemSize;this.horizontal?u(y,0):u(0,y)}}else if(f){if(this.both)a.last.rows-o.rows<=e[0]+1?u(a.first.cols*this._itemSize[1],(a.first.rows+1)*this._itemSize[0]):a.last.cols-o.cols<=e[1]+1&&u((a.first.cols+1)*this._itemSize[1],a.first.rows*this._itemSize[0]);else if(a.last-o<=e+1){let y=(a.first+1)*this._itemSize;this.horizontal?u(y,0):u(0,y)}}}else this.scrollToIndex(e,i)}getRenderedRange(){let e=(o,a)=>a||o?Math.floor(o/(a||o)):0,n=this.first,i=0;if(this.elementViewChild?.nativeElement){let{scrollTop:o,scrollLeft:a}=this.elementViewChild.nativeElement;if(this.both)n={rows:e(o,this._itemSize[0]),cols:e(a,this._itemSize[1])},i={rows:n.rows+this.numItemsInViewport.rows,cols:n.cols+this.numItemsInViewport.cols};else{let u=this.horizontal?a:o;n=e(u,this._itemSize),i=n+this.numItemsInViewport}}return{first:this.first,last:this.last,viewport:{first:n,last:i}}}calculateNumItems(){let e=this.getContentPosition(),n=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetWidth-e.left:0)||0,i=(this.elementViewChild?.nativeElement?this.elementViewChild.nativeElement.offsetHeight-e.top:0)||0,o=(f,y)=>y||f?Math.ceil(f/(y||f)):0,a=f=>Math.ceil(f/2),u=this.both?{rows:o(i,this._itemSize[0]),cols:o(n,this._itemSize[1])}:o(this.horizontal?n:i,this._itemSize),h=this.d_numToleratedItems||(this.both?[a(u.rows),a(u.cols)]:a(u));return{numItemsInViewport:u,numToleratedItems:h}}calculateOptions(){let{numItemsInViewport:e,numToleratedItems:n}=this.calculateNumItems(),i=(u,h,f,y=!1)=>this.getLast(u+h+(u<f?2:3)*f,y),o=this.first,a=this.both?{rows:i(this.first.rows,e.rows,n[0]),cols:i(this.first.cols,e.cols,n[1],!0)}:i(this.first,e,n);this.last=a,this.numItemsInViewport=e,this.d_numToleratedItems=n,this._showLoader&&(this.loaderArr=this.both?Array.from({length:e.rows}).map(()=>Array.from({length:e.cols})):Array.from({length:e})),this._lazy&&Promise.resolve().then(()=>{this.lazyLoadState={first:this._step?this.both?{rows:0,cols:o.cols}:0:o,last:Math.min(this._step?this._step:this.last,this._items.length)},this.handleEvents("onLazyLoad",this.lazyLoadState)})}calculateAutoSize(){this._autoSize&&!this.d_loading&&Promise.resolve().then(()=>{if(this.contentEl){this.contentEl.style.minHeight=this.contentEl.style.minWidth="auto",this.contentEl.style.position="relative",this.elementViewChild.nativeElement.style.contain="none";let[e,n]=[Gt(this.contentEl),Qt(this.contentEl)];e!==this.defaultContentWidth&&(this.elementViewChild.nativeElement.style.width=""),n!==this.defaultContentHeight&&(this.elementViewChild.nativeElement.style.height="");let[i,o]=[Gt(this.elementViewChild.nativeElement),Qt(this.elementViewChild.nativeElement)];(this.both||this.horizontal)&&(this.elementViewChild.nativeElement.style.width=i<this.defaultWidth?i+"px":this._scrollWidth||this.defaultWidth+"px"),(this.both||this.vertical)&&(this.elementViewChild.nativeElement.style.height=o<this.defaultHeight?o+"px":this._scrollHeight||this.defaultHeight+"px"),this.contentEl.style.minHeight=this.contentEl.style.minWidth="",this.contentEl.style.position="",this.elementViewChild.nativeElement.style.contain=""}})}getLast(e=0,n=!1){return this._items?Math.min(n?(this._columns||this._items[0]).length:this._items.length,e):0}getContentPosition(){if(this.contentEl){let e=getComputedStyle(this.contentEl),n=parseFloat(e.paddingLeft)+Math.max(parseFloat(e.left)||0,0),i=parseFloat(e.paddingRight)+Math.max(parseFloat(e.right)||0,0),o=parseFloat(e.paddingTop)+Math.max(parseFloat(e.top)||0,0),a=parseFloat(e.paddingBottom)+Math.max(parseFloat(e.bottom)||0,0);return{left:n,right:i,top:o,bottom:a,x:n+i,y:o+a}}return{left:0,right:0,top:0,bottom:0,x:0,y:0}}setSize(){if(this.elementViewChild?.nativeElement){let e=this.elementViewChild.nativeElement,n=e.parentElement?.parentElement,i=e.offsetWidth,o=n?.offsetWidth||0,a=this._scrollWidth||`${i||o}px`,u=e.offsetHeight,h=n?.offsetHeight||0,f=this._scrollHeight||`${u||h}px`,y=(S,N)=>e.style[S]=N;this.both||this.horizontal?(y("height",f),y("width",a)):y("height",f)}}setSpacerSize(){if(this._items){let e=this.getContentPosition(),n=(i,o,a,u=0)=>this.spacerStyle=ue(G({},this.spacerStyle),{[`${i}`]:(o||[]).length*a+u+"px"});this.both?(n("height",this._items,this._itemSize[0],e.y),n("width",this._columns||this._items[1],this._itemSize[1],e.x)):this.horizontal?n("width",this._columns||this._items,this._itemSize,e.x):n("height",this._items,this._itemSize,e.y)}}setContentPosition(e){if(this.contentEl&&!this._appendOnly){let n=e?e.first:this.first,i=(a,u)=>a*u,o=(a=0,u=0)=>this.contentStyle=ue(G({},this.contentStyle),{transform:`translate3d(${a}px, ${u}px, 0)`});if(this.both)o(i(n.cols,this._itemSize[1]),i(n.rows,this._itemSize[0]));else{let a=i(n,this._itemSize);this.horizontal?o(a,0):o(0,a)}}}onScrollPositionChange(e){let n=e.target;if(!n)throw new Error("Event target is null");let i=this.getContentPosition(),o=(H,pe)=>H?H>pe?H-pe:H:0,a=(H,pe)=>pe||H?Math.floor(H/(pe||H)):0,u=(H,pe,ke,xe,He,dt)=>H<=He?He:dt?ke-xe-He:pe+He-1,h=(H,pe,ke,xe,He,dt,$t)=>H<=dt?0:Math.max(0,$t?H<pe?ke:H-dt:H>pe?ke:H-2*dt),f=(H,pe,ke,xe,He,dt=!1)=>{let $t=pe+xe+2*He;return H>=He&&($t+=He+1),this.getLast($t,dt)},y=o(n.scrollTop,i.top),S=o(n.scrollLeft,i.left),N=this.both?{rows:0,cols:0}:0,B=this.last,q=!1,j=this.lastScrollPos;if(this.both){let H=this.lastScrollPos.top<=y,pe=this.lastScrollPos.left<=S;if(!this._appendOnly||this._appendOnly&&(H||pe)){let ke={rows:a(y,this._itemSize[0]),cols:a(S,this._itemSize[1])},xe={rows:u(ke.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],H),cols:u(ke.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],pe)};N={rows:h(ke.rows,xe.rows,this.first.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0],H),cols:h(ke.cols,xe.cols,this.first.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],pe)},B={rows:f(ke.rows,N.rows,this.last.rows,this.numItemsInViewport.rows,this.d_numToleratedItems[0]),cols:f(ke.cols,N.cols,this.last.cols,this.numItemsInViewport.cols,this.d_numToleratedItems[1],!0)},q=N.rows!==this.first.rows||B.rows!==this.last.rows||N.cols!==this.first.cols||B.cols!==this.last.cols||this.isRangeChanged,j={top:y,left:S}}}else{let H=this.horizontal?S:y,pe=this.lastScrollPos<=H;if(!this._appendOnly||this._appendOnly&&pe){let ke=a(H,this._itemSize),xe=u(ke,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,pe);N=h(ke,xe,this.first,this.last,this.numItemsInViewport,this.d_numToleratedItems,pe),B=f(ke,N,this.last,this.numItemsInViewport,this.d_numToleratedItems),q=N!==this.first||B!==this.last||this.isRangeChanged,j=H}}return{first:N,last:B,isRangeChanged:q,scrollPos:j}}onScrollChange(e){let{first:n,last:i,isRangeChanged:o,scrollPos:a}=this.onScrollPositionChange(e);if(o){let u={first:n,last:i};if(this.setContentPosition(u),this.first=n,this.last=i,this.lastScrollPos=a,this.handleEvents("onScrollIndexChange",u),this._lazy&&this.isPageChanged(n)){let h={first:this._step?Math.min(this.getPageByFirst(n)*this._step,this._items.length-this._step):n,last:Math.min(this._step?(this.getPageByFirst(n)+1)*this._step:i,this._items.length)};(this.lazyLoadState.first!==h.first||this.lazyLoadState.last!==h.last)&&this.handleEvents("onLazyLoad",h),this.lazyLoadState=h}}}onContainerScroll(e){if(this.handleEvents("onScroll",{originalEvent:e}),this._delay){if(this.scrollTimeout&&clearTimeout(this.scrollTimeout),!this.d_loading&&this._showLoader){let{isRangeChanged:n}=this.onScrollPositionChange(e);(n||this._step&&this.isPageChanged())&&(this.d_loading=!0,this.cd.detectChanges())}this.scrollTimeout=setTimeout(()=>{this.onScrollChange(e),this.d_loading&&this._showLoader&&(!this._lazy||this._loading===void 0)&&(this.d_loading=!1,this.page=this.getPageByFirst()),this.cd.detectChanges()},this._delay)}else!this.d_loading&&this.onScrollChange(e)}bindResizeListener(){qe(this.platformId)&&(this.windowResizeListener||this.zone.runOutsideAngular(()=>{let e=this.document.defaultView,n=nn()?"orientationchange":"resize";this.windowResizeListener=this.renderer.listen(e,n,this.onWindowResize.bind(this))}))}unbindResizeListener(){this.windowResizeListener&&(this.windowResizeListener(),this.windowResizeListener=null)}onWindowResize(){this.resizeTimeout&&clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{if(Fo(this.elementViewChild?.nativeElement)){let[e,n]=[Gt(this.elementViewChild?.nativeElement),Qt(this.elementViewChild?.nativeElement)],[i,o]=[e!==this.defaultWidth,n!==this.defaultHeight];(this.both?i||o:this.horizontal?i:this.vertical&&o)&&this.zone.run(()=>{this.d_numToleratedItems=this._numToleratedItems,this.defaultWidth=e,this.defaultHeight=n,this.defaultContentWidth=Gt(this.contentEl),this.defaultContentHeight=Qt(this.contentEl),this.init()})}},this._resizeDelay)}handleEvents(e,n){return this.options&&this.options[e]?this.options[e](n):this[e].emit(n)}getContentOptions(){return{contentStyleClass:`p-virtualscroller-content ${this.d_loading?"p-virtualscroller-loading":""}`,items:this.loadedItems,getItemOptions:e=>this.getOptions(e),loading:this.d_loading,getLoaderOptions:(e,n)=>this.getLoaderOptions(e,n),itemSize:this._itemSize,rows:this.loadedRows,columns:this.loadedColumns,spacerStyle:this.spacerStyle,contentStyle:this.contentStyle,vertical:this.vertical,horizontal:this.horizontal,both:this.both,scrollTo:this.scrollTo.bind(this),scrollToIndex:this.scrollToIndex.bind(this),orientation:this._orientation,scrollableElement:this.elementViewChild?.nativeElement}}getOptions(e){let n=(this._items||[]).length,i=this.both?this.first.rows+e:this.first+e;return{index:i,count:n,first:i===0,last:i===n-1,even:i%2===0,odd:i%2!==0}}getLoaderOptions(e,n){let i=this.loaderArr.length;return G({index:e,count:i,first:e===0,last:e===i-1,even:e%2===0,odd:e%2!==0,loading:this.d_loading},n)}static \u0275fac=function(n){return new(n||t)(Qe(Be))};static \u0275cmp=E({type:t,selectors:[["p-scroller"],["p-virtualscroller"],["p-virtual-scroller"],["p-virtualScroller"]],contentQueries:function(n,i,o){if(n&1&&Re(o,xs,4)(o,Zf,4)(o,Xf,4)(o,Jf,4)(o,Me,4),n&2){let a;k(a=T())&&(i.contentTemplate=a.first),k(a=T())&&(i.itemTemplate=a.first),k(a=T())&&(i.loaderTemplate=a.first),k(a=T())&&(i.loaderIconTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(eg,5)(xs,5),n&2){let o;k(o=T())&&(i.elementViewChild=o.first),k(o=T())&&(i.contentViewChild=o.first)}},hostVars:2,hostBindings:function(n,i){n&2&&je("height",i.height)},inputs:{hostName:"hostName",id:"id",style:"style",styleClass:"styleClass",tabindex:"tabindex",items:"items",itemSize:"itemSize",scrollHeight:"scrollHeight",scrollWidth:"scrollWidth",orientation:"orientation",step:"step",delay:"delay",resizeDelay:"resizeDelay",appendOnly:"appendOnly",inline:"inline",lazy:"lazy",disabled:"disabled",loaderDisabled:"loaderDisabled",columns:"columns",showSpacer:"showSpacer",showLoader:"showLoader",numToleratedItems:"numToleratedItems",loading:"loading",autoSize:"autoSize",trackBy:"trackBy",options:"options"},outputs:{onLazyLoad:"onLazyLoad",onScroll:"onScroll",onScrollIndexChange:"onScrollIndexChange"},features:[le([Cs,{provide:ws,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],ngContentSelectors:tg,decls:3,vars:2,consts:[["disabledContainer",""],["element",""],["buildInContent",""],["content",""],["buildInLoader",""],["buildInLoaderIcon",""],[4,"ngIf","ngIfElse"],[3,"scroll","ngStyle","pBind"],[3,"class","ngStyle","pBind",4,"ngIf"],[3,"class","pBind",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"pBind"],[4,"ngFor","ngForOf","ngForTrackBy"],[3,"ngStyle","pBind"],[4,"ngFor","ngForOf"],["data-p-icon","spinner",3,"spin","pBind"],[4,"ngIf"]],template:function(n,i){if(n&1&&(Ge(),g(0,yg,8,10,"ng-container",6)(1,Cg,2,1,"ng-template",null,0,Ie)),n&2){let o=Se(2);s("ngIf",!i._disabled)("ngIfElse",o)}},dependencies:[te,jt,ze,Le,rt,Cn,ie,A],encapsulation:2})}return t})(),sr=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[mi,ie,ie]})}return t})();var Ts=`
    .p-tooltip {
        position: absolute;
        display: none;
        max-width: dt('tooltip.max.width');
    }

    .p-tooltip-right,
    .p-tooltip-left {
        padding: 0 dt('tooltip.gutter');
    }

    .p-tooltip-top,
    .p-tooltip-bottom {
        padding: dt('tooltip.gutter') 0;
    }

    .p-tooltip-text {
        white-space: pre-line;
        word-break: break-word;
        background: dt('tooltip.background');
        color: dt('tooltip.color');
        padding: dt('tooltip.padding');
        box-shadow: dt('tooltip.shadow');
        border-radius: dt('tooltip.border.radius');
    }

    .p-tooltip-arrow {
        position: absolute;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    .p-tooltip-right .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter') 0;
        border-right-color: dt('tooltip.background');
    }

    .p-tooltip-left .p-tooltip-arrow {
        margin-top: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') 0 dt('tooltip.gutter') dt('tooltip.gutter');
        border-left-color: dt('tooltip.background');
    }

    .p-tooltip-top .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: dt('tooltip.gutter') dt('tooltip.gutter') 0 dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }

    .p-tooltip-bottom .p-tooltip-arrow {
        margin-left: calc(-1 * dt('tooltip.gutter'));
        border-width: 0 dt('tooltip.gutter') dt('tooltip.gutter') dt('tooltip.gutter');
        border-top-color: dt('tooltip.background');
        border-bottom-color: dt('tooltip.background');
    }
`;var Sg={root:"p-tooltip p-component",arrow:"p-tooltip-arrow",text:"p-tooltip-text"},Ss=(()=>{class t extends fe{name="tooltip";style=Ts;classes=Sg;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Is=new ae("TOOLTIP_INSTANCE"),Es=(()=>{class t extends De{zone;viewContainer;componentName="Tooltip";$pcTooltip=v(Is,{optional:!0,skipSelf:!0})??void 0;tooltipPosition;tooltipEvent="hover";positionStyle;tooltipStyleClass;tooltipZIndex;escape=!0;showDelay;hideDelay;life;positionTop;positionLeft;autoHide=!0;fitContent=!0;hideOnEscape=!0;showOnEllipsis=!1;content;get disabled(){return this._disabled}set disabled(e){this._disabled=e,this.deactivate()}tooltipOptions;appendTo=ee(void 0);$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());_tooltipOptions={tooltipLabel:null,tooltipPosition:"right",tooltipEvent:"hover",appendTo:"body",positionStyle:null,tooltipStyleClass:null,tooltipZIndex:"auto",escape:!0,disabled:null,showDelay:null,hideDelay:null,positionTop:null,positionLeft:null,life:null,autoHide:!0,hideOnEscape:!0,showOnEllipsis:!1,id:Te("pn_id_")+"_tooltip"};_disabled;container;styleClass;tooltipText;rootPTClasses="";showTimeout;hideTimeout;active;mouseEnterListener;mouseLeaveListener;containerMouseleaveListener;clickListener;focusListener;blurListener;touchStartListener;touchEndListener;documentTouchListener;documentEscapeListener;scrollHandler;resizeListener;_componentStyle=v(Ss);interactionInProgress=!1;ptTooltip=ee();pTooltipPT=ee();pTooltipUnstyled=ee();constructor(e,n){super(),this.zone=e,this.viewContainer=n,Xe(()=>{let i=this.ptTooltip()||this.pTooltipPT();i&&this.directivePT.set(i)}),Xe(()=>{this.pTooltipUnstyled()&&this.directiveUnstyled.set(this.pTooltipUnstyled())})}onAfterViewInit(){qe(this.platformId)&&this.zone.runOutsideAngular(()=>{let e=this.getOption("tooltipEvent");if((e==="hover"||e==="both")&&(this.mouseEnterListener=this.onMouseEnter.bind(this),this.mouseLeaveListener=this.onMouseLeave.bind(this),this.clickListener=this.onInputClick.bind(this),this.el.nativeElement.addEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.addEventListener("click",this.clickListener),this.el.nativeElement.addEventListener("mouseleave",this.mouseLeaveListener),this.touchStartListener=this.onTouchStart.bind(this),this.touchEndListener=this.onTouchEnd.bind(this),this.el.nativeElement.addEventListener("touchstart",this.touchStartListener,{passive:!0}),this.el.nativeElement.addEventListener("touchend",this.touchEndListener,{passive:!0})),e==="focus"||e==="both"){this.focusListener=this.onFocus.bind(this),this.blurListener=this.onBlur.bind(this);let n=this.el.nativeElement.querySelector(".p-component");n||(n=this.getTarget(this.el.nativeElement)),n.addEventListener("focus",this.focusListener),n.addEventListener("blur",this.blurListener)}})}onChanges(e){e.tooltipPosition&&this.setOption({tooltipPosition:e.tooltipPosition.currentValue}),e.tooltipEvent&&this.setOption({tooltipEvent:e.tooltipEvent.currentValue}),e.appendTo&&this.setOption({appendTo:e.appendTo.currentValue}),e.positionStyle&&this.setOption({positionStyle:e.positionStyle.currentValue}),e.tooltipStyleClass&&this.setOption({tooltipStyleClass:e.tooltipStyleClass.currentValue}),e.tooltipZIndex&&this.setOption({tooltipZIndex:e.tooltipZIndex.currentValue}),e.escape&&this.setOption({escape:e.escape.currentValue}),e.showDelay&&this.setOption({showDelay:e.showDelay.currentValue}),e.hideDelay&&this.setOption({hideDelay:e.hideDelay.currentValue}),e.life&&this.setOption({life:e.life.currentValue}),e.positionTop&&this.setOption({positionTop:e.positionTop.currentValue}),e.positionLeft&&this.setOption({positionLeft:e.positionLeft.currentValue}),e.disabled&&this.setOption({disabled:e.disabled.currentValue}),e.content&&(this.setOption({tooltipLabel:e.content.currentValue}),this.active&&(e.content.currentValue?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide())),e.autoHide&&this.setOption({autoHide:e.autoHide.currentValue}),e.showOnEllipsis&&this.setOption({showOnEllipsis:e.showOnEllipsis.currentValue}),e.id&&this.setOption({id:e.id.currentValue}),e.tooltipOptions&&(this._tooltipOptions=G(G({},this._tooltipOptions),e.tooltipOptions.currentValue),this.deactivate(),this.active&&(this.getOption("tooltipLabel")?this.container&&this.container.offsetParent?(this.updateText(),this.align()):this.show():this.hide()))}isAutoHide(){return this.getOption("autoHide")}onMouseEnter(e){!this.container&&!this.showTimeout&&this.activate()}onMouseLeave(e){this.isAutoHide()?this.deactivate():!(Ke(e.relatedTarget,"p-tooltip")||Ke(e.relatedTarget,"p-tooltip-text")||Ke(e.relatedTarget,"p-tooltip-arrow"))&&this.deactivate()}onTouchStart(e){!this.container&&!this.showTimeout&&(this.activate(),this.isAutoHide()||this.bindDocumentTouchListener())}onTouchEnd(e){this.isAutoHide()&&this.deactivate()}bindDocumentTouchListener(){this.documentTouchListener||(this.documentTouchListener=this.renderer.listen("document","touchstart",e=>{this.container&&!this.container.contains(e.target)&&!this.el.nativeElement.contains(e.target)&&(this.deactivate(),this.unbindDocumentTouchListener())}))}unbindDocumentTouchListener(){this.documentTouchListener&&(this.documentTouchListener(),this.documentTouchListener=null)}onFocus(e){this.activate()}onBlur(e){this.deactivate()}onInputClick(e){this.deactivate()}hasEllipsis(){let e=this.el.nativeElement;return e.offsetWidth<e.scrollWidth||e.offsetHeight<e.scrollHeight}activate(){if(!this.interactionInProgress){if(this.getOption("showOnEllipsis")&&!this.hasEllipsis())return;if(this.active=!0,this.clearHideTimeout(),this.getOption("showDelay")?this.showTimeout=setTimeout(()=>{this.show()},this.getOption("showDelay")):this.show(),this.getOption("life")){let e=this.getOption("showDelay")?this.getOption("life")+this.getOption("showDelay"):this.getOption("life");this.hideTimeout=setTimeout(()=>{this.hide()},e)}this.getOption("hideOnEscape")&&(this.documentEscapeListener=this.renderer.listen("document","keydown.escape",()=>{this.deactivate(),this.documentEscapeListener?.()})),this.interactionInProgress=!0}}deactivate(){this.interactionInProgress=!1,this.active=!1,this.clearShowTimeout(),this.getOption("hideDelay")?(this.clearHideTimeout(),this.hideTimeout=setTimeout(()=>{this.hide()},this.getOption("hideDelay"))):this.hide(),this.documentEscapeListener&&this.documentEscapeListener()}create(){this.container&&(this.clearHideTimeout(),this.remove()),this.container=vn("div",{class:this.cx("root"),"p-bind":this.ptm("root"),"data-pc-section":"root"}),this.container.setAttribute("role","tooltip");let e=vn("div",{class:this.cx("arrow"),"p-bind":this.ptm("arrow"),"data-pc-section":"arrow"});this.container.appendChild(e),this.tooltipText=vn("div",{class:this.cx("text"),"p-bind":this.ptm("text"),"data-pc-section":"text"}),this.updateText(),this.getOption("positionStyle")&&(this.container.style.position=this.getOption("positionStyle")),this.container.appendChild(this.tooltipText),this.getOption("appendTo")==="body"?document.body.appendChild(this.container):this.getOption("appendTo")==="target"?qt(this.container,this.el.nativeElement):qt(this.getOption("appendTo"),this.container),this.container.style.display="none",this.fitContent&&(this.container.style.width="fit-content"),this.isAutoHide()?this.container.style.pointerEvents="none":(this.container.style.pointerEvents="unset",this.bindContainerMouseleaveListener())}bindContainerMouseleaveListener(){if(!this.containerMouseleaveListener){let e=this.container??this.container.nativeElement;this.containerMouseleaveListener=this.renderer.listen(e,"mouseleave",n=>{this.deactivate()})}}unbindContainerMouseleaveListener(){this.containerMouseleaveListener&&(this.bindContainerMouseleaveListener(),this.containerMouseleaveListener=null)}show(){if(!this.getOption("tooltipLabel")||this.getOption("disabled"))return;this.create(),this.el.nativeElement.closest("p-dialog")?setTimeout(()=>{this.container&&(this.container.style.display="inline-block"),this.container&&this.align()},100):(this.container.style.display="inline-block",this.align()),Nr(this.container,250),this.getOption("tooltipZIndex")==="auto"?Ue.set("tooltip",this.container,this.config.zIndex.tooltip):this.container.style.zIndex=this.getOption("tooltipZIndex"),this.bindDocumentResizeListener(),this.bindScrollListener()}hide(){this.getOption("tooltipZIndex")==="auto"&&Ue.clear(this.container),this.remove()}updateText(){let e=this.getOption("tooltipLabel");if(e&&typeof e.createEmbeddedView=="function"){let n=this.viewContainer.createEmbeddedView(e);n.detectChanges(),n.rootNodes.forEach(i=>this.tooltipText.appendChild(i))}else this.getOption("escape")?(this.tooltipText.innerHTML="",this.tooltipText.appendChild(document.createTextNode(e))):this.tooltipText.innerHTML=e}align(){let e=this.getOption("tooltipPosition"),i={top:[this.alignTop,this.alignBottom,this.alignRight,this.alignLeft],bottom:[this.alignBottom,this.alignTop,this.alignRight,this.alignLeft],left:[this.alignLeft,this.alignRight,this.alignTop,this.alignBottom],right:[this.alignRight,this.alignLeft,this.alignTop,this.alignBottom]}[e]||[];for(let[o,a]of i.entries())if(o===0)a.call(this);else if(this.isOutOfBounds())a.call(this);else break}getHostOffset(){if(this.getOption("appendTo")==="body"||this.getOption("appendTo")==="target"){let e=this.el.nativeElement.getBoundingClientRect(),n=e.left+zr(),i=e.top+qr();return{left:n,top:i}}else return{left:0,top:0}}get activeElement(){return this.el.nativeElement.nodeName.startsWith("P-")?Ee(this.el.nativeElement,".p-component"):this.el.nativeElement}alignRight(){this.preAlign("right");let e=this.activeElement,n=Ye(e),i=(ht(e)-ht(this.container))/2;this.alignTooltip(n,i);let o=this.getArrowElement();o.style.top="50%",o.style.right=null,o.style.bottom=null,o.style.left="0"}alignLeft(){this.preAlign("left");let e=this.getArrowElement(),n=Ye(this.container),i=(ht(this.el.nativeElement)-ht(this.container))/2;this.alignTooltip(-n,i),e.style.top="50%",e.style.right="0",e.style.bottom=null,e.style.left=null}alignTop(){this.preAlign("top");let e=this.getArrowElement(),n=this.getHostOffset(),i=Ye(this.container),o=(Ye(this.el.nativeElement)-Ye(this.container))/2,a=ht(this.container);this.alignTooltip(o,-a);let u=n.left-this.getHostOffset().left+i/2;e.style.top=null,e.style.right=null,e.style.bottom="0",e.style.left=u+"px"}getArrowElement(){return Ee(this.container,'[data-pc-section="arrow"]')}alignBottom(){this.preAlign("bottom");let e=this.getArrowElement(),n=Ye(this.container),i=this.getHostOffset(),o=(Ye(this.el.nativeElement)-Ye(this.container))/2,a=ht(this.el.nativeElement);this.alignTooltip(o,a);let u=i.left-this.getHostOffset().left+n/2;e.style.top="0",e.style.right=null,e.style.bottom=null,e.style.left=u+"px"}alignTooltip(e,n){let i=this.getHostOffset(),o=i.left+e,a=i.top+n;this.container.style.left=o+this.getOption("positionLeft")+"px",this.container.style.top=a+this.getOption("positionTop")+"px"}setOption(e){this._tooltipOptions=G(G({},this._tooltipOptions),e)}getOption(e){return this._tooltipOptions[e]}getTarget(e){return Ke(e,"p-inputwrapper")?Ee(e,"input"):e}preAlign(e){this.container.style.left="-999px",this.container.style.top="-999px",this.container.className=this.cn(this.cx("root"),this.ptm("root")?.class,"p-tooltip-"+e,this.getOption("tooltipStyleClass"))}isOutOfBounds(){let e=this.container.getBoundingClientRect(),n=e.top,i=e.left,o=Ye(this.container),a=ht(this.container),u=Zn();return i+o>u.width||i<0||n<0||n+a>u.height}onWindowResize(e){this.hide()}bindDocumentResizeListener(){this.zone.runOutsideAngular(()=>{this.resizeListener=this.onWindowResize.bind(this),window.addEventListener("resize",this.resizeListener)})}unbindDocumentResizeListener(){this.resizeListener&&(window.removeEventListener("resize",this.resizeListener),this.resizeListener=null)}bindScrollListener(){this.scrollHandler||(this.scrollHandler=new rn(this.el.nativeElement,()=>{this.container&&this.hide()})),this.scrollHandler.bindScrollListener()}unbindScrollListener(){this.scrollHandler&&this.scrollHandler.unbindScrollListener()}unbindEvents(){let e=this.getOption("tooltipEvent");if((e==="hover"||e==="both")&&(this.el.nativeElement.removeEventListener("mouseenter",this.mouseEnterListener),this.el.nativeElement.removeEventListener("mouseleave",this.mouseLeaveListener),this.el.nativeElement.removeEventListener("click",this.clickListener),this.el.nativeElement.removeEventListener("touchstart",this.touchStartListener),this.el.nativeElement.removeEventListener("touchend",this.touchEndListener),this.unbindDocumentTouchListener()),e==="focus"||e==="both"){let n=this.el.nativeElement.querySelector(".p-component");n||(n=this.getTarget(this.el.nativeElement)),n.removeEventListener("focus",this.focusListener),n.removeEventListener("blur",this.blurListener)}this.unbindDocumentResizeListener()}remove(){this.container&&this.container.parentElement&&(this.getOption("appendTo")==="body"?document.body.removeChild(this.container):this.getOption("appendTo")==="target"?this.el.nativeElement.removeChild(this.container):Qr(this.getOption("appendTo"),this.container)),this.unbindDocumentResizeListener(),this.unbindScrollListener(),this.unbindContainerMouseleaveListener(),this.unbindDocumentTouchListener(),this.clearTimeouts(),this.container=null,this.scrollHandler=null}clearShowTimeout(){this.showTimeout&&(clearTimeout(this.showTimeout),this.showTimeout=null)}clearHideTimeout(){this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null)}clearTimeouts(){this.clearShowTimeout(),this.clearHideTimeout()}onDestroy(){this.unbindEvents(),this.container&&Ue.clear(this.container),this.remove(),this.scrollHandler&&(this.scrollHandler.destroy(),this.scrollHandler=null),this.documentEscapeListener&&this.documentEscapeListener()}static \u0275fac=function(n){return new(n||t)(Qe(Be),Qe(Gn))};static \u0275dir=Oe({type:t,selectors:[["","pTooltip",""]],inputs:{tooltipPosition:"tooltipPosition",tooltipEvent:"tooltipEvent",positionStyle:"positionStyle",tooltipStyleClass:"tooltipStyleClass",tooltipZIndex:"tooltipZIndex",escape:[2,"escape","escape",w],showDelay:[2,"showDelay","showDelay",se],hideDelay:[2,"hideDelay","hideDelay",se],life:[2,"life","life",se],positionTop:[2,"positionTop","positionTop",se],positionLeft:[2,"positionLeft","positionLeft",se],autoHide:[2,"autoHide","autoHide",w],fitContent:[2,"fitContent","fitContent",w],hideOnEscape:[2,"hideOnEscape","hideOnEscape",w],showOnEllipsis:[2,"showOnEllipsis","showOnEllipsis",w],content:[0,"pTooltip","content"],disabled:[0,"tooltipDisabled","disabled"],tooltipOptions:"tooltipOptions",appendTo:[1,"appendTo"],ptTooltip:[1,"ptTooltip"],pTooltipPT:[1,"pTooltipPT"],pTooltipUnstyled:[1,"pTooltipUnstyled"]},features:[le([Ss,{provide:Is,useExisting:t},{provide:be,useExisting:t}]),L]})}return t})();var Ds=`
    .p-select {
        display: inline-flex;
        cursor: pointer;
        position: relative;
        user-select: none;
        background: dt('select.background');
        border: 1px solid dt('select.border.color');
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            outline-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration');
        border-radius: dt('select.border.radius');
        outline-color: transparent;
        box-shadow: dt('select.shadow');
    }

    .p-select:not(.p-disabled):hover {
        border-color: dt('select.hover.border.color');
    }

    .p-select:not(.p-disabled).p-focus {
        border-color: dt('select.focus.border.color');
        box-shadow: dt('select.focus.ring.shadow');
        outline: dt('select.focus.ring.width') dt('select.focus.ring.style') dt('select.focus.ring.color');
        outline-offset: dt('select.focus.ring.offset');
    }

    .p-select.p-variant-filled {
        background: dt('select.filled.background');
    }

    .p-select.p-variant-filled:not(.p-disabled):hover {
        background: dt('select.filled.hover.background');
    }

    .p-select.p-variant-filled:not(.p-disabled).p-focus {
        background: dt('select.filled.focus.background');
    }

    .p-select.p-invalid {
        border-color: dt('select.invalid.border.color');
    }

    .p-select.p-disabled {
        opacity: 1;
        background: dt('select.disabled.background');
    }

    .p-select-clear-icon {
        align-self: center;
        color: dt('select.clear.icon.color');
        inset-inline-end: dt('select.dropdown.width');
    }

    .p-select-dropdown {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: transparent;
        color: dt('select.dropdown.color');
        width: dt('select.dropdown.width');
        border-start-end-radius: dt('select.border.radius');
        border-end-end-radius: dt('select.border.radius');
    }

    .p-select-label {
        display: block;
        white-space: nowrap;
        overflow: hidden;
        flex: 1 1 auto;
        width: 1%;
        padding: dt('select.padding.y') dt('select.padding.x');
        text-overflow: ellipsis;
        cursor: pointer;
        color: dt('select.color');
        background: transparent;
        border: 0 none;
        outline: 0 none;
        font-size: 1rem;
    }

    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.p-invalid .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }

    .p-select.p-disabled .p-select-label {
        color: dt('select.disabled.color');
    }

    .p-select-label-empty {
        overflow: hidden;
        opacity: 0;
    }

    input.p-select-label {
        cursor: default;
    }

    .p-select-overlay {
        position: absolute;
        top: 0;
        left: 0;
        background: dt('select.overlay.background');
        color: dt('select.overlay.color');
        border: 1px solid dt('select.overlay.border.color');
        border-radius: dt('select.overlay.border.radius');
        box-shadow: dt('select.overlay.shadow');
        min-width: 100%;
        transform-origin: inherit;
        will-change: transform;
    }

    .p-select-header {
        padding: dt('select.list.header.padding');
    }

    .p-select-filter {
        width: 100%;
    }

    .p-select-list-container {
        overflow: auto;
    }

    .p-select-option-group {
        cursor: auto;
        margin: 0;
        padding: dt('select.option.group.padding');
        background: dt('select.option.group.background');
        color: dt('select.option.group.color');
        font-weight: dt('select.option.group.font.weight');
    }

    .p-select-list {
        margin: 0;
        padding: 0;
        list-style-type: none;
        padding: dt('select.list.padding');
        gap: dt('select.list.gap');
        display: flex;
        flex-direction: column;
    }

    .p-select-option {
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        padding: dt('select.option.padding');
        border: 0 none;
        color: dt('select.option.color');
        background: transparent;
        transition:
            background dt('select.transition.duration'),
            color dt('select.transition.duration'),
            border-color dt('select.transition.duration'),
            box-shadow dt('select.transition.duration'),
            outline-color dt('select.transition.duration');
        border-radius: dt('select.option.border.radius');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled).p-focus {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option:not(.p-select-option-selected):not(.p-disabled):hover {
        background: dt('select.option.focus.background');
        color: dt('select.option.focus.color');
    }

    .p-select-option.p-select-option-selected {
        background: dt('select.option.selected.background');
        color: dt('select.option.selected.color');
    }

    .p-select-option.p-select-option-selected.p-focus {
        background: dt('select.option.selected.focus.background');
        color: dt('select.option.selected.focus.color');
    }
   
    .p-select-option-blank-icon {
        flex-shrink: 0;
    }

    .p-select-option-check-icon {
        position: relative;
        flex-shrink: 0;
        margin-inline-start: dt('select.checkmark.gutter.start');
        margin-inline-end: dt('select.checkmark.gutter.end');
        color: dt('select.checkmark.color');
    }

    .p-select-empty-message {
        padding: dt('select.empty.message.padding');
    }

    .p-select-fluid {
        display: flex;
        width: 100%;
    }

    .p-select-sm .p-select-label {
        font-size: dt('select.sm.font.size');
        padding-block: dt('select.sm.padding.y');
        padding-inline: dt('select.sm.padding.x');
    }

    .p-select-sm .p-select-dropdown .p-icon {
        font-size: dt('select.sm.font.size');
        width: dt('select.sm.font.size');
        height: dt('select.sm.font.size');
    }

    .p-select-lg .p-select-label {
        font-size: dt('select.lg.font.size');
        padding-block: dt('select.lg.padding.y');
        padding-inline: dt('select.lg.padding.x');
    }

    .p-select-lg .p-select-dropdown .p-icon {
        font-size: dt('select.lg.font.size');
        width: dt('select.lg.font.size');
        height: dt('select.lg.font.size');
    }

    .p-floatlabel-in .p-select-filter {
        padding-block-start: dt('select.padding.y');
        padding-block-end: dt('select.padding.y');
    }
`;var hi=t=>({height:t}),dr=t=>({$implicit:t});function Ig(t,r){if(t&1&&(O(),F(0,"svg",6)),t&2){let e=d(2);C(e.cx("optionCheckIcon")),s("pBind",e.$pcSelect==null?null:e.$pcSelect.ptm("optionCheckIcon"))}}function Eg(t,r){if(t&1&&(O(),F(0,"svg",7)),t&2){let e=d(2);C(e.cx("optionBlankIcon")),s("pBind",e.$pcSelect==null?null:e.$pcSelect.ptm("optionBlankIcon"))}}function Dg(t,r){if(t&1&&(W(0),g(1,Ig,1,3,"svg",4)(2,Eg,1,3,"svg",5),K()),t&2){let e=d();l(),s("ngIf",e.selected),l(),s("ngIf",!e.selected)}}function Mg(t,r){if(t&1&&(c(0,"span",8),m(1),p()),t&2){let e=d();s("pBind",e.$pcSelect==null?null:e.$pcSelect.ptm("optionLabel")),l(),Q(e.label??"empty")}}function Lg(t,r){t&1&&U(0)}var Pg=["item"],Fg=["group"],Rg=["loader"],Bg=["selectedItem"],Og=["header"],Ms=["filter"],Vg=["footer"],zg=["emptyfilter"],qg=["empty"],Ag=["dropdownicon"],Ng=["loadingicon"],Hg=["clearicon"],$g=["filtericon"],jg=["onicon"],Ug=["officon"],Qg=["cancelicon"],Gg=["focusInput"],Wg=["editableInput"],Kg=["items"],Yg=["scroller"],Zg=["overlay"],Xg=["firstHiddenFocusableEl"],Jg=["lastHiddenFocusableEl"],Ls=t=>({class:t}),Ps=t=>({options:t}),Fs=(t,r)=>({$implicit:t,options:r}),e_=()=>({});function t_(t,r){if(t&1&&(W(0),m(1),K()),t&2){let e=d(2);l(),Q(e.label()==="p-emptylabel"?"\xA0":e.label())}}function n_(t,r){if(t&1&&U(0,24),t&2){let e=d(2);s("ngTemplateOutlet",e.selectedItemTemplate||e._selectedItemTemplate)("ngTemplateOutletContext",oe(2,dr,e.selectedOption))}}function i_(t,r){if(t&1&&(c(0,"span"),m(1),p()),t&2){let e=d(3);l(),Q(e.label()==="p-emptylabel"?"\xA0":e.label())}}function o_(t,r){if(t&1&&g(0,i_,2,1,"span",18),t&2){let e=d(2);s("ngIf",e.isSelectedOptionEmpty())}}function r_(t,r){if(t&1){let e=P();c(0,"span",22,3),x("focus",function(i){_(e);let o=d();return b(o.onInputFocus(i))})("blur",function(i){_(e);let o=d();return b(o.onInputBlur(i))})("keydown",function(i){_(e);let o=d();return b(o.onKeyDown(i))}),g(2,t_,2,1,"ng-container",20)(3,n_,1,4,"ng-container",23)(4,o_,1,1,"ng-template",null,4,Ie),p()}if(t&2){let e=Se(5),n=d();C(n.cx("label")),s("pBind",n.ptm("label"))("pTooltip",n.tooltip)("pTooltipUnstyled",n.unstyled())("tooltipPosition",n.tooltipPosition)("positionStyle",n.tooltipPositionStyle)("tooltipStyleClass",n.tooltipStyleClass)("pAutoFocus",n.autofocus),D("aria-disabled",n.$disabled())("id",n.inputId)("aria-label",n.ariaLabel||(n.label()==="p-emptylabel"?void 0:n.label()))("aria-labelledby",n.ariaLabelledBy)("aria-haspopup","listbox")("aria-expanded",n.overlayVisible??!1)("aria-controls",n.overlayVisible?n.id+"_list":null)("tabindex",n.$disabled()?-1:n.tabindex)("aria-activedescendant",n.focused?n.focusedOptionId:void 0)("aria-required",n.required())("required",n.required()?"":void 0)("disabled",n.$disabled()?"":void 0)("data-p",n.labelDataP),l(2),s("ngIf",!n.selectedItemTemplate&&!n._selectedItemTemplate)("ngIfElse",e),l(),s("ngIf",(n.selectedItemTemplate||n._selectedItemTemplate)&&!n.isSelectedOptionEmpty())}}function a_(t,r){if(t&1){let e=P();c(0,"input",25,5),x("input",function(i){_(e);let o=d();return b(o.onEditableInput(i))})("keydown",function(i){_(e);let o=d();return b(o.onKeyDown(i))})("focus",function(i){_(e);let o=d();return b(o.onInputFocus(i))})("blur",function(i){_(e);let o=d();return b(o.onInputBlur(i))}),p()}if(t&2){let e=d();C(e.cx("label")),s("pBind",e.ptm("label"))("pAutoFocus",e.autofocus),D("id",e.inputId)("aria-haspopup","listbox")("placeholder",e.modelValue()===void 0||e.modelValue()===null?e.placeholder():void 0)("aria-label",e.ariaLabel||(e.label()==="p-emptylabel"?void 0:e.label()))("aria-activedescendant",e.focused?e.focusedOptionId:void 0)("name",e.name())("minlength",e.minlength())("min",e.min())("max",e.max())("pattern",e.pattern())("size",e.inputSize())("maxlength",e.maxlength())("required",e.required()?"":void 0)("readonly",e.readonly?"":void 0)("disabled",e.$disabled()?"":void 0)("data-p",e.labelDataP)}}function l_(t,r){if(t&1){let e=P();O(),c(0,"svg",28),x("click",function(i){_(e);let o=d(2);return b(o.clear(i))}),p()}if(t&2){let e=d(2);C(e.cx("clearIcon")),s("pBind",e.ptm("clearIcon")),D("data-pc-section","clearicon")}}function s_(t,r){}function d_(t,r){t&1&&g(0,s_,0,0,"ng-template")}function c_(t,r){if(t&1){let e=P();c(0,"span",29),x("click",function(i){_(e);let o=d(2);return b(o.clear(i))}),g(1,d_,1,0,null,30),p()}if(t&2){let e=d(2);C(e.cx("clearIcon")),s("pBind",e.ptm("clearIcon")),D("data-pc-section","clearicon"),l(),s("ngTemplateOutlet",e.clearIconTemplate||e._clearIconTemplate)("ngTemplateOutletContext",oe(6,Ls,e.cx("clearIcon")))}}function p_(t,r){if(t&1&&(W(0),g(1,l_,1,4,"svg",26)(2,c_,2,8,"span",27),K()),t&2){let e=d();l(),s("ngIf",!e.clearIconTemplate&&!e._clearIconTemplate),l(),s("ngIf",e.clearIconTemplate||e._clearIconTemplate)}}function u_(t,r){t&1&&U(0)}function m_(t,r){if(t&1&&(W(0),g(1,u_,1,0,"ng-container",31),K()),t&2){let e=d(2);l(),s("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)}}function h_(t,r){if(t&1&&F(0,"span",33),t&2){let e=d(3);C(e.cn(e.cx("loadingIcon"),"pi-spin"+e.loadingIcon)),s("pBind",e.ptm("loadingIcon"))}}function f_(t,r){if(t&1&&F(0,"span",33),t&2){let e=d(3);C(e.cn(e.cx("loadingIcon"),"pi pi-spinner pi-spin")),s("pBind",e.ptm("loadingIcon"))}}function g_(t,r){if(t&1&&(W(0),g(1,h_,1,3,"span",32)(2,f_,1,3,"span",32),K()),t&2){let e=d(2);l(),s("ngIf",e.loadingIcon),l(),s("ngIf",!e.loadingIcon)}}function __(t,r){if(t&1&&(W(0),g(1,m_,2,1,"ng-container",18)(2,g_,3,2,"ng-container",18),K()),t&2){let e=d();l(),s("ngIf",e.loadingIconTemplate||e._loadingIconTemplate),l(),s("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate)}}function b_(t,r){if(t&1&&F(0,"span",36),t&2){let e=d(3);C(e.cn(e.cx("dropdownIcon"),e.dropdownIcon)),s("pBind",e.ptm("dropdownIcon"))}}function y_(t,r){if(t&1&&(O(),F(0,"svg",37)),t&2){let e=d(3);C(e.cx("dropdownIcon")),s("pBind",e.ptm("dropdownIcon"))}}function v_(t,r){if(t&1&&(W(0),g(1,b_,1,3,"span",34)(2,y_,1,3,"svg",35),K()),t&2){let e=d(2);l(),s("ngIf",e.dropdownIcon),l(),s("ngIf",!e.dropdownIcon)}}function x_(t,r){}function C_(t,r){t&1&&g(0,x_,0,0,"ng-template")}function w_(t,r){if(t&1&&(c(0,"span",36),g(1,C_,1,0,null,30),p()),t&2){let e=d(2);C(e.cx("dropdownIcon")),s("pBind",e.ptm("dropdownIcon")),l(),s("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)("ngTemplateOutletContext",oe(5,Ls,e.cx("dropdownIcon")))}}function k_(t,r){if(t&1&&g(0,v_,3,2,"ng-container",18)(1,w_,2,7,"span",34),t&2){let e=d();s("ngIf",!e.dropdownIconTemplate&&!e._dropdownIconTemplate),l(),s("ngIf",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function T_(t,r){t&1&&U(0)}function S_(t,r){t&1&&U(0)}function I_(t,r){if(t&1&&(W(0),g(1,S_,1,0,"ng-container",30),K()),t&2){let e=d(3);l(),s("ngTemplateOutlet",e.filterTemplate||e._filterTemplate)("ngTemplateOutletContext",oe(2,Ps,e.filterOptions))}}function E_(t,r){if(t&1&&(O(),F(0,"svg",45)),t&2){let e=d(4);s("pBind",e.ptm("filterIcon"))}}function D_(t,r){}function M_(t,r){t&1&&g(0,D_,0,0,"ng-template")}function L_(t,r){if(t&1&&(c(0,"span",36),g(1,M_,1,0,null,31),p()),t&2){let e=d(4);s("pBind",e.ptm("filterIcon")),l(),s("ngTemplateOutlet",e.filterIconTemplate||e._filterIconTemplate)}}function P_(t,r){if(t&1){let e=P();c(0,"p-iconfield",41)(1,"input",42,10),x("input",function(i){_(e);let o=d(3);return b(o.onFilterInputChange(i))})("keydown",function(i){_(e);let o=d(3);return b(o.onFilterKeyDown(i))})("blur",function(i){_(e);let o=d(3);return b(o.onFilterBlur(i))}),p(),c(3,"p-inputicon",41),g(4,E_,1,1,"svg",43)(5,L_,2,2,"span",44),p()()}if(t&2){let e=d(3);s("pt",e.ptm("pcFilterContainer"))("unstyled",e.unstyled()),l(),C(e.cx("pcFilter")),s("pSize",e.size())("value",e._filterValue()||"")("variant",e.$variant())("pt",e.ptm("pcFilter"))("unstyled",e.unstyled()),D("placeholder",e.filterPlaceholder)("aria-owns",e.id+"_list")("aria-label",e.ariaFilterLabel)("aria-activedescendant",e.focusedOptionId),l(2),s("pt",e.ptm("pcFilterIconContainer"))("unstyled",e.unstyled()),l(),s("ngIf",!e.filterIconTemplate&&!e._filterIconTemplate),l(),s("ngIf",e.filterIconTemplate||e._filterIconTemplate)}}function F_(t,r){if(t&1&&(c(0,"div",29),x("click",function(n){return n.stopPropagation()}),g(1,I_,2,4,"ng-container",20)(2,P_,6,17,"ng-template",null,9,Ie),p()),t&2){let e=Se(3),n=d(2);C(n.cx("header")),s("pBind",n.ptm("header")),l(),s("ngIf",n.filterTemplate||n._filterTemplate)("ngIfElse",e)}}function R_(t,r){t&1&&U(0)}function B_(t,r){if(t&1&&g(0,R_,1,0,"ng-container",30),t&2){let e=r.$implicit,n=r.options;d(2);let i=Se(9);s("ngTemplateOutlet",i)("ngTemplateOutletContext",Pe(2,Fs,e,n))}}function O_(t,r){t&1&&U(0)}function V_(t,r){if(t&1&&g(0,O_,1,0,"ng-container",30),t&2){let e=r.options,n=d(4);s("ngTemplateOutlet",n.loaderTemplate||n._loaderTemplate)("ngTemplateOutletContext",oe(2,Ps,e))}}function z_(t,r){t&1&&(W(0),g(1,V_,1,4,"ng-template",null,12,Ie),K())}function q_(t,r){if(t&1){let e=P();c(0,"p-scroller",46,11),x("onLazyLoad",function(i){_(e);let o=d(2);return b(o.onLazyLoad.emit(i))}),g(2,B_,1,5,"ng-template",null,2,Ie)(4,z_,3,0,"ng-container",18),p()}if(t&2){let e=d(2);Ae(oe(9,hi,e.scrollHeight)),s("items",e.visibleOptions())("itemSize",e.virtualScrollItemSize)("autoSize",!0)("lazy",e.lazy)("options",e.virtualScrollOptions)("pt",e.ptm("virtualScroller")),l(4),s("ngIf",e.loaderTemplate||e._loaderTemplate)}}function A_(t,r){t&1&&U(0)}function N_(t,r){if(t&1&&(W(0),g(1,A_,1,0,"ng-container",30),K()),t&2){d();let e=Se(9),n=d();l(),s("ngTemplateOutlet",e)("ngTemplateOutletContext",Pe(3,Fs,n.visibleOptions(),Ct(2,e_)))}}function H_(t,r){if(t&1&&(c(0,"span",36),m(1),p()),t&2){let e=d(2).$implicit,n=d(3);C(n.cx("optionGroupLabel")),s("pBind",n.ptm("optionGroupLabel")),l(),Q(n.getOptionGroupLabel(e.optionGroup))}}function $_(t,r){t&1&&U(0)}function j_(t,r){if(t&1&&(W(0),c(1,"li",50),g(2,H_,2,4,"span",34)(3,$_,1,0,"ng-container",30),p(),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d().options,a=d(2);l(),C(a.cx("optionGroup")),s("ngStyle",oe(8,hi,o.itemSize+"px"))("pBind",a.ptm("optionGroup")),D("id",a.id+"_"+a.getOptionIndex(i,o)),l(),s("ngIf",!a.groupTemplate&&!a._groupTemplate),l(),s("ngTemplateOutlet",a.groupTemplate||a._groupTemplate)("ngTemplateOutletContext",oe(10,dr,n.optionGroup))}}function U_(t,r){if(t&1){let e=P();W(0),c(1,"p-selectItem",51),x("onClick",function(i){_(e);let o=d().$implicit,a=d(3);return b(a.onOptionSelect(i,o))})("onMouseEnter",function(i){_(e);let o=d().index,a=d().options,u=d(2);return b(u.onOptionMouseEnter(i,u.getOptionIndex(o,a)))}),p(),K()}if(t&2){let e=d(),n=e.$implicit,i=e.index,o=d().options,a=d(2);l(),s("id",a.id+"_"+a.getOptionIndex(i,o))("option",n)("checkmark",a.checkmark)("selected",a.isSelected(n))("label",a.getOptionLabel(n))("disabled",a.isOptionDisabled(n))("template",a.itemTemplate||a._itemTemplate)("focused",a.focusedOptionIndex()===a.getOptionIndex(i,o))("ariaPosInset",a.getAriaPosInset(a.getOptionIndex(i,o)))("ariaSetSize",a.ariaSetSize)("index",i)("unstyled",a.unstyled())("scrollerOptions",o)}}function Q_(t,r){if(t&1&&g(0,j_,4,12,"ng-container",18)(1,U_,2,13,"ng-container",18),t&2){let e=r.$implicit,n=d(3);s("ngIf",n.isOptionGroup(e)),l(),s("ngIf",!n.isOptionGroup(e))}}function G_(t,r){if(t&1&&m(0),t&2){let e=d(4);$(" ",e.emptyFilterMessageLabel," ")}}function W_(t,r){t&1&&U(0,null,14)}function K_(t,r){if(t&1&&g(0,W_,2,0,"ng-container",31),t&2){let e=d(4);s("ngTemplateOutlet",e.emptyFilterTemplate||e._emptyFilterTemplate||e.emptyTemplate||e._emptyTemplate)}}function Y_(t,r){if(t&1&&(c(0,"li",50),V(1,G_,1,1)(2,K_,1,1,"ng-container"),p()),t&2){let e=d().options,n=d(2);C(n.cx("emptyMessage")),s("ngStyle",oe(5,hi,e.itemSize+"px"))("pBind",n.ptm("emptyMessage")),l(),z(!n.emptyFilterTemplate&&!n._emptyFilterTemplate&&!n.emptyTemplate?1:2)}}function Z_(t,r){if(t&1&&m(0),t&2){let e=d(4);$(" ",e.emptyMessageLabel||e.emptyFilterMessageLabel," ")}}function X_(t,r){t&1&&U(0,null,15)}function J_(t,r){if(t&1&&g(0,X_,2,0,"ng-container",31),t&2){let e=d(4);s("ngTemplateOutlet",e.emptyTemplate||e._emptyTemplate)}}function eb(t,r){if(t&1&&(c(0,"li",50),V(1,Z_,1,1)(2,J_,1,1,"ng-container"),p()),t&2){let e=d().options,n=d(2);C(n.cx("emptyMessage")),s("ngStyle",oe(5,hi,e.itemSize+"px"))("pBind",n.ptm("emptyMessage")),l(),z(!n.emptyTemplate&&!n._emptyTemplate?1:2)}}function tb(t,r){if(t&1&&(c(0,"ul",47,13),g(2,Q_,2,2,"ng-template",48)(3,Y_,3,7,"li",49)(4,eb,3,7,"li",49),p()),t&2){let e=r.$implicit,n=r.options,i=d(2);Ae(n.contentStyle),C(i.cn(i.cx("list"),n.contentStyleClass)),s("pBind",i.ptm("list")),D("id",i.id+"_list")("aria-label",i.listLabel),l(2),s("ngForOf",e),l(),s("ngIf",i.filterValue&&i.isEmpty()),l(),s("ngIf",!i.filterValue&&i.isEmpty())}}function nb(t,r){t&1&&U(0)}function ib(t,r){if(t&1){let e=P();c(0,"div",38)(1,"span",39,6),x("focus",function(i){_(e);let o=d();return b(o.onFirstHiddenFocus(i))}),p(),g(3,T_,1,0,"ng-container",31)(4,F_,4,5,"div",27),c(5,"div",36),g(6,q_,5,11,"p-scroller",40)(7,N_,2,6,"ng-container",18)(8,tb,5,10,"ng-template",null,7,Ie),p(),g(10,nb,1,0,"ng-container",31),c(11,"span",39,8),x("focus",function(i){_(e);let o=d();return b(o.onLastHiddenFocus(i))}),p()()}if(t&2){let e=d();C(e.cn(e.cx("overlay"),e.panelStyleClass)),s("ngStyle",e.panelStyle)("pBind",e.ptm("overlay")),D("data-p",e.overlayDataP),l(),s("pBind",e.ptm("hiddenFirstFocusableEl")),D("tabindex",0)("data-p-hidden-accessible",!0)("data-p-hidden-focusable",!0),l(2),s("ngTemplateOutlet",e.headerTemplate||e._headerTemplate),l(),s("ngIf",e.filter),l(),C(e.cx("listContainer")),je("max-height",e.virtualScroll?"auto":e.scrollHeight||"auto"),s("pBind",e.ptm("listContainer")),l(),s("ngIf",e.virtualScroll),l(),s("ngIf",!e.virtualScroll),l(3),s("ngTemplateOutlet",e.footerTemplate||e._footerTemplate),l(),s("pBind",e.ptm("hiddenLastFocusableEl")),D("tabindex",0)("data-p-hidden-accessible",!0)("data-p-hidden-focusable",!0)}}var ob=`
    ${Ds}

    /* For PrimeNG */
    .p-select-label.p-placeholder {
        color: dt('select.placeholder.color');
    }

    .p-select.ng-invalid.ng-dirty {
        border-color: dt('select.invalid.border.color');
    }

    .p-dropdown.ng-invalid.ng-dirty .p-dropdown-label.p-placeholder,
    .p-select.ng-invalid.ng-dirty .p-select-label.p-placeholder {
        color: dt('select.invalid.placeholder.color');
    }
`,rb={root:({instance:t})=>["p-select p-component p-inputwrapper",{"p-disabled":t.$disabled(),"p-variant-filled":t.$variant()==="filled","p-focus":t.focused,"p-invalid":t.invalid(),"p-inputwrapper-filled":t.$filled(),"p-inputwrapper-focus":t.focused||t.overlayVisible,"p-select-open":t.overlayVisible,"p-select-fluid":t.hasFluid,"p-select-sm p-inputfield-sm":t.size()==="small","p-select-lg p-inputfield-lg":t.size()==="large"}],label:({instance:t})=>["p-select-label",{"p-placeholder":t.placeholder()&&t.label()===t.placeholder(),"p-select-label-empty":!t.editable&&!t.selectedItemTemplate&&(t.label()===void 0||t.label()===null||t.label()==="p-emptylabel"||t.label().length===0)}],clearIcon:"p-select-clear-icon",dropdown:"p-select-dropdown",loadingIcon:"p-select-loading-icon",dropdownIcon:"p-select-dropdown-icon",overlay:"p-select-overlay p-component-overlay p-component",header:"p-select-header",pcFilter:"p-select-filter",listContainer:"p-select-list-container",list:"p-select-list",optionGroup:"p-select-option-group",optionGroupLabel:"p-select-option-group-label",option:({instance:t})=>["p-select-option",{"p-select-option-selected":t.selected&&!t.checkmark,"p-disabled":t.disabled,"p-focus":t.focused}],optionLabel:"p-select-option-label",optionCheckIcon:"p-select-option-check-icon",optionBlankIcon:"p-select-option-blank-icon",emptyMessage:"p-select-empty-message"},mo=(()=>{class t extends fe{name="select";style=ob;classes=rb;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Rs=new ae("SELECT_INSTANCE"),ab=new ae("SELECT_ITEM_INSTANCE"),lb={provide:lt,useExisting:ot(()=>ho),multi:!0},sb=(()=>{class t extends De{hostName="select";$pcSelectItem=v(ab,{optional:!0,skipSelf:!0})??void 0;$pcSelect=v(Rs,{optional:!0,skipSelf:!0})??void 0;id;option;selected;focused;label;disabled;visible;itemSize;ariaPosInset;ariaSetSize;template;checkmark;index;scrollerOptions;onClick=new I;onMouseEnter=new I;_componentStyle=v(mo);onOptionClick(e){this.onClick.emit(e)}onOptionMouseEnter(e){this.onMouseEnter.emit(e)}getPTOptions(){return this.$pcSelect?.getPTItemOptions?.(this.option,this.scrollerOptions,this.index??0,"option")??this.$pcSelect?.ptm("option",{context:{option:this.option,selected:this.selected,focused:this.focused,disabled:this.disabled}})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-selectItem"]],inputs:{id:"id",option:"option",selected:[2,"selected","selected",w],focused:[2,"focused","focused",w],label:"label",disabled:[2,"disabled","disabled",w],visible:[2,"visible","visible",w],itemSize:[2,"itemSize","itemSize",se],ariaPosInset:"ariaPosInset",ariaSetSize:"ariaSetSize",template:"template",checkmark:[2,"checkmark","checkmark",w],index:"index",scrollerOptions:"scrollerOptions"},outputs:{onClick:"onClick",onMouseEnter:"onMouseEnter"},features:[le([mo,{provide:be,useExisting:t}]),L],decls:4,vars:21,consts:[["role","option","pRipple","",3,"click","mouseenter","id","pBind","ngStyle"],[4,"ngIf"],[3,"pBind",4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["data-p-icon","check",3,"class","pBind",4,"ngIf"],["data-p-icon","blank",3,"class","pBind",4,"ngIf"],["data-p-icon","check",3,"pBind"],["data-p-icon","blank",3,"pBind"],[3,"pBind"]],template:function(n,i){n&1&&(c(0,"li",0),x("click",function(a){return i.onOptionClick(a)})("mouseenter",function(a){return i.onOptionMouseEnter(a)}),g(1,Dg,3,2,"ng-container",1)(2,Mg,2,2,"span",2)(3,Lg,1,0,"ng-container",3),p()),n&2&&(C(i.cx("option")),s("id",i.id)("pBind",i.getPTOptions())("ngStyle",oe(17,hi,(i.scrollerOptions==null?null:i.scrollerOptions.itemSize)+"px")),D("aria-label",i.label)("aria-setsize",i.ariaSetSize)("aria-posinset",i.ariaPosInset)("aria-selected",i.selected)("data-p-focused",i.focused)("data-p-highlight",i.selected)("data-p-selected",i.selected)("data-p-disabled",i.disabled),l(),s("ngIf",i.checkmark),l(),s("ngIf",!i.template),l(),s("ngTemplateOutlet",i.template)("ngTemplateOutletContext",oe(19,dr,i.option)))},dependencies:[te,ze,Le,rt,ie,Jt,Pi,ll,Ve,A],encapsulation:2})}return t})(),ho=(()=>{class t extends Hn{zone;filterService;componentName="Select";bindDirectiveInstance=v(A,{self:!0});id;scrollHeight="200px";filter;panelStyle;styleClass;panelStyleClass;readonly;editable;tabindex=0;set placeholder(e){this._placeholder.set(e)}get placeholder(){return this._placeholder.asReadonly()}loadingIcon;filterPlaceholder;filterLocale;inputId;dataKey;filterBy;filterFields;autofocus;resetFilterOnHide=!1;checkmark=!1;dropdownIcon;loading=!1;optionLabel;optionValue;optionDisabled;optionGroupLabel="label";optionGroupChildren="items";group;showClear;emptyFilterMessage="";emptyMessage="";lazy=!1;virtualScroll;virtualScrollItemSize;virtualScrollOptions;overlayOptions;ariaFilterLabel;ariaLabel;ariaLabelledBy;filterMatchMode="contains";tooltip="";tooltipPosition="right";tooltipPositionStyle="absolute";tooltipStyleClass;focusOnHover=!0;selectOnFocus=!1;autoOptionFocus=!1;autofocusFilter=!0;get filterValue(){return this._filterValue()}set filterValue(e){setTimeout(()=>{this._filterValue.set(e)})}get options(){return this._options()}set options(e){Wr(e,this._options())||this._options.set(e)}appendTo=ee(void 0);motionOptions=ee(void 0);onChange=new I;onFilter=new I;onFocus=new I;onBlur=new I;onClick=new I;onShow=new I;onHide=new I;onClear=new I;onLazyLoad=new I;_componentStyle=v(mo);filterViewChild;focusInputViewChild;editableInputViewChild;itemsViewChild;scroller;overlayViewChild;firstHiddenFocusableElementOnOverlay;lastHiddenFocusableElementOnOverlay;itemsWrapper;$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());itemTemplate;groupTemplate;loaderTemplate;selectedItemTemplate;headerTemplate;filterTemplate;footerTemplate;emptyFilterTemplate;emptyTemplate;dropdownIconTemplate;loadingIconTemplate;clearIconTemplate;filterIconTemplate;onIconTemplate;offIconTemplate;cancelIconTemplate;templates;_itemTemplate;_selectedItemTemplate;_headerTemplate;_filterTemplate;_footerTemplate;_emptyFilterTemplate;_emptyTemplate;_groupTemplate;_loaderTemplate;_dropdownIconTemplate;_loadingIconTemplate;_clearIconTemplate;_filterIconTemplate;_cancelIconTemplate;_onIconTemplate;_offIconTemplate;filterOptions;_options=Z(null);_placeholder=Z(void 0);value;hover;focused;overlayVisible;optionsChanged;panel;dimensionsUpdated;hoveredItem;selectedOptionUpdated;_filterValue=Z(null);searchValue;searchIndex;searchTimeout;previousSearchChar;currentSearchChar;preventModelTouched;focusedOptionIndex=Z(-1);labelId;listId;clicked=Z(!1);get emptyMessageLabel(){return this.emptyMessage||this.config.getTranslation(Ze.EMPTY_MESSAGE)}get emptyFilterMessageLabel(){return this.emptyFilterMessage||this.config.getTranslation(Ze.EMPTY_FILTER_MESSAGE)}get isVisibleClearIcon(){return this.modelValue()!=null&&this.hasSelectedOption()&&this.showClear&&!this.$disabled()}get listLabel(){return this.config.getTranslation(Ze.ARIA).listLabel}get focusedOptionId(){return this.focusedOptionIndex()!==-1?`${this.id}_${this.focusedOptionIndex()}`:null}visibleOptions=J(()=>{let e=this.getAllVisibleAndNonVisibleOptions();if(this._filterValue()){let i=!(this.filterBy||this.optionLabel)&&!this.filterFields&&!this.optionValue?this.options?.filter(o=>o.label?o.label.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim())!==-1:o.toString().toLowerCase().indexOf(this._filterValue().toLowerCase().trim())!==-1):this.filterService.filter(e,this.searchFields(),this._filterValue().trim(),this.filterMatchMode,this.filterLocale);if(this.group){let o=this.options||[],a=[];return o.forEach(u=>{let f=this.getOptionGroupChildren(u).filter(y=>i?.includes(y));f.length>0&&a.push(ue(G({},u),{[typeof this.optionGroupChildren=="string"?this.optionGroupChildren:"items"]:[...f]}))}),this.flatOptions(a)}return i}return e});label=J(()=>{let e=this.getAllVisibleAndNonVisibleOptions(),n=e.findIndex(i=>this.isOptionValueEqualsModelValue(i));if(n!==-1){let i=e[n];return this.getOptionLabel(i)}return this.placeholder()||"p-emptylabel"});selectedOption;constructor(e,n){super(),this.zone=e,this.filterService=n,Xe(()=>{let i=this.modelValue(),o=this.visibleOptions();if(o&&Wt(o)){let a=this.findSelectedOptionIndex();if(a!==-1||i===void 0||typeof i=="string"&&i.length===0||this.isModelValueNotSet()||this.editable)this.selectedOption=o[a];else{let u=o.findIndex(h=>this.isSelected(h));u!==-1&&(this.selectedOption=o[u])}}ti(o)&&(i===void 0||this.isModelValueNotSet())&&Wt(this.selectedOption)&&(this.selectedOption=null),i!==void 0&&this.editable&&this.updateEditableLabel(),this.cd.markForCheck()})}isModelValueNotSet(){return this.modelValue()===null&&!this.isOptionValueEqualsModelValue(this.selectedOption)}getAllVisibleAndNonVisibleOptions(){return this.group?this.flatOptions(this.options):this.options||[]}onInit(){this.id=this.id||Te("pn_id_"),this.autoUpdateModel(),this.filterBy&&(this.filterOptions={filter:e=>this.onFilterInputChange(e),reset:()=>this.resetFilter()})}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"item":this._itemTemplate=e.template;break;case"selectedItem":this._selectedItemTemplate=e.template;break;case"header":this._headerTemplate=e.template;break;case"filter":this._filterTemplate=e.template;break;case"footer":this._footerTemplate=e.template;break;case"emptyfilter":this._emptyFilterTemplate=e.template;break;case"empty":this._emptyTemplate=e.template;break;case"group":this._groupTemplate=e.template;break;case"loader":this._loaderTemplate=e.template;break;case"dropdownicon":this._dropdownIconTemplate=e.template;break;case"loadingicon":this._loadingIconTemplate=e.template;break;case"clearicon":this._clearIconTemplate=e.template;break;case"filtericon":this._filterIconTemplate=e.template;break;case"cancelicon":this._cancelIconTemplate=e.template;break;case"onicon":this._onIconTemplate=e.template;break;case"officon":this._offIconTemplate=e.template;break;default:this._itemTemplate=e.template;break}})}onAfterViewChecked(){if(this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"])),this.optionsChanged&&this.overlayVisible&&(this.optionsChanged=!1,this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.overlayViewChild&&this.overlayViewChild.alignOverlay()},1)})),this.selectedOptionUpdated&&this.itemsWrapper){let e=Ee(this.overlayViewChild?.overlayViewChild?.nativeElement,'li[data-p-selected="true"]');e&&Gr(this.itemsWrapper,e),this.selectedOptionUpdated=!1}}flatOptions(e){return(e||[]).reduce((n,i,o)=>{n.push({optionGroup:i,group:!0,index:o});let a=this.getOptionGroupChildren(i);return a&&a.forEach(u=>n.push(u)),n},[])}autoUpdateModel(){this.selectOnFocus&&this.autoOptionFocus&&!this.hasSelectedOption()&&(this.focusedOptionIndex.set(this.findFirstFocusedOptionIndex()),this.onOptionSelect(null,this.visibleOptions()[this.focusedOptionIndex()],!1))}onOptionSelect(e,n,i=!0,o=!1){if(!this.isOptionDisabled(n)){if(!this.isSelected(n)){let a=this.getOptionValue(n);this.updateModel(a,e),this.focusedOptionIndex.set(this.findSelectedOptionIndex()),o===!1&&this.onChange.emit({originalEvent:e,value:a})}i&&this.hide(!0)}}onOptionMouseEnter(e,n){this.focusOnHover&&this.changeFocusedOptionIndex(e,n)}updateModel(e,n){this.value=e,this.onModelChange(e),this.writeModelValue(e),this.selectedOptionUpdated=!0}allowModelChange(){return!!this.modelValue()&&!this.placeholder()&&(this.modelValue()===void 0||this.modelValue()===null)&&!this.editable&&this.options&&this.options.length}isSelected(e){return this.isOptionValueEqualsModelValue(e)}isOptionValueEqualsModelValue(e){return e!=null&&!this.isOptionGroup(e)&&on(this.modelValue(),this.getOptionValue(e),this.equalityKey())}onAfterViewInit(){this.editable&&this.updateEditableLabel(),this.updatePlaceHolderForFloatingLabel()}updatePlaceHolderForFloatingLabel(){let e=this.el.nativeElement.parentElement,n=e?.classList.contains("p-float-label");if(e&&n&&!this.selectedOption){let i=e.querySelector("label");i&&this._placeholder.set(i.textContent)}}updateEditableLabel(){this.editableInputViewChild&&(this.editableInputViewChild.nativeElement.value=this.getOptionLabel(this.selectedOption)||this.modelValue()||"")}clearEditableLabel(){this.editableInputViewChild&&(this.editableInputViewChild.nativeElement.value="")}getOptionIndex(e,n){return this.virtualScrollerDisabled?e:n&&n.getItemOptions(e).index}getOptionLabel(e){return this.optionLabel!==void 0&&this.optionLabel!==null?Kt(e,this.optionLabel):e&&e.label!==void 0?e.label:e}getOptionValue(e){return this.optionValue&&this.optionValue!==null?Kt(e,this.optionValue):!this.optionLabel&&e&&e.value!==void 0?e.value:e}getPTItemOptions(e,n,i,o){return this.ptm(o,{context:{option:e,index:i,selected:this.isSelected(e),focused:this.focusedOptionIndex()===this.getOptionIndex(i,n),disabled:this.isOptionDisabled(e)}})}isSelectedOptionEmpty(){return ti(this.selectedOption)}isOptionDisabled(e){return this.optionDisabled?Kt(e,this.optionDisabled):e&&e.disabled!==void 0?e.disabled:!1}getOptionGroupLabel(e){return this.optionGroupLabel!==void 0&&this.optionGroupLabel!==null?Kt(e,this.optionGroupLabel):e&&e.label!==void 0?e.label:e}getOptionGroupChildren(e){return this.optionGroupChildren!==void 0&&this.optionGroupChildren!==null?Kt(e,this.optionGroupChildren):e.items}getAriaPosInset(e){return(this.optionGroupLabel?e-this.visibleOptions().slice(0,e).filter(n=>this.isOptionGroup(n)).length:e)+1}get ariaSetSize(){return this.visibleOptions().filter(e=>!this.isOptionGroup(e)).length}resetFilter(){this._filterValue.set(null),this.filterViewChild&&this.filterViewChild.nativeElement&&(this.filterViewChild.nativeElement.value="")}onContainerClick(e){this.$disabled()||this.readonly||this.loading||e.target.tagName==="INPUT"||e.target.getAttribute("data-pc-section")==="clearicon"||e.target.closest('[data-pc-section="clearicon"]')||((!this.overlayViewChild||!this.overlayViewChild.el.nativeElement.contains(e.target))&&(this.overlayVisible?this.hide(!0):this.show(!0)),this.focusInputViewChild?.nativeElement.focus({preventScroll:!0}),this.onClick.emit(e),this.clicked.set(!0),this.cd.detectChanges())}isEmpty(){return!this._options()||this.visibleOptions()&&this.visibleOptions().length===0}onEditableInput(e){let n=e.target.value;this.searchValue="",!this.searchOptions(e,n)&&this.focusedOptionIndex.set(-1),this.onModelChange(n),this.updateModel(n||null,e),setTimeout(()=>{this.onChange.emit({originalEvent:e,value:n})},1),!this.overlayVisible&&Wt(n)&&this.show()}show(e){this.overlayVisible=!0,this.focusedOptionIndex.set(this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.autoOptionFocus?this.findFirstFocusedOptionIndex():this.editable?-1:this.findSelectedOptionIndex()),e&&mt(this.focusInputViewChild?.nativeElement),this.cd.markForCheck()}onOverlayBeforeEnter(e){if(this.itemsWrapper=Ee(this.overlayViewChild?.overlayViewChild?.nativeElement,this.virtualScroll?'[data-pc-name="virtualscroller"]':'[data-pc-section="listcontainer"]'),this.virtualScroll&&this.scroller?.setContentEl(this.itemsViewChild?.nativeElement),this.options&&this.options.length)if(this.virtualScroll){let n=this.modelValue()?this.focusedOptionIndex():-1;n!==-1&&setTimeout(()=>{this.scroller?.scrollToIndex(n)},10)}else{let n=Ee(this.itemsWrapper,'[data-p-selected="true"]');n&&n.scrollIntoView({block:"nearest",inline:"nearest"})}this.filterViewChild&&this.filterViewChild.nativeElement&&(this.preventModelTouched=!0,this.autofocusFilter&&!this.editable&&this.filterViewChild.nativeElement.focus()),this.onShow.emit(e)}onOverlayAfterLeave(e){this.itemsWrapper=null,this.onModelTouched(),this.onHide.emit(e)}hide(e){this.overlayVisible=!1,this.focusedOptionIndex.set(-1),this.clicked.set(!1),this.searchValue="",this.overlayOptions?.mode==="modal"&&xn(),this.filter&&this.resetFilterOnHide&&this.resetFilter(),e&&(this.focusInputViewChild&&mt(this.focusInputViewChild?.nativeElement),this.editable&&this.editableInputViewChild&&mt(this.editableInputViewChild?.nativeElement)),this.cd.markForCheck()}onInputFocus(e){if(this.$disabled())return;this.focused=!0;let n=this.focusedOptionIndex()!==-1?this.focusedOptionIndex():this.overlayVisible&&this.autoOptionFocus?this.findFirstFocusedOptionIndex():-1;this.focusedOptionIndex.set(n),this.overlayVisible&&this.scrollInView(this.focusedOptionIndex()),this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onBlur.emit(e),!this.preventModelTouched&&!this.overlayVisible&&this.onModelTouched(),this.preventModelTouched=!1}onKeyDown(e,n=!1){if(!(this.$disabled()||this.readonly||this.loading)){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,this.editable);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,this.editable);break;case"Delete":this.onDeleteKey(e);break;case"Home":this.onHomeKey(e,this.editable);break;case"End":this.onEndKey(e,this.editable);break;case"PageDown":this.onPageDownKey(e);break;case"PageUp":this.onPageUpKey(e);break;case"Space":this.onSpaceKey(e,n);break;case"Enter":case"NumpadEnter":this.onEnterKey(e);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e);break;case"Backspace":this.onBackspaceKey(e,this.editable);break;case"ShiftLeft":case"ShiftRight":break;default:!e.metaKey&&Yr(e.key)&&(!this.overlayVisible&&this.show(),!this.editable&&this.searchOptions(e,e.key));break}this.clicked.set(!1)}}onFilterKeyDown(e){switch(e.code){case"ArrowDown":this.onArrowDownKey(e);break;case"ArrowUp":this.onArrowUpKey(e,!0);break;case"ArrowLeft":case"ArrowRight":this.onArrowLeftKey(e,!0);break;case"Home":this.onHomeKey(e,!0);break;case"End":this.onEndKey(e,!0);break;case"Enter":case"NumpadEnter":this.onEnterKey(e,!0);break;case"Escape":this.onEscapeKey(e);break;case"Tab":this.onTabKey(e,!0);break;default:break}}onFilterBlur(e){this.focusedOptionIndex.set(-1)}onArrowDownKey(e){if(!this.overlayVisible)this.show(),this.editable&&this.changeFocusedOptionIndex(e,this.findSelectedOptionIndex());else{let n=this.focusedOptionIndex()!==-1?this.findNextOptionIndex(this.focusedOptionIndex()):this.clicked()?this.findFirstOptionIndex():this.findFirstFocusedOptionIndex();this.changeFocusedOptionIndex(e,n)}e.preventDefault(),e.stopPropagation()}changeFocusedOptionIndex(e,n){if(this.focusedOptionIndex()!==n&&(this.focusedOptionIndex.set(n),this.scrollInView(),this.selectOnFocus)){let i=this.visibleOptions()[n];this.onOptionSelect(e,i,!1)}}get virtualScrollerDisabled(){return!this.virtualScroll}scrollInView(e=-1){let n=e!==-1?`${this.id}_${e}`:this.focusedOptionId;if(this.itemsViewChild&&this.itemsViewChild.nativeElement){let i=Ee(this.itemsViewChild.nativeElement,`li[id="${n}"]`);i?i.scrollIntoView&&i.scrollIntoView({block:"nearest",inline:"nearest"}):this.virtualScrollerDisabled||setTimeout(()=>{this.virtualScroll&&this.scroller?.scrollToIndex(e!==-1?e:this.focusedOptionIndex())},0)}}hasSelectedOption(){return this.modelValue()!==void 0}isValidSelectedOption(e){return this.isValidOption(e)&&this.isSelected(e)}equalityKey(){return this.optionValue?void 0:this.dataKey}findFirstFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findFirstOptionIndex():e}findFirstOptionIndex(){return this.visibleOptions().findIndex(e=>this.isValidOption(e))}findSelectedOptionIndex(){return this.hasSelectedOption()?this.visibleOptions().findIndex(e=>this.isValidSelectedOption(e)):-1}findNextOptionIndex(e){let n=e<this.visibleOptions().length-1?this.visibleOptions().slice(e+1).findIndex(i=>this.isValidOption(i)):-1;return n>-1?n+e+1:e}findPrevOptionIndex(e){let n=e>0?Ro(this.visibleOptions().slice(0,e),i=>this.isValidOption(i)):-1;return n>-1?n:e}findLastOptionIndex(){return Ro(this.visibleOptions(),e=>this.isValidOption(e))}findLastFocusedOptionIndex(){let e=this.findSelectedOptionIndex();return e<0?this.findLastOptionIndex():e}isValidOption(e){return e!=null&&!(this.isOptionDisabled(e)||this.isOptionGroup(e))}isOptionGroup(e){return this.optionGroupLabel!==void 0&&this.optionGroupLabel!==null&&e.optionGroup!==void 0&&e.optionGroup!==null&&e.group}onArrowUpKey(e,n=!1){if(e.altKey&&!n){if(this.focusedOptionIndex()!==-1){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}this.overlayVisible&&this.hide()}else{let i=this.focusedOptionIndex()!==-1?this.findPrevOptionIndex(this.focusedOptionIndex()):this.clicked()?this.findLastOptionIndex():this.findLastFocusedOptionIndex();this.changeFocusedOptionIndex(e,i),!this.overlayVisible&&this.show()}e.preventDefault(),e.stopPropagation()}onArrowLeftKey(e,n=!1){n&&this.focusedOptionIndex.set(-1)}onDeleteKey(e){this.showClear&&(this.clear(e),e.preventDefault())}onHomeKey(e,n=!1){if(n&&e.currentTarget&&e.currentTarget.setSelectionRange){let i=e.currentTarget;e.shiftKey?i.setSelectionRange(0,i.value.length):(i.setSelectionRange(0,0),this.focusedOptionIndex.set(-1))}else this.changeFocusedOptionIndex(e,this.findFirstOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()}onEndKey(e,n=!1){if(n&&e.currentTarget&&e.currentTarget.setSelectionRange){let i=e.currentTarget;if(e.shiftKey)i.setSelectionRange(0,i.value.length);else{let o=i.value.length;i.setSelectionRange(o,o),this.focusedOptionIndex.set(-1)}}else this.changeFocusedOptionIndex(e,this.findLastOptionIndex()),!this.overlayVisible&&this.show();e.preventDefault()}onPageDownKey(e){this.scrollInView(this.visibleOptions().length-1),e.preventDefault()}onPageUpKey(e){this.scrollInView(0),e.preventDefault()}onSpaceKey(e,n=!1){!this.editable&&!n&&this.onEnterKey(e)}onEnterKey(e,n=!1){if(!this.overlayVisible)this.focusedOptionIndex.set(-1),this.onArrowDownKey(e);else{if(this.focusedOptionIndex()!==-1){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}!n&&this.hide()}e.preventDefault()}onEscapeKey(e){this.overlayVisible&&(this.hide(!0),e.preventDefault(),e.stopPropagation())}onTabKey(e,n=!1){if(!n)if(this.overlayVisible&&this.hasFocusableElements())mt(e.shiftKey?this.lastHiddenFocusableElementOnOverlay?.nativeElement:this.firstHiddenFocusableElementOnOverlay?.nativeElement),e.preventDefault();else{if(this.focusedOptionIndex()!==-1&&this.overlayVisible){let i=this.visibleOptions()[this.focusedOptionIndex()];this.onOptionSelect(e,i)}this.overlayVisible&&this.hide(this.filter)}e.stopPropagation()}onFirstHiddenFocus(e){let n=e.relatedTarget===this.focusInputViewChild?.nativeElement?xi(this.overlayViewChild?.el?.nativeElement,':not([data-p-hidden-focusable="true"])'):this.focusInputViewChild?.nativeElement;mt(n)}onLastHiddenFocus(e){let n=e.relatedTarget===this.focusInputViewChild?.nativeElement?Ci(this.overlayViewChild?.overlayViewChild?.nativeElement,':not([data-p-hidden-focusable="true"])'):this.focusInputViewChild?.nativeElement;mt(n)}hasFocusableElements(){return Jn(this.overlayViewChild?.overlayViewChild?.nativeElement,':not([data-p-hidden-focusable="true"])').length>0}onBackspaceKey(e,n=!1){n&&!this.overlayVisible&&this.show()}searchFields(){return this.filterBy?.split(",")||this.filterFields||[this.optionLabel]}searchOptions(e,n){this.searchValue=(this.searchValue||"")+n;let i=-1,o=!1;return i=this.visibleOptions().findIndex(a=>this.isOptionMatched(a)),i!==-1&&(o=!0),i===-1&&this.focusedOptionIndex()===-1&&(i=this.findFirstFocusedOptionIndex()),i!==-1&&setTimeout(()=>{this.changeFocusedOptionIndex(e,i)}),this.searchTimeout&&clearTimeout(this.searchTimeout),this.searchTimeout=setTimeout(()=>{this.searchValue="",this.searchTimeout=null},500),o}isOptionMatched(e){return this.isValidOption(e)&&this.getOptionLabel(e).toString().toLocaleLowerCase(this.filterLocale).startsWith(this.searchValue?.toLocaleLowerCase(this.filterLocale))}onFilterInputChange(e){let n=e.target.value;this._filterValue.set(n),this.focusedOptionIndex.set(-1),this.onFilter.emit({originalEvent:e,filter:this._filterValue()}),!this.virtualScrollerDisabled&&this.scroller?.scrollToIndex(0),setTimeout(()=>{this.overlayViewChild?.alignOverlay()}),this.cd.markForCheck()}applyFocus(){this.editable?Ee(this.el.nativeElement,'[data-pc-section="label"]').focus():mt(this.focusInputViewChild?.nativeElement)}focus(){this.applyFocus()}clear(e){this.updateModel(null,e),this.clearEditableLabel(),this.onModelTouched(),this.onChange.emit({originalEvent:e,value:this.value}),this.onClear.emit(e),this.resetFilter()}writeControlValue(e,n){this.filter&&this.resetFilter(),this.value=e,this.allowModelChange()&&this.onModelChange(e),n(this.value),this.updateEditableLabel(),this.cd.markForCheck()}get containerDataP(){return this.cn({invalid:this.invalid(),disabled:this.$disabled(),focus:this.focused,fluid:this.hasFluid,filled:this.$variant()==="filled",[this.size()]:this.size()})}get labelDataP(){return this.cn({placeholder:this.label===this.placeholder,clearable:this.showClear,disabled:this.$disabled(),[this.size()]:this.size(),empty:!this.editable&&!this.selectedItemTemplate&&(!this.label?.()||this.label()==="p-emptylabel"||this.label()?.length===0)})}get dropdownIconDataP(){return this.cn({[this.size()]:this.size()})}get overlayDataP(){return this.cn({["overlay-"+this.$appendTo()]:"overlay-"+this.$appendTo()})}static \u0275fac=function(n){return new(n||t)(Qe(Be),Qe(wi))};static \u0275cmp=E({type:t,selectors:[["p-select"]],contentQueries:function(n,i,o){if(n&1&&Re(o,Pg,4)(o,Fg,4)(o,Rg,4)(o,Bg,4)(o,Og,4)(o,Ms,4)(o,Vg,4)(o,zg,4)(o,qg,4)(o,Ag,4)(o,Ng,4)(o,Hg,4)(o,$g,4)(o,jg,4)(o,Ug,4)(o,Qg,4)(o,Me,4),n&2){let a;k(a=T())&&(i.itemTemplate=a.first),k(a=T())&&(i.groupTemplate=a.first),k(a=T())&&(i.loaderTemplate=a.first),k(a=T())&&(i.selectedItemTemplate=a.first),k(a=T())&&(i.headerTemplate=a.first),k(a=T())&&(i.filterTemplate=a.first),k(a=T())&&(i.footerTemplate=a.first),k(a=T())&&(i.emptyFilterTemplate=a.first),k(a=T())&&(i.emptyTemplate=a.first),k(a=T())&&(i.dropdownIconTemplate=a.first),k(a=T())&&(i.loadingIconTemplate=a.first),k(a=T())&&(i.clearIconTemplate=a.first),k(a=T())&&(i.filterIconTemplate=a.first),k(a=T())&&(i.onIconTemplate=a.first),k(a=T())&&(i.offIconTemplate=a.first),k(a=T())&&(i.cancelIconTemplate=a.first),k(a=T())&&(i.templates=a)}},viewQuery:function(n,i){if(n&1&&We(Ms,5)(Gg,5)(Wg,5)(Kg,5)(Yg,5)(Zg,5)(Xg,5)(Jg,5),n&2){let o;k(o=T())&&(i.filterViewChild=o.first),k(o=T())&&(i.focusInputViewChild=o.first),k(o=T())&&(i.editableInputViewChild=o.first),k(o=T())&&(i.itemsViewChild=o.first),k(o=T())&&(i.scroller=o.first),k(o=T())&&(i.overlayViewChild=o.first),k(o=T())&&(i.firstHiddenFocusableElementOnOverlay=o.first),k(o=T())&&(i.lastHiddenFocusableElementOnOverlay=o.first)}},hostVars:4,hostBindings:function(n,i){n&1&&x("click",function(a){return i.onContainerClick(a)}),n&2&&(D("id",i.id)("data-p",i.containerDataP),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{id:"id",scrollHeight:"scrollHeight",filter:[2,"filter","filter",w],panelStyle:"panelStyle",styleClass:"styleClass",panelStyleClass:"panelStyleClass",readonly:[2,"readonly","readonly",w],editable:[2,"editable","editable",w],tabindex:[2,"tabindex","tabindex",se],placeholder:"placeholder",loadingIcon:"loadingIcon",filterPlaceholder:"filterPlaceholder",filterLocale:"filterLocale",inputId:"inputId",dataKey:"dataKey",filterBy:"filterBy",filterFields:"filterFields",autofocus:[2,"autofocus","autofocus",w],resetFilterOnHide:[2,"resetFilterOnHide","resetFilterOnHide",w],checkmark:[2,"checkmark","checkmark",w],dropdownIcon:"dropdownIcon",loading:[2,"loading","loading",w],optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",optionGroupLabel:"optionGroupLabel",optionGroupChildren:"optionGroupChildren",group:[2,"group","group",w],showClear:[2,"showClear","showClear",w],emptyFilterMessage:"emptyFilterMessage",emptyMessage:"emptyMessage",lazy:[2,"lazy","lazy",w],virtualScroll:[2,"virtualScroll","virtualScroll",w],virtualScrollItemSize:[2,"virtualScrollItemSize","virtualScrollItemSize",se],virtualScrollOptions:"virtualScrollOptions",overlayOptions:"overlayOptions",ariaFilterLabel:"ariaFilterLabel",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",filterMatchMode:"filterMatchMode",tooltip:"tooltip",tooltipPosition:"tooltipPosition",tooltipPositionStyle:"tooltipPositionStyle",tooltipStyleClass:"tooltipStyleClass",focusOnHover:[2,"focusOnHover","focusOnHover",w],selectOnFocus:[2,"selectOnFocus","selectOnFocus",w],autoOptionFocus:[2,"autoOptionFocus","autoOptionFocus",w],autofocusFilter:[2,"autofocusFilter","autofocusFilter",w],filterValue:"filterValue",options:"options",appendTo:[1,"appendTo"],motionOptions:[1,"motionOptions"]},outputs:{onChange:"onChange",onFilter:"onFilter",onFocus:"onFocus",onBlur:"onBlur",onClick:"onClick",onShow:"onShow",onHide:"onHide",onClear:"onClear",onLazyLoad:"onLazyLoad"},features:[le([lb,mo,{provide:Rs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:11,vars:18,consts:[["elseBlock",""],["overlay",""],["content",""],["focusInput",""],["defaultPlaceholder",""],["editableInput",""],["firstHiddenFocusableEl",""],["buildInItems",""],["lastHiddenFocusableEl",""],["builtInFilterElement",""],["filter",""],["scroller",""],["loader",""],["items",""],["emptyFilter",""],["empty",""],["role","combobox",3,"class","pBind","pTooltip","pTooltipUnstyled","tooltipPosition","positionStyle","tooltipStyleClass","pAutoFocus","focus","blur","keydown",4,"ngIf"],["type","text",3,"class","pBind","pAutoFocus","input","keydown","focus","blur",4,"ngIf"],[4,"ngIf"],["role","button","aria-label","dropdown trigger","aria-haspopup","listbox",3,"pBind"],[4,"ngIf","ngIfElse"],[3,"visibleChange","onBeforeEnter","onAfterLeave","onHide","hostAttrSelector","visible","options","target","appendTo","unstyled","pt","motionOptions"],["role","combobox",3,"focus","blur","keydown","pBind","pTooltip","pTooltipUnstyled","tooltipPosition","positionStyle","tooltipStyleClass","pAutoFocus"],[3,"ngTemplateOutlet","ngTemplateOutletContext",4,"ngIf"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],["type","text",3,"input","keydown","focus","blur","pBind","pAutoFocus"],["data-p-icon","times",3,"class","pBind","click",4,"ngIf"],[3,"class","pBind","click",4,"ngIf"],["data-p-icon","times",3,"click","pBind"],[3,"click","pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[4,"ngTemplateOutlet"],["aria-hidden","true",3,"class","pBind",4,"ngIf"],["aria-hidden","true",3,"pBind"],[3,"class","pBind",4,"ngIf"],["data-p-icon","chevron-down",3,"class","pBind",4,"ngIf"],[3,"pBind"],["data-p-icon","chevron-down",3,"pBind"],[3,"ngStyle","pBind"],["role","presentation",1,"p-hidden-accessible","p-hidden-focusable",3,"focus","pBind"],["hostName","select",3,"items","style","itemSize","autoSize","lazy","options","pt","onLazyLoad",4,"ngIf"],[3,"pt","unstyled"],["pInputText","","type","text","role","searchbox","autocomplete","off",3,"input","keydown","blur","pSize","value","variant","pt","unstyled"],["data-p-icon","search",3,"pBind",4,"ngIf"],[3,"pBind",4,"ngIf"],["data-p-icon","search",3,"pBind"],["hostName","select",3,"onLazyLoad","items","itemSize","autoSize","lazy","options","pt"],["role","listbox",3,"pBind"],["ngFor","",3,"ngForOf"],["role","option",3,"class","ngStyle","pBind",4,"ngIf"],["role","option",3,"ngStyle","pBind"],[3,"onClick","onMouseEnter","id","option","checkmark","selected","label","disabled","template","focused","ariaPosInset","ariaSetSize","index","unstyled","scrollerOptions"]],template:function(n,i){if(n&1){let o=P();g(0,r_,6,25,"span",16)(1,a_,2,20,"input",17)(2,p_,3,2,"ng-container",18),c(3,"div",19),g(4,__,3,2,"ng-container",20)(5,k_,2,2,"ng-template",null,0,Ie),p(),c(7,"p-overlay",21,1),xt("visibleChange",function(u){return _(o),vt(i.overlayVisible,u)||(i.overlayVisible=u),b(u)}),x("onBeforeEnter",function(u){return i.onOverlayBeforeEnter(u)})("onAfterLeave",function(u){return i.onOverlayAfterLeave(u)})("onHide",function(){return i.hide()}),g(9,ib,13,23,"ng-template",null,2,Ie),p()}if(n&2){let o=Se(6);s("ngIf",!i.editable),l(),s("ngIf",i.editable),l(),s("ngIf",i.isVisibleClearIcon),l(),C(i.cx("dropdown")),s("pBind",i.ptm("dropdown")),D("aria-expanded",i.overlayVisible??!1)("data-pc-section","trigger"),l(),s("ngIf",i.loading)("ngIfElse",o),l(3),s("hostAttrSelector",i.$attrSelector),yt("visible",i.overlayVisible),s("options",i.overlayOptions)("target","@parent")("appendTo",i.$appendTo())("unstyled",i.unstyled())("pt",i.ptm("pcOverlay"))("motionOptions",i.motionOptions())}},dependencies:[te,jt,ze,Le,rt,sb,vs,Es,Xt,fn,io,gl,$n,ps,hs,mi,ie,Ve,A],encapsulation:2,changeDetection:0})}return t})(),Bs=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[ho,ie,ie]})}return t})();var Os=`
    .p-paginator {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        background: dt('paginator.background');
        color: dt('paginator.color');
        padding: dt('paginator.padding');
        border-radius: dt('paginator.border.radius');
        gap: dt('paginator.gap');
    }

    .p-paginator-content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: dt('paginator.gap');
    }

    .p-paginator-content-start {
        margin-inline-end: auto;
    }

    .p-paginator-content-end {
        margin-inline-start: auto;
    }

    .p-paginator-page,
    .p-paginator-next,
    .p-paginator-last,
    .p-paginator-first,
    .p-paginator-prev {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        user-select: none;
        overflow: hidden;
        position: relative;
        background: dt('paginator.nav.button.background');
        border: 0 none;
        color: dt('paginator.nav.button.color');
        min-width: dt('paginator.nav.button.width');
        height: dt('paginator.nav.button.height');
        transition:
            background dt('paginator.transition.duration'),
            color dt('paginator.transition.duration'),
            outline-color dt('paginator.transition.duration'),
            box-shadow dt('paginator.transition.duration');
        border-radius: dt('paginator.nav.button.border.radius');
        padding: 0;
        margin: 0;
    }

    .p-paginator-page:focus-visible,
    .p-paginator-next:focus-visible,
    .p-paginator-last:focus-visible,
    .p-paginator-first:focus-visible,
    .p-paginator-prev:focus-visible {
        box-shadow: dt('paginator.nav.button.focus.ring.shadow');
        outline: dt('paginator.nav.button.focus.ring.width') dt('paginator.nav.button.focus.ring.style') dt('paginator.nav.button.focus.ring.color');
        outline-offset: dt('paginator.nav.button.focus.ring.offset');
    }

    .p-paginator-page:not(.p-disabled):not(.p-paginator-page-selected):hover,
    .p-paginator-first:not(.p-disabled):hover,
    .p-paginator-prev:not(.p-disabled):hover,
    .p-paginator-next:not(.p-disabled):hover,
    .p-paginator-last:not(.p-disabled):hover {
        background: dt('paginator.nav.button.hover.background');
        color: dt('paginator.nav.button.hover.color');
    }

    .p-paginator-page.p-paginator-page-selected {
        background: dt('paginator.nav.button.selected.background');
        color: dt('paginator.nav.button.selected.color');
    }

    .p-paginator-current {
        color: dt('paginator.current.page.report.color');
    }

    .p-paginator-pages {
        display: flex;
        align-items: center;
        gap: dt('paginator.gap');
    }

    .p-paginator-jtp-input .p-inputtext {
        max-width: dt('paginator.jump.to.page.input.max.width');
    }

    .p-paginator-first:dir(rtl),
    .p-paginator-prev:dir(rtl),
    .p-paginator-next:dir(rtl),
    .p-paginator-last:dir(rtl) {
        transform: rotate(180deg);
    }
`;var db=["dropdownicon"],cb=["firstpagelinkicon"],pb=["previouspagelinkicon"],ub=["lastpagelinkicon"],mb=["nextpagelinkicon"],fo=t=>({$implicit:t}),hb=t=>({pageLink:t});function fb(t,r){t&1&&U(0)}function gb(t,r){if(t&1&&(c(0,"div",10),g(1,fb,1,0,"ng-container",11),p()),t&2){let e=d();C(e.cx("contentStart")),s("pBind",e.ptm("contentStart")),l(),s("ngTemplateOutlet",e.templateLeft)("ngTemplateOutletContext",oe(5,fo,e.paginatorState))}}function _b(t,r){if(t&1&&(c(0,"span",10),m(1),p()),t&2){let e=d();C(e.cx("current")),s("pBind",e.ptm("current")),l(),Q(e.currentPageReport)}}function bb(t,r){if(t&1&&(O(),F(0,"svg",14)),t&2){let e=d(2);C(e.cx("firstIcon")),s("pBind",e.ptm("firstIcon"))}}function yb(t,r){}function vb(t,r){t&1&&g(0,yb,0,0,"ng-template")}function xb(t,r){if(t&1&&(c(0,"span"),g(1,vb,1,0,null,15),p()),t&2){let e=d(2);C(e.cx("firstIcon")),l(),s("ngTemplateOutlet",e.firstPageLinkIconTemplate||e._firstPageLinkIconTemplate)}}function Cb(t,r){if(t&1){let e=P();c(0,"button",12),x("click",function(i){_(e);let o=d();return b(o.changePageToFirst(i))}),g(1,bb,1,3,"svg",13)(2,xb,2,3,"span",4),p()}if(t&2){let e=d();C(e.cx("first")),s("pBind",e.ptm("first")),D("aria-label",e.getAriaLabel("firstPageLabel")),l(),s("ngIf",!e.firstPageLinkIconTemplate&&!e._firstPageLinkIconTemplate),l(),s("ngIf",e.firstPageLinkIconTemplate||e._firstPageLinkIconTemplate)}}function wb(t,r){if(t&1&&(O(),F(0,"svg",16)),t&2){let e=d();C(e.cx("prevIcon")),s("pBind",e.ptm("prevIcon"))}}function kb(t,r){}function Tb(t,r){t&1&&g(0,kb,0,0,"ng-template")}function Sb(t,r){if(t&1&&(c(0,"span"),g(1,Tb,1,0,null,15),p()),t&2){let e=d();C(e.cx("prevIcon")),l(),s("ngTemplateOutlet",e.previousPageLinkIconTemplate||e._previousPageLinkIconTemplate)}}function Ib(t,r){if(t&1){let e=P();c(0,"button",12),x("click",function(i){let o=_(e).$implicit,a=d(2);return b(a.onPageLinkClick(i,o-1))}),m(1),p()}if(t&2){let e=r.$implicit,n=d(2);C(n.cx("page",oe(6,hb,e))),s("pBind",n.ptm("page")),D("aria-label",n.getPageAriaLabel(e))("aria-current",e-1==n.getPage()?"page":void 0),l(),$(" ",n.getLocalization(e)," ")}}function Eb(t,r){if(t&1&&(c(0,"span",10),g(1,Ib,2,8,"button",17),p()),t&2){let e=d();C(e.cx("pages")),s("pBind",e.ptm("pages")),l(),s("ngForOf",e.pageLinks)}}function Db(t,r){if(t&1&&m(0),t&2){let e=d(2);Q(e.currentPageReport)}}function Mb(t,r){t&1&&U(0)}function Lb(t,r){if(t&1&&g(0,Mb,1,0,"ng-container",11),t&2){let e=r.$implicit,n=d(3);s("ngTemplateOutlet",n.jumpToPageItemTemplate)("ngTemplateOutletContext",oe(2,fo,e))}}function Pb(t,r){t&1&&(W(0),g(1,Lb,1,4,"ng-template",21),K())}function Fb(t,r){t&1&&U(0)}function Rb(t,r){if(t&1&&g(0,Fb,1,0,"ng-container",15),t&2){let e=d(3);s("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function Bb(t,r){t&1&&g(0,Rb,1,1,"ng-template",22)}function Ob(t,r){if(t&1){let e=P();c(0,"p-select",18),x("onChange",function(i){_(e);let o=d();return b(o.onPageDropdownChange(i))}),g(1,Db,1,1,"ng-template",19)(2,Pb,2,0,"ng-container",20)(3,Bb,1,0,null,20),p()}if(t&2){let e=d();s("options",e.pageItems)("ngModel",e.getPage())("disabled",e.empty())("styleClass",e.cx("pcJumpToPageDropdown"))("appendTo",e.dropdownAppendTo||e.$appendTo())("scrollHeight",e.dropdownScrollHeight)("pt",e.ptm("pcJumpToPageDropdown"))("unstyled",e.unstyled()),D("aria-label",e.getAriaLabel("jumpToPageDropdownLabel")),l(2),s("ngIf",e.jumpToPageItemTemplate),l(),s("ngIf",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function Vb(t,r){if(t&1&&(O(),F(0,"svg",23)),t&2){let e=d();C(e.cx("nextIcon")),s("pBind",e.ptm("nextIcon"))}}function zb(t,r){}function qb(t,r){t&1&&g(0,zb,0,0,"ng-template")}function Ab(t,r){if(t&1&&(c(0,"span"),g(1,qb,1,0,null,15),p()),t&2){let e=d();C(e.cx("nextIcon")),l(),s("ngTemplateOutlet",e.nextPageLinkIconTemplate||e._nextPageLinkIconTemplate)}}function Nb(t,r){if(t&1&&(O(),F(0,"svg",25)),t&2){let e=d(2);C(e.cx("lastIcon")),s("pBind",e.ptm("lastIcon"))}}function Hb(t,r){}function $b(t,r){t&1&&g(0,Hb,0,0,"ng-template")}function jb(t,r){if(t&1&&(c(0,"span"),g(1,$b,1,0,null,15),p()),t&2){let e=d(2);C(e.cx("lastIcon")),l(),s("ngTemplateOutlet",e.lastPageLinkIconTemplate||e._lastPageLinkIconTemplate)}}function Ub(t,r){if(t&1){let e=P();c(0,"button",2),x("click",function(i){_(e);let o=d();return b(o.changePageToLast(i))}),g(1,Nb,1,3,"svg",24)(2,jb,2,3,"span",4),p()}if(t&2){let e=d();C(e.cx("last")),s("pBind",e.ptm("last"))("disabled",e.isLastPage()||e.empty()),D("aria-label",e.getAriaLabel("lastPageLabel")),l(),s("ngIf",!e.lastPageLinkIconTemplate&&!e._lastPageLinkIconTemplate),l(),s("ngIf",e.lastPageLinkIconTemplate||e._lastPageLinkIconTemplate)}}function Qb(t,r){if(t&1){let e=P();c(0,"p-inputnumber",26),x("ngModelChange",function(i){_(e);let o=d();return b(o.changePage(i-1))}),p()}if(t&2){let e=d();C(e.cx("pcJumpToPageInput")),s("pt",e.ptm("pcJumpToPageInput"))("ngModel",e.currentPage())("disabled",e.empty())("unstyled",e.unstyled())}}function Gb(t,r){t&1&&U(0)}function Wb(t,r){if(t&1&&g(0,Gb,1,0,"ng-container",11),t&2){let e=r.$implicit,n=d(3);s("ngTemplateOutlet",n.dropdownItemTemplate)("ngTemplateOutletContext",oe(2,fo,e))}}function Kb(t,r){t&1&&(W(0),g(1,Wb,1,4,"ng-template",21),K())}function Yb(t,r){t&1&&U(0)}function Zb(t,r){if(t&1&&g(0,Yb,1,0,"ng-container",15),t&2){let e=d(3);s("ngTemplateOutlet",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function Xb(t,r){t&1&&g(0,Zb,1,1,"ng-template",22)}function Jb(t,r){if(t&1){let e=P();c(0,"p-select",27),xt("ngModelChange",function(i){_(e);let o=d();return vt(o.rows,i)||(o.rows=i),b(i)}),x("onChange",function(i){_(e);let o=d();return b(o.onRppChange(i))}),g(1,Kb,2,0,"ng-container",20)(2,Xb,1,0,null,20),p()}if(t&2){let e=d();s("options",e.rowsPerPageItems),yt("ngModel",e.rows),s("styleClass",e.cx("pcRowPerPageDropdown"))("disabled",e.empty())("appendTo",e.dropdownAppendTo||e.$appendTo())("scrollHeight",e.dropdownScrollHeight)("ariaLabel",e.getAriaLabel("rowsPerPageLabel"))("pt",e.ptm("pcRowPerPageDropdown"))("unstyled",e.unstyled()),l(),s("ngIf",e.dropdownItemTemplate),l(),s("ngIf",e.dropdownIconTemplate||e._dropdownIconTemplate)}}function e1(t,r){t&1&&U(0)}function t1(t,r){if(t&1&&(c(0,"div",10),g(1,e1,1,0,"ng-container",11),p()),t&2){let e=d();C(e.cx("contentEnd")),s("pBind",e.ptm("contentEnd")),l(),s("ngTemplateOutlet",e.templateRight)("ngTemplateOutletContext",oe(5,fo,e.paginatorState))}}var n1={paginator:({instance:t})=>["p-paginator p-component"],content:"p-paginator-content",contentStart:"p-paginator-content-start",contentEnd:"p-paginator-content-end",first:({instance:t})=>["p-paginator-first",{"p-disabled":t.isFirstPage()||t.empty()}],firstIcon:"p-paginator-first-icon",prev:({instance:t})=>["p-paginator-prev",{"p-disabled":t.isFirstPage()||t.empty()}],prevIcon:"p-paginator-prev-icon",next:({instance:t})=>["p-paginator-next",{"p-disabled":t.isLastPage()||t.empty()}],nextIcon:"p-paginator-next-icon",last:({instance:t})=>["p-paginator-last",{"p-disabled":t.isLastPage()||t.empty()}],lastIcon:"p-paginator-last-icon",pages:"p-paginator-pages",page:({instance:t,pageLink:r})=>["p-paginator-page",{"p-paginator-page-selected":r-1==t.getPage()}],current:"p-paginator-current",pcRowPerPageDropdown:"p-paginator-rpp-dropdown",pcJumpToPageDropdown:"p-paginator-jtp-dropdown",pcJumpToPageInput:"p-paginator-jtp-input"},Vs=(()=>{class t extends fe{name="paginator";style=Os;classes=n1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var zs=new ae("PAGINATOR_INSTANCE"),cr=(()=>{class t extends De{componentName="Paginator";bindDirectiveInstance=v(A,{self:!0});$pcPaginator=v(zs,{optional:!0,skipSelf:!0})??void 0;onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}pageLinkSize=5;styleClass;alwaysShow=!0;dropdownAppendTo;templateLeft;templateRight;dropdownScrollHeight="200px";currentPageReportTemplate="{currentPage} of {totalPages}";showCurrentPageReport;showFirstLastIcon=!0;totalRecords=0;rows=0;rowsPerPageOptions;showJumpToPageDropdown;showJumpToPageInput;jumpToPageItemTemplate;showPageLinks=!0;locale;dropdownItemTemplate;get first(){return this._first}set first(e){this._first=e}appendTo=ee(void 0);onPageChange=new I;dropdownIconTemplate;firstPageLinkIconTemplate;previousPageLinkIconTemplate;lastPageLinkIconTemplate;nextPageLinkIconTemplate;templates;_dropdownIconTemplate;_firstPageLinkIconTemplate;_previousPageLinkIconTemplate;_lastPageLinkIconTemplate;_nextPageLinkIconTemplate;pageLinks;pageItems;rowsPerPageItems;paginatorState;_first=0;_page=0;_componentStyle=v(Vs);$appendTo=J(()=>this.appendTo()||this.config.overlayAppendTo());get display(){return this.alwaysShow||this.pageLinks&&this.pageLinks.length>1?null:"none"}constructor(){super()}onInit(){this.updatePaginatorState()}onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"dropdownicon":this._dropdownIconTemplate=e.template;break;case"firstpagelinkicon":this._firstPageLinkIconTemplate=e.template;break;case"previouspagelinkicon":this._previousPageLinkIconTemplate=e.template;break;case"lastpagelinkicon":this._lastPageLinkIconTemplate=e.template;break;case"nextpagelinkicon":this._nextPageLinkIconTemplate=e.template;break}})}getAriaLabel(e){return this.config.translation.aria?this.config.translation.aria[e]:void 0}getPageAriaLabel(e){return this.config.translation.aria?this.config.translation.aria.pageLabel?.replace(/{page}/g,`${e}`):void 0}getLocalization(e){let n=[...new Intl.NumberFormat(this.locale,{useGrouping:!1}).format(9876543210)].reverse(),i=new Map(n.map((o,a)=>[a,o]));return e>9?String(e).split("").map(a=>i.get(Number(a))).join(""):i.get(e)}onChanges(e){e.totalRecords&&(this.updatePageLinks(),this.updatePaginatorState(),this.updateFirst(),this.updateRowsPerPageOptions()),e.first&&(this._first=e.first.currentValue,this.updatePageLinks(),this.updatePaginatorState()),e.rows&&(this.updatePageLinks(),this.updatePaginatorState()),e.rowsPerPageOptions&&this.updateRowsPerPageOptions(),e.pageLinkSize&&this.updatePageLinks()}updateRowsPerPageOptions(){if(this.rowsPerPageOptions){this.rowsPerPageItems=[];let e=null;for(let n of this.rowsPerPageOptions)typeof n=="object"&&n.showAll?e={label:n.showAll,value:this.totalRecords}:this.rowsPerPageItems.push({label:String(this.getLocalization(n)),value:n});e&&this.rowsPerPageItems.push(e)}}isFirstPage(){return this.getPage()===0}isLastPage(){return this.getPage()===this.getPageCount()-1}getPageCount(){return Math.ceil(this.totalRecords/this.rows)}calculatePageLinkBoundaries(){let e=this.getPageCount(),n=Math.min(this.pageLinkSize,e),i=Math.max(0,Math.ceil(this.getPage()-n/2)),o=Math.min(e-1,i+n-1);var a=this.pageLinkSize-(o-i+1);return i=Math.max(0,i-a),[i,o]}updatePageLinks(){this.pageLinks=[];let e=this.calculatePageLinkBoundaries(),n=e[0],i=e[1];for(let o=n;o<=i;o++)this.pageLinks.push(o+1);if(this.showJumpToPageDropdown){this.pageItems=[];for(let o=0;o<this.getPageCount();o++)this.pageItems.push({label:String(o+1),value:o})}}changePage(e){var n=this.getPageCount();if(e>=0&&e<n){this._first=this.rows*e;var i={page:e,first:this.first,rows:this.rows,pageCount:n};this.updatePageLinks(),this.onPageChange.emit(i),this.updatePaginatorState()}}updateFirst(){let e=this.getPage();e>0&&this.totalRecords&&this.first>=this.totalRecords&&Promise.resolve(null).then(()=>this.changePage(e-1))}getPage(){return Math.floor(this.first/this.rows)}changePageToFirst(e){this.isFirstPage()||this.changePage(0),e.preventDefault()}changePageToPrev(e){this.changePage(this.getPage()-1),e.preventDefault()}changePageToNext(e){this.changePage(this.getPage()+1),e.preventDefault()}changePageToLast(e){this.isLastPage()||this.changePage(this.getPageCount()-1),e.preventDefault()}onPageLinkClick(e,n){this.changePage(n),e.preventDefault()}onRppChange(e){this.changePage(this.getPage())}onPageDropdownChange(e){this.changePage(e.value)}updatePaginatorState(){this.paginatorState={page:this.getPage(),pageCount:this.getPageCount(),rows:this.rows,first:this.first,totalRecords:this.totalRecords}}empty(){return this.getPageCount()===0}currentPage(){return this.getPageCount()>0?this.getPage()+1:0}get currentPageReport(){return this.currentPageReportTemplate.replace("{currentPage}",String(this.currentPage())).replace("{totalPages}",String(this.getPageCount())).replace("{first}",String(this.totalRecords>0?this._first+1:0)).replace("{last}",String(Math.min(this._first+this.rows,this.totalRecords))).replace("{rows}",String(this.rows)).replace("{totalRecords}",String(this.totalRecords))}static \u0275fac=function(n){return new(n||t)};static \u0275cmp=E({type:t,selectors:[["p-paginator"]],contentQueries:function(n,i,o){if(n&1&&Re(o,db,4)(o,cb,4)(o,pb,4)(o,ub,4)(o,mb,4)(o,Me,4),n&2){let a;k(a=T())&&(i.dropdownIconTemplate=a.first),k(a=T())&&(i.firstPageLinkIconTemplate=a.first),k(a=T())&&(i.previousPageLinkIconTemplate=a.first),k(a=T())&&(i.lastPageLinkIconTemplate=a.first),k(a=T())&&(i.nextPageLinkIconTemplate=a.first),k(a=T())&&(i.templates=a)}},hostVars:4,hostBindings:function(n,i){n&2&&(C(i.cn(i.cx("paginator"),i.styleClass)),je("display",i.display))},inputs:{pageLinkSize:[2,"pageLinkSize","pageLinkSize",se],styleClass:"styleClass",alwaysShow:[2,"alwaysShow","alwaysShow",w],dropdownAppendTo:"dropdownAppendTo",templateLeft:"templateLeft",templateRight:"templateRight",dropdownScrollHeight:"dropdownScrollHeight",currentPageReportTemplate:"currentPageReportTemplate",showCurrentPageReport:[2,"showCurrentPageReport","showCurrentPageReport",w],showFirstLastIcon:[2,"showFirstLastIcon","showFirstLastIcon",w],totalRecords:[2,"totalRecords","totalRecords",se],rows:[2,"rows","rows",se],rowsPerPageOptions:"rowsPerPageOptions",showJumpToPageDropdown:[2,"showJumpToPageDropdown","showJumpToPageDropdown",w],showJumpToPageInput:[2,"showJumpToPageInput","showJumpToPageInput",w],jumpToPageItemTemplate:"jumpToPageItemTemplate",showPageLinks:[2,"showPageLinks","showPageLinks",w],locale:"locale",dropdownItemTemplate:"dropdownItemTemplate",first:"first",appendTo:[1,"appendTo"]},outputs:{onPageChange:"onPageChange"},features:[le([Vs,{provide:zs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:15,vars:23,consts:[[3,"pBind","class",4,"ngIf"],["type","button","pRipple","",3,"pBind","class","click",4,"ngIf"],["type","button","pRipple","",3,"click","pBind","disabled"],["data-p-icon","angle-left",3,"pBind","class",4,"ngIf"],[3,"class",4,"ngIf"],[3,"options","ngModel","disabled","styleClass","appendTo","scrollHeight","pt","unstyled","onChange",4,"ngIf"],["data-p-icon","angle-right",3,"pBind","class",4,"ngIf"],["type","button","pRipple","",3,"pBind","disabled","class","click",4,"ngIf"],[3,"pt","ngModel","class","disabled","unstyled","ngModelChange",4,"ngIf"],[3,"options","ngModel","styleClass","disabled","appendTo","scrollHeight","ariaLabel","pt","unstyled","ngModelChange","onChange",4,"ngIf"],[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["type","button","pRipple","",3,"click","pBind"],["data-p-icon","angle-double-left",3,"pBind","class",4,"ngIf"],["data-p-icon","angle-double-left",3,"pBind"],[4,"ngTemplateOutlet"],["data-p-icon","angle-left",3,"pBind"],["type","button","pRipple","",3,"pBind","class","click",4,"ngFor","ngForOf"],[3,"onChange","options","ngModel","disabled","styleClass","appendTo","scrollHeight","pt","unstyled"],["pTemplate","selectedItem"],[4,"ngIf"],["pTemplate","item"],["pTemplate","dropdownicon"],["data-p-icon","angle-right",3,"pBind"],["data-p-icon","angle-double-right",3,"pBind","class",4,"ngIf"],["data-p-icon","angle-double-right",3,"pBind"],[3,"ngModelChange","pt","ngModel","disabled","unstyled"],[3,"ngModelChange","onChange","options","ngModel","styleClass","disabled","appendTo","scrollHeight","ariaLabel","pt","unstyled"]],template:function(n,i){n&1&&(g(0,gb,2,7,"div",0)(1,_b,2,4,"span",0)(2,Cb,3,6,"button",1),c(3,"button",2),x("click",function(a){return i.changePageToPrev(a)}),g(4,wb,1,3,"svg",3)(5,Sb,2,3,"span",4),p(),g(6,Eb,2,4,"span",0)(7,Ob,4,11,"p-select",5),c(8,"button",2),x("click",function(a){return i.changePageToNext(a)}),g(9,Vb,1,3,"svg",6)(10,Ab,2,3,"span",4),p(),g(11,Ub,3,7,"button",7)(12,Qb,1,6,"p-inputnumber",8)(13,Jb,3,11,"p-select",9)(14,t1,2,7,"div",0)),n&2&&(s("ngIf",i.templateLeft),l(),s("ngIf",i.showCurrentPageReport),l(),s("ngIf",i.showFirstLastIcon),l(),C(i.cx("prev")),s("pBind",i.ptm("prev"))("disabled",i.isFirstPage()||i.empty()),D("aria-label",i.getAriaLabel("prevPageLabel")),l(),s("ngIf",!i.previousPageLinkIconTemplate&&!i._previousPageLinkIconTemplate),l(),s("ngIf",i.previousPageLinkIconTemplate||i._previousPageLinkIconTemplate),l(),s("ngIf",i.showPageLinks),l(),s("ngIf",i.showJumpToPageDropdown),l(),C(i.cx("next")),s("pBind",i.ptm("next"))("disabled",i.isLastPage()||i.empty()),D("aria-label",i.getAriaLabel("nextPageLabel")),l(),s("ngIf",!i.nextPageLinkIconTemplate&&!i._nextPageLinkIconTemplate),l(),s("ngIf",i.nextPageLinkIconTemplate||i._nextPageLinkIconTemplate),l(),s("ngIf",i.showFirstLastIcon),l(),s("ngIf",i.showJumpToPageInput),l(),s("ngIf",i.rowsPerPageOptions),l(),s("ngIf",i.templateRight))},dependencies:[te,jt,ze,Le,ho,uo,tt,et,st,Jt,tl,nl,ol,rl,ie,Me,A],encapsulation:2,changeDetection:0})}return t})(),qs=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[cr,ie,ie]})}return t})();var As=`
    .p-radiobutton {
        position: relative;
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
    }

    .p-radiobutton-input {
        cursor: pointer;
        appearance: none;
        position: absolute;
        top: 0;
        inset-inline-start: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        opacity: 0;
        z-index: 1;
        outline: 0 none;
        border: 1px solid transparent;
        border-radius: 50%;
    }

    .p-radiobutton-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        border: 1px solid dt('radiobutton.border.color');
        background: dt('radiobutton.background');
        width: dt('radiobutton.width');
        height: dt('radiobutton.height');
        transition:
            background dt('radiobutton.transition.duration'),
            color dt('radiobutton.transition.duration'),
            border-color dt('radiobutton.transition.duration'),
            box-shadow dt('radiobutton.transition.duration'),
            outline-color dt('radiobutton.transition.duration');
        outline-color: transparent;
        box-shadow: dt('radiobutton.shadow');
    }

    .p-radiobutton-icon {
        transition-duration: dt('radiobutton.transition.duration');
        background: transparent;
        font-size: dt('radiobutton.icon.size');
        width: dt('radiobutton.icon.size');
        height: dt('radiobutton.icon.size');
        border-radius: 50%;
        backface-visibility: hidden;
        transform: translateZ(0) scale(0.1);
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.hover.border.color');
    }

    .p-radiobutton-checked .p-radiobutton-box {
        border-color: dt('radiobutton.checked.border.color');
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.color');
        transform: translateZ(0) scale(1, 1);
        visibility: visible;
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:hover) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.hover.border.color');
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.checked.hover.color');
    }

    .p-radiobutton:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.focus.border.color');
        box-shadow: dt('radiobutton.focus.ring.shadow');
        outline: dt('radiobutton.focus.ring.width') dt('radiobutton.focus.ring.style') dt('radiobutton.focus.ring.color');
        outline-offset: dt('radiobutton.focus.ring.offset');
    }

    .p-radiobutton-checked:not(.p-disabled):has(.p-radiobutton-input:focus-visible) .p-radiobutton-box {
        border-color: dt('radiobutton.checked.focus.border.color');
    }

    .p-radiobutton.p-invalid > .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }

    .p-radiobutton.p-variant-filled .p-radiobutton-box {
        background: dt('radiobutton.filled.background');
    }

    .p-radiobutton.p-variant-filled.p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.background');
    }

    .p-radiobutton.p-variant-filled:not(.p-disabled):has(.p-radiobutton-input:hover).p-radiobutton-checked .p-radiobutton-box {
        background: dt('radiobutton.checked.hover.background');
    }

    .p-radiobutton.p-disabled {
        opacity: 1;
    }

    .p-radiobutton.p-disabled .p-radiobutton-box {
        background: dt('radiobutton.disabled.background');
        border-color: dt('radiobutton.checked.disabled.border.color');
    }

    .p-radiobutton-checked.p-disabled .p-radiobutton-box .p-radiobutton-icon {
        background: dt('radiobutton.icon.disabled.color');
    }

    .p-radiobutton-sm,
    .p-radiobutton-sm .p-radiobutton-box {
        width: dt('radiobutton.sm.width');
        height: dt('radiobutton.sm.height');
    }

    .p-radiobutton-sm .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.sm.size');
        width: dt('radiobutton.icon.sm.size');
        height: dt('radiobutton.icon.sm.size');
    }

    .p-radiobutton-lg,
    .p-radiobutton-lg .p-radiobutton-box {
        width: dt('radiobutton.lg.width');
        height: dt('radiobutton.lg.height');
    }

    .p-radiobutton-lg .p-radiobutton-icon {
        font-size: dt('radiobutton.icon.lg.size');
        width: dt('radiobutton.icon.lg.size');
        height: dt('radiobutton.icon.lg.size');
    }
`;var o1=["input"],r1=`
    ${As}

    /* For PrimeNG */
    p-radioButton.ng-invalid.ng-dirty .p-radiobutton-box,
    p-radio-button.ng-invalid.ng-dirty .p-radiobutton-box,
    p-radiobutton.ng-invalid.ng-dirty .p-radiobutton-box {
        border-color: dt('radiobutton.invalid.border.color');
    }
`,a1={root:({instance:t})=>["p-radiobutton p-component",{"p-radiobutton-checked":t.checked,"p-disabled":t.$disabled(),"p-invalid":t.invalid(),"p-variant-filled":t.$variant()==="filled","p-radiobutton-sm p-inputfield-sm":t.size()==="small","p-radiobutton-lg p-inputfield-lg":t.size()==="large"}],box:"p-radiobutton-box",input:"p-radiobutton-input",icon:"p-radiobutton-icon"},Ns=(()=>{class t extends fe{name="radiobutton";style=r1;classes=a1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Hs=new ae("RADIOBUTTON_INSTANCE"),l1={provide:lt,useExisting:ot(()=>$s),multi:!0},s1=(()=>{class t{accessors=[];add(e,n){this.accessors.push([e,n])}remove(e){this.accessors=this.accessors.filter(n=>n[1]!==e)}select(e){this.accessors.forEach(n=>{this.isSameGroup(n,e)&&n[1]!==e&&n[1].writeValue(e.value)})}isSameGroup(e,n){return e[0].control?e[0].control.root===n.control.control.root&&e[1].name()===n.name():!1}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac,providedIn:"root"})}return t})(),$s=(()=>{class t extends Lt{componentName="RadioButton";$pcRadioButton=v(Hs,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}value;tabindex;inputId;ariaLabelledBy;ariaLabel;styleClass;autofocus;binary;variant=ee();size=ee();onClick=new I;onFocus=new I;onBlur=new I;inputViewChild;$variant=J(()=>this.variant()||this.config.inputStyle()||this.config.inputVariant());checked;focused;control;_componentStyle=v(Ns);injector=v(Bt);registry=v(s1);onInit(){this.control=this.injector.get(hn),this.registry.add(this.control,this)}onChange(e){this.$disabled()||this.select(e)}select(e){this.$disabled()||(this.checked=!0,this.writeModelValue(this.checked),this.onModelChange(this.value),this.registry.select(this),this.onClick.emit({originalEvent:e,value:this.value}))}onInputFocus(e){this.focused=!0,this.onFocus.emit(e)}onInputBlur(e){this.focused=!1,this.onModelTouched(),this.onBlur.emit(e)}focus(){this.inputViewChild.nativeElement.focus()}writeControlValue(e,n){this.checked=this.binary?!!e:e==this.value,n(this.checked),this.cd.markForCheck()}onDestroy(){this.registry.remove(this)}get dataP(){return this.cn({invalid:this.invalid(),checked:this.checked,disabled:this.$disabled(),filled:this.$variant()==="filled",[this.size()]:this.size()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-radioButton"],["p-radiobutton"],["p-radio-button"]],viewQuery:function(n,i){if(n&1&&We(o1,5),n&2){let o;k(o=T())&&(i.inputViewChild=o.first)}},hostVars:5,hostBindings:function(n,i){n&2&&(D("data-p-disabled",i.$disabled())("data-p-checked",i.checked)("data-p",i.dataP),C(i.cx("root")))},inputs:{value:"value",tabindex:[2,"tabindex","tabindex",se],inputId:"inputId",ariaLabelledBy:"ariaLabelledBy",ariaLabel:"ariaLabel",styleClass:"styleClass",autofocus:[2,"autofocus","autofocus",w],binary:[2,"binary","binary",w],variant:[1,"variant"],size:[1,"size"]},outputs:{onClick:"onClick",onFocus:"onFocus",onBlur:"onBlur"},features:[le([l1,Ns,{provide:Hs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:4,vars:20,consts:[["input",""],["type","radio",3,"focus","blur","change","checked","pAutoFocus","pBind"],[3,"pBind"]],template:function(n,i){n&1&&(c(0,"input",1,0),x("focus",function(a){return i.onInputFocus(a)})("blur",function(a){return i.onInputBlur(a)})("change",function(a){return i.onChange(a)}),p(),c(2,"div",2),F(3,"div",2),p()),n&2&&(C(i.cx("input")),s("checked",i.checked)("pAutoFocus",i.autofocus)("pBind",i.ptm("input")),D("id",i.inputId)("name",i.name())("required",i.required()?"":void 0)("disabled",i.$disabled()?"":void 0)("value",i.modelValue())("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-checked",i.checked)("tabindex",i.tabindex),l(2),C(i.cx("box")),s("pBind",i.ptm("box")),l(),C(i.cx("icon")),s("pBind",i.ptm("icon")))},dependencies:[te,Xt,ie,Ve,A],encapsulation:2,changeDetection:0})}return t})(),js=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[$s,ie,ie]})}return t})();var Us=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var d1=["icon"],c1=["content"],Ws=t=>({$implicit:t});function p1(t,r){t&1&&U(0)}function u1(t,r){if(t&1&&F(0,"span",0),t&2){let e=d(3);C(e.cn(e.cx("icon"),e.checked?e.onIcon:e.offIcon,e.iconPos==="left"?e.cx("iconLeft"):e.cx("iconRight"))),s("pBind",e.ptm("icon"))}}function m1(t,r){if(t&1&&V(0,u1,1,3,"span",2),t&2){let e=d(2);z(e.onIcon||e.offIcon?0:-1)}}function h1(t,r){t&1&&U(0)}function f1(t,r){if(t&1&&g(0,h1,1,0,"ng-container",1),t&2){let e=d(2);s("ngTemplateOutlet",e.iconTemplate||e._iconTemplate)("ngTemplateOutletContext",oe(2,Ws,e.checked))}}function g1(t,r){if(t&1&&(V(0,m1,1,1)(1,f1,1,4,"ng-container"),c(2,"span",0),m(3),p()),t&2){let e=d();z(e.iconTemplate?1:0),l(2),C(e.cx("label")),s("pBind",e.ptm("label")),l(),Q(e.checked?e.hasOnLabel?e.onLabel:"\xA0":e.hasOffLabel?e.offLabel:"\xA0")}}var _1=`
    ${Us}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,b1={root:({instance:t})=>["p-togglebutton p-component",{"p-togglebutton-checked":t.checked,"p-invalid":t.invalid(),"p-disabled":t.$disabled(),"p-togglebutton-sm p-inputfield-sm":t.size==="small","p-togglebutton-lg p-inputfield-lg":t.size==="large","p-togglebutton-fluid":t.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},Qs=(()=>{class t extends fe{name="togglebutton";style=_1;classes=b1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Gs=new ae("TOGGLEBUTTON_INSTANCE"),y1={provide:lt,useExisting:ot(()=>pr),multi:!0},pr=(()=>{class t extends Lt{componentName="ToggleButton";$pcToggleButton=v(Gs,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onKeyDown(e){switch(e.code){case"Enter":this.toggle(e),e.preventDefault();break;case"Space":this.toggle(e),e.preventDefault();break}}toggle(e){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:e,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=ee(void 0,{transform:w});onChange=new I;iconTemplate;contentTemplate;templates;checked=!1;onInit(){(this.checked===null||this.checked===void 0)&&(this.checked=!1)}_componentStyle=v(Qs);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.offLabel&&this.offLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;onAfterContentInit(){this.templates.forEach(e=>{switch(e.getType()){case"icon":this._iconTemplate=e.template;break;case"content":this._contentTemplate=e.template;break;default:this._contentTemplate=e.template;break}})}writeControlValue(e,n){this.checked=e,n(e),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.active,invalid:this.invalid(),[this.size]:this.size})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(n,i,o){if(n&1&&Re(o,d1,4)(o,c1,4)(o,Me,4),n&2){let a;k(a=T())&&(i.iconTemplate=a.first),k(a=T())&&(i.contentTemplate=a.first),k(a=T())&&(i.templates=a)}},hostVars:11,hostBindings:function(n,i){n&1&&x("keydown",function(a){return i.onKeyDown(a)})("click",function(a){return i.toggle(a)}),n&2&&(D("aria-labelledby",i.ariaLabelledBy)("aria-label",i.ariaLabel)("aria-pressed",i.checked?"true":"false")("role","button")("tabindex",i.tabindex!==void 0?i.tabindex:i.$disabled()?-1:0)("data-pc-name","togglebutton")("data-p-checked",i.active)("data-p-disabled",i.$disabled())("data-p",i.dataP),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",se],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",w],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[le([y1,Qs,{provide:Gs,useExisting:t},{provide:be,useExisting:t}]),we([Jt,A]),L],decls:3,vars:9,consts:[[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","pBind"]],template:function(n,i){n&1&&(c(0,"span",0),g(1,p1,1,0,"ng-container",1),V(2,g1,4,5),p()),n&2&&(C(i.cx("content")),s("pBind",i.ptm("content")),D("data-p",i.dataP),l(),s("ngTemplateOutlet",i.contentTemplate||i._contentTemplate)("ngTemplateOutletContext",oe(7,Ws,i.checked)),l(),z(i.contentTemplate?-1:2))},dependencies:[te,Le,ie,Ve,A],encapsulation:2,changeDetection:0})}return t})();var Ks=`
    .p-selectbutton {
        display: inline-flex;
        user-select: none;
        vertical-align: bottom;
        outline-color: transparent;
        border-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton {
        border-radius: 0;
        border-width: 1px 1px 1px 0;
    }

    .p-selectbutton .p-togglebutton:focus-visible {
        position: relative;
        z-index: 1;
    }

    .p-selectbutton .p-togglebutton:first-child {
        border-inline-start-width: 1px;
        border-start-start-radius: dt('selectbutton.border.radius');
        border-end-start-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton .p-togglebutton:last-child {
        border-start-end-radius: dt('selectbutton.border.radius');
        border-end-end-radius: dt('selectbutton.border.radius');
    }

    .p-selectbutton.p-invalid {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }

    .p-selectbutton-fluid {
        width: 100%;
    }
    
    .p-selectbutton-fluid .p-togglebutton {
        flex: 1 1 0;
    }
`;var v1=["item"],x1=(t,r)=>({$implicit:t,index:r});function C1(t,r){return this.getOptionLabel(r)}function w1(t,r){t&1&&U(0)}function k1(t,r){if(t&1&&g(0,w1,1,0,"ng-container",3),t&2){let e=d(2),n=e.$implicit,i=e.$index,o=d();s("ngTemplateOutlet",o.itemTemplate||o._itemTemplate)("ngTemplateOutletContext",Pe(2,x1,n,i))}}function T1(t,r){t&1&&g(0,k1,1,5,"ng-template",null,0,Ie)}function S1(t,r){if(t&1){let e=P();c(0,"p-togglebutton",2),x("onChange",function(i){let o=_(e),a=o.$implicit,u=o.$index,h=d();return b(h.onOptionSelect(i,a,u))}),V(1,T1,2,0),p()}if(t&2){let e=r.$implicit,n=d();s("autofocus",n.autofocus)("styleClass",n.styleClass)("ngModel",n.isSelected(e))("onLabel",n.getOptionLabel(e))("offLabel",n.getOptionLabel(e))("disabled",n.$disabled()||n.isOptionDisabled(e))("allowEmpty",n.getAllowEmpty())("size",n.size())("fluid",n.fluid())("pt",n.ptm("pcToggleButton"))("unstyled",n.unstyled()),l(),z(n.itemTemplate||n._itemTemplate?1:-1)}}var I1=`
    ${Ks}

    /* For PrimeNG */
    .p-selectbutton.ng-invalid.ng-dirty {
        outline: 1px solid dt('selectbutton.invalid.border.color');
        outline-offset: 0;
    }
`,E1={root:({instance:t})=>["p-selectbutton p-component",{"p-invalid":t.invalid(),"p-selectbutton-fluid":t.fluid()}]},Ys=(()=>{class t extends fe{name="selectbutton";style=I1;classes=E1;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var Zs=new ae("SELECTBUTTON_INSTANCE"),D1={provide:lt,useExisting:ot(()=>Xs),multi:!0},Xs=(()=>{class t extends Lt{componentName="SelectButton";options;optionLabel;optionValue;optionDisabled;get unselectable(){return this._unselectable}_unselectable=!1;set unselectable(e){this._unselectable=e,this.allowEmpty=!e}tabindex=0;multiple;allowEmpty=!0;styleClass;ariaLabelledBy;dataKey;autofocus;size=ee();fluid=ee(void 0,{transform:w});onOptionClick=new I;onChange=new I;itemTemplate;_itemTemplate;get equalityKey(){return this.optionValue?null:this.dataKey}value;focusedIndex=0;_componentStyle=v(Ys);$pcSelectButton=v(Zs,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}getAllowEmpty(){return this.multiple?this.allowEmpty||this.value?.length!==1:this.allowEmpty}getOptionLabel(e){return this.optionLabel?Kt(e,this.optionLabel):e.label!=null?e.label:e}getOptionValue(e){return this.optionValue?Kt(e,this.optionValue):this.optionLabel||e.value===void 0?e:e.value}isOptionDisabled(e){return this.optionDisabled?Kt(e,this.optionDisabled):e.disabled!==void 0?e.disabled:!1}onOptionSelect(e,n,i){if(this.$disabled()||this.isOptionDisabled(n))return;let o=this.isSelected(n);if(o&&this.unselectable)return;let a=this.getOptionValue(n),u;if(this.multiple)o?u=this.value.filter(h=>!on(h,a,this.equalityKey||void 0)):u=this.value?[...this.value,a]:[a];else{if(o&&!this.allowEmpty)return;u=o?null:a}this.focusedIndex=i,this.value=u,this.writeModelValue(this.value),this.onModelChange(this.value),this.onChange.emit({originalEvent:e,value:this.value}),this.onOptionClick.emit({originalEvent:e,option:n,index:i})}changeTabIndexes(e,n){let i,o;for(let a=0;a<=this.el.nativeElement.children.length-1;a++)this.el.nativeElement.children[a].getAttribute("tabindex")==="0"&&(i={elem:this.el.nativeElement.children[a],index:a});n==="prev"?i.index===0?o=this.el.nativeElement.children.length-1:o=i.index-1:i.index===this.el.nativeElement.children.length-1?o=0:o=i.index+1,this.focusedIndex=o,this.el.nativeElement.children[o].focus()}onFocus(e,n){this.focusedIndex=n}onBlur(){this.onModelTouched()}removeOption(e){this.value=this.value.filter(n=>!on(n,this.getOptionValue(e),this.dataKey))}isSelected(e){let n=!1,i=this.getOptionValue(e);if(this.multiple){if(this.value&&Array.isArray(this.value)){for(let o of this.value)if(on(o,i,this.dataKey)){n=!0;break}}}else n=on(this.getOptionValue(e),this.value,this.equalityKey||void 0);return n}templates;onAfterContentInit(){this.templates.forEach(e=>{e.getType()==="item"&&(this._itemTemplate=e.template)})}writeControlValue(e,n){this.value=e,n(this.value),this.cd.markForCheck()}get dataP(){return this.cn({invalid:this.invalid()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-selectButton"],["p-selectbutton"],["p-select-button"]],contentQueries:function(n,i,o){if(n&1&&Re(o,v1,4)(o,Me,4),n&2){let a;k(a=T())&&(i.itemTemplate=a.first),k(a=T())&&(i.templates=a)}},hostVars:5,hostBindings:function(n,i){n&2&&(D("role","group")("aria-labelledby",i.ariaLabelledBy)("data-p",i.dataP),C(i.cx("root")))},inputs:{options:"options",optionLabel:"optionLabel",optionValue:"optionValue",optionDisabled:"optionDisabled",unselectable:[2,"unselectable","unselectable",w],tabindex:[2,"tabindex","tabindex",se],multiple:[2,"multiple","multiple",w],allowEmpty:[2,"allowEmpty","allowEmpty",w],styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy",dataKey:"dataKey",autofocus:[2,"autofocus","autofocus",w],size:[1,"size"],fluid:[1,"fluid"]},outputs:{onOptionClick:"onOptionClick",onChange:"onChange"},features:[le([D1,Ys,{provide:Zs,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:2,vars:0,consts:[["content",""],[3,"autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[3,"onChange","autofocus","styleClass","ngModel","onLabel","offLabel","disabled","allowEmpty","size","fluid","pt","unstyled"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&me(0,S1,2,12,"p-togglebutton",1,C1,!0),n&2&&he(i.options)},dependencies:[pr,tt,et,st,te,Le,ie,Ve],encapsulation:2,changeDetection:0})}return t})(),Js=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({imports:[Xs,ie,ie]})}return t})();var M1=["header"],L1=["headergrouped"],P1=["body"],F1=["loadingbody"],R1=["caption"],B1=["footer"],O1=["footergrouped"],V1=["summary"],z1=["colgroup"],q1=["expandedrow"],A1=["groupheader"],N1=["groupfooter"],H1=["frozenexpandedrow"],$1=["frozenheader"],j1=["frozenbody"],U1=["frozenfooter"],Q1=["frozencolgroup"],G1=["emptymessage"],W1=["paginatorleft"],K1=["paginatorright"],Y1=["paginatordropdownitem"],Z1=["loadingicon"],X1=["reorderindicatorupicon"],J1=["reorderindicatordownicon"],ey=["sorticon"],ty=["checkboxicon"],ny=["headercheckboxicon"],iy=["paginatordropdownicon"],oy=["paginatorfirstpagelinkicon"],ry=["paginatorlastpagelinkicon"],ay=["paginatorpreviouspagelinkicon"],ly=["paginatornextpagelinkicon"],sy=["resizeHelper"],dy=["reorderIndicatorUp"],cy=["reorderIndicatorDown"],py=["wrapper"],uy=["table"],my=["thead"],hy=["tfoot"],fy=["scroller"],gy=t=>({height:t}),ed=(t,r)=>({$implicit:t,options:r}),_y=t=>({columns:t}),ur=t=>({$implicit:t});function by(t,r){if(t&1&&F(0,"i",17),t&2){let e=d(2);C(e.cn(e.cx("loadingIcon"),e.loadingIcon)),s("pBind",e.ptm("loadingIcon"))}}function yy(t,r){if(t&1&&(O(),F(0,"svg",19)),t&2){let e=d(3);C(e.cx("loadingIcon")),s("spin",!0)("pBind",e.ptm("loadingIcon"))}}function vy(t,r){}function xy(t,r){t&1&&g(0,vy,0,0,"ng-template")}function Cy(t,r){if(t&1&&(c(0,"span",17),g(1,xy,1,0,null,20),p()),t&2){let e=d(3);C(e.cx("loadingIcon")),s("pBind",e.ptm("loadingIcon")),l(),s("ngTemplateOutlet",e.loadingIconTemplate||e._loadingIconTemplate)}}function wy(t,r){if(t&1&&(W(0),g(1,yy,1,4,"svg",18)(2,Cy,2,4,"span",10),K()),t&2){let e=d(2);l(),s("ngIf",!e.loadingIconTemplate&&!e._loadingIconTemplate),l(),s("ngIf",e.loadingIconTemplate||e._loadingIconTemplate)}}function ky(t,r){if(t&1&&(c(0,"div",17),Sr("p-overlay-mask-leave-active"),Tr("p-overlay-mask-enter-active"),g(1,by,1,3,"i",10)(2,wy,3,2,"ng-container",14),p()),t&2){let e=d();C(e.cx("mask")),s("pBind",e.ptm("mask")),l(),s("ngIf",e.loadingIcon),l(),s("ngIf",!e.loadingIcon)}}function Ty(t,r){t&1&&U(0)}function Sy(t,r){if(t&1&&(c(0,"div",17),g(1,Ty,1,0,"ng-container",20),p()),t&2){let e=d();C(e.cx("header")),s("pBind",e.ptm("header")),l(),s("ngTemplateOutlet",e.captionTemplate||e._captionTemplate)}}function Iy(t,r){t&1&&U(0)}function Ey(t,r){if(t&1&&g(0,Iy,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorDropdownIconTemplate||e._paginatorDropdownIconTemplate)}}function Dy(t,r){t&1&&g(0,Ey,1,1,"ng-template",22)}function My(t,r){t&1&&U(0)}function Ly(t,r){if(t&1&&g(0,My,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorFirstPageLinkIconTemplate||e._paginatorFirstPageLinkIconTemplate)}}function Py(t,r){t&1&&g(0,Ly,1,1,"ng-template",23)}function Fy(t,r){t&1&&U(0)}function Ry(t,r){if(t&1&&g(0,Fy,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorPreviousPageLinkIconTemplate||e._paginatorPreviousPageLinkIconTemplate)}}function By(t,r){t&1&&g(0,Ry,1,1,"ng-template",24)}function Oy(t,r){t&1&&U(0)}function Vy(t,r){if(t&1&&g(0,Oy,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorLastPageLinkIconTemplate||e._paginatorLastPageLinkIconTemplate)}}function zy(t,r){t&1&&g(0,Vy,1,1,"ng-template",25)}function qy(t,r){t&1&&U(0)}function Ay(t,r){if(t&1&&g(0,qy,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorNextPageLinkIconTemplate||e._paginatorNextPageLinkIconTemplate)}}function Ny(t,r){t&1&&g(0,Ay,1,1,"ng-template",26)}function Hy(t,r){if(t&1){let e=P();c(0,"p-paginator",21),x("onPageChange",function(i){_(e);let o=d();return b(o.onPageChange(i))}),g(1,Dy,1,0,null,14)(2,Py,1,0,null,14)(3,By,1,0,null,14)(4,zy,1,0,null,14)(5,Ny,1,0,null,14),p()}if(t&2){let e=d();s("rows",e.rows)("first",e.first)("totalRecords",e.totalRecords)("pageLinkSize",e.pageLinks)("alwaysShow",e.alwaysShowPaginator)("rowsPerPageOptions",e.rowsPerPageOptions)("templateLeft",e.paginatorLeftTemplate||e._paginatorLeftTemplate)("templateRight",e.paginatorRightTemplate||e._paginatorRightTemplate)("appendTo",e.paginatorDropdownAppendTo)("dropdownScrollHeight",e.paginatorDropdownScrollHeight)("currentPageReportTemplate",e.currentPageReportTemplate)("showFirstLastIcon",e.showFirstLastIcon)("dropdownItemTemplate",e.paginatorDropdownItemTemplate||e._paginatorDropdownItemTemplate)("showCurrentPageReport",e.showCurrentPageReport)("showJumpToPageDropdown",e.showJumpToPageDropdown)("showJumpToPageInput",e.showJumpToPageInput)("showPageLinks",e.showPageLinks)("styleClass",e.cx("pcPaginator")+" "+e.paginatorStyleClass&&e.paginatorStyleClass)("locale",e.paginatorLocale)("pt",e.ptm("pcPaginator"))("unstyled",e.unstyled()),l(),s("ngIf",e.paginatorDropdownIconTemplate||e._paginatorDropdownIconTemplate),l(),s("ngIf",e.paginatorFirstPageLinkIconTemplate||e._paginatorFirstPageLinkIconTemplate),l(),s("ngIf",e.paginatorPreviousPageLinkIconTemplate||e._paginatorPreviousPageLinkIconTemplate),l(),s("ngIf",e.paginatorLastPageLinkIconTemplate||e._paginatorLastPageLinkIconTemplate),l(),s("ngIf",e.paginatorNextPageLinkIconTemplate||e._paginatorNextPageLinkIconTemplate)}}function $y(t,r){t&1&&U(0)}function jy(t,r){if(t&1&&g(0,$y,1,0,"ng-container",28),t&2){let e=r.$implicit,n=r.options;d(2);let i=Se(8);s("ngTemplateOutlet",i)("ngTemplateOutletContext",Pe(2,ed,e,n))}}function Uy(t,r){if(t&1){let e=P();c(0,"p-scroller",27,2),x("onLazyLoad",function(i){_(e);let o=d();return b(o.onLazyItemLoad(i))}),g(2,jy,1,5,"ng-template",null,3,Ie),p()}if(t&2){let e=d();Ae(oe(16,gy,e.scrollHeight!=="flex"?e.scrollHeight:void 0)),s("items",e.processedData)("columns",e.columns)("scrollHeight",e.scrollHeight!=="flex"?void 0:"100%")("itemSize",e.virtualScrollItemSize)("step",e.rows)("delay",e.lazy?e.virtualScrollDelay:0)("inline",!0)("autoSize",!0)("lazy",e.lazy)("loaderDisabled",!0)("showSpacer",!1)("showLoader",e.loadingBodyTemplate||e._loadingBodyTemplate)("options",e.virtualScrollOptions)("pt",e.ptm("virtualScroller"))}}function Qy(t,r){t&1&&U(0)}function Gy(t,r){if(t&1&&(W(0),g(1,Qy,1,0,"ng-container",28),K()),t&2){let e=d(),n=Se(8);l(),s("ngTemplateOutlet",n)("ngTemplateOutletContext",Pe(4,ed,e.processedData,oe(2,_y,e.columns)))}}function Wy(t,r){t&1&&U(0)}function Ky(t,r){t&1&&U(0)}function Yy(t,r){if(t&1&&F(0,"tbody",35),t&2){let e=d().options,n=d();C(n.cx("tbody")),s("pBind",n.ptm("tbody"))("value",n.frozenValue)("frozenRows",!0)("pTableBody",e.columns)("pTableBodyTemplate",n.frozenBodyTemplate||n._frozenBodyTemplate)("unstyled",n.unstyled())("frozen",!0),D("data-p-virtualscroll",n.virtualScroll)}}function Zy(t,r){if(t&1&&F(0,"tbody",36),t&2){let e=d().options,n=d();Ae("height: calc("+e.spacerStyle.height+" - "+e.rows.length*e.itemSize+"px);"),C(n.cx("virtualScrollerSpacer")),s("pBind",n.ptm("virtualScrollerSpacer"))}}function Xy(t,r){t&1&&U(0)}function Jy(t,r){if(t&1&&(c(0,"tfoot",37,6),g(2,Xy,1,0,"ng-container",28),p()),t&2){let e=d().options,n=d();s("ngClass",n.cx("footer"))("ngStyle",n.sx("tfoot"))("pBind",n.ptm("tfoot")),l(2),s("ngTemplateOutlet",n.footerGroupedTemplate||n.footerTemplate||n._footerTemplate||n._footerGroupedTemplate)("ngTemplateOutletContext",oe(5,ur,e.columns))}}function ev(t,r){if(t&1&&(c(0,"table",29,4),g(2,Wy,1,0,"ng-container",28),c(3,"thead",30,5),g(5,Ky,1,0,"ng-container",28),p(),g(6,Yy,1,10,"tbody",31),F(7,"tbody",32),g(8,Zy,1,5,"tbody",33)(9,Jy,3,7,"tfoot",34),p()),t&2){let e=r.options,n=d();Ae(n.tableStyle),C(n.cn(n.cx("table"),n.tableStyleClass)),s("pBind",n.ptm("table")),D("id",n.id+"-table"),l(2),s("ngTemplateOutlet",n.colGroupTemplate||n._colGroupTemplate)("ngTemplateOutletContext",oe(28,ur,e.columns)),l(),C(n.cx("thead")),s("ngStyle",n.sx("thead"))("pBind",n.ptm("thead")),l(2),s("ngTemplateOutlet",n.headerGroupedTemplate||n.headerTemplate||n._headerTemplate)("ngTemplateOutletContext",oe(30,ur,e.columns)),l(),s("ngIf",n.frozenValue||n.frozenBodyTemplate||n._frozenBodyTemplate),l(),Ae(e.contentStyle),C(n.cx("tbody",e.contentStyleClass)),s("pBind",n.ptm("tbody"))("value",n.dataToRender(e.rows))("pTableBody",e.columns)("pTableBodyTemplate",n.bodyTemplate||n._bodyTemplate)("scrollerOptions",e)("unstyled",n.unstyled()),D("data-p-virtualscroll",n.virtualScroll),l(),s("ngIf",e.spacerStyle),l(),s("ngIf",n.footerGroupedTemplate||n.footerTemplate||n._footerTemplate||n._footerGroupedTemplate)}}function tv(t,r){t&1&&U(0)}function nv(t,r){if(t&1&&g(0,tv,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorDropdownIconTemplate||e._paginatorDropdownIconTemplate)}}function iv(t,r){t&1&&g(0,nv,1,1,"ng-template",22)}function ov(t,r){t&1&&U(0)}function rv(t,r){if(t&1&&g(0,ov,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorFirstPageLinkIconTemplate||e._paginatorFirstPageLinkIconTemplate)}}function av(t,r){t&1&&g(0,rv,1,1,"ng-template",23)}function lv(t,r){t&1&&U(0)}function sv(t,r){if(t&1&&g(0,lv,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorPreviousPageLinkIconTemplate||e._paginatorPreviousPageLinkIconTemplate)}}function dv(t,r){t&1&&g(0,sv,1,1,"ng-template",24)}function cv(t,r){t&1&&U(0)}function pv(t,r){if(t&1&&g(0,cv,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorLastPageLinkIconTemplate||e._paginatorLastPageLinkIconTemplate)}}function uv(t,r){t&1&&g(0,pv,1,1,"ng-template",25)}function mv(t,r){t&1&&U(0)}function hv(t,r){if(t&1&&g(0,mv,1,0,"ng-container",20),t&2){let e=d(3);s("ngTemplateOutlet",e.paginatorNextPageLinkIconTemplate||e._paginatorNextPageLinkIconTemplate)}}function fv(t,r){t&1&&g(0,hv,1,1,"ng-template",26)}function gv(t,r){if(t&1){let e=P();c(0,"p-paginator",21),x("onPageChange",function(i){_(e);let o=d();return b(o.onPageChange(i))}),g(1,iv,1,0,null,14)(2,av,1,0,null,14)(3,dv,1,0,null,14)(4,uv,1,0,null,14)(5,fv,1,0,null,14),p()}if(t&2){let e=d();s("rows",e.rows)("first",e.first)("totalRecords",e.totalRecords)("pageLinkSize",e.pageLinks)("alwaysShow",e.alwaysShowPaginator)("rowsPerPageOptions",e.rowsPerPageOptions)("templateLeft",e.paginatorLeftTemplate||e._paginatorLeftTemplate)("templateRight",e.paginatorRightTemplate||e._paginatorRightTemplate)("appendTo",e.paginatorDropdownAppendTo)("dropdownScrollHeight",e.paginatorDropdownScrollHeight)("currentPageReportTemplate",e.currentPageReportTemplate)("showFirstLastIcon",e.showFirstLastIcon)("dropdownItemTemplate",e.paginatorDropdownItemTemplate||e._paginatorDropdownItemTemplate)("showCurrentPageReport",e.showCurrentPageReport)("showJumpToPageDropdown",e.showJumpToPageDropdown)("showJumpToPageInput",e.showJumpToPageInput)("showPageLinks",e.showPageLinks)("styleClass",e.cx("pcPaginator")+" "+e.paginatorStyleClass&&e.paginatorStyleClass)("locale",e.paginatorLocale)("pt",e.ptm("pcPaginator"))("unstyled",e.unstyled()),l(),s("ngIf",e.paginatorDropdownIconTemplate||e._paginatorDropdownIconTemplate),l(),s("ngIf",e.paginatorFirstPageLinkIconTemplate||e._paginatorFirstPageLinkIconTemplate),l(),s("ngIf",e.paginatorPreviousPageLinkIconTemplate||e._paginatorPreviousPageLinkIconTemplate),l(),s("ngIf",e.paginatorLastPageLinkIconTemplate||e._paginatorLastPageLinkIconTemplate),l(),s("ngIf",e.paginatorNextPageLinkIconTemplate||e._paginatorNextPageLinkIconTemplate)}}function _v(t,r){t&1&&U(0)}function bv(t,r){if(t&1&&(c(0,"div",38),g(1,_v,1,0,"ng-container",20),p()),t&2){let e=d();s("ngClass",e.cx("footer"))("pBind",e.ptm("footer")),l(),s("ngTemplateOutlet",e.summaryTemplate||e._summaryTemplate)}}function yv(t,r){if(t&1&&F(0,"div",38,7),t&2){let e=d();je("display","none"),s("ngClass",e.cx("columnResizeIndicator"))("pBind",e.ptm("columnResizeIndicator"))}}function vv(t,r){if(t&1&&(O(),F(0,"svg",40)),t&2){let e=d(2);s("pBind",e.ptm("rowReorderIndicatorUp").icon)}}function xv(t,r){}function Cv(t,r){t&1&&g(0,xv,0,0,"ng-template")}function wv(t,r){if(t&1&&(c(0,"span",38,8),g(2,vv,1,1,"svg",39)(3,Cv,1,0,null,20),p()),t&2){let e=d();je("display","none"),s("ngClass",e.cx("rowReorderIndicatorUp"))("pBind",e.ptm("rowReorderIndicatorUp")),l(2),s("ngIf",!e.reorderIndicatorUpIconTemplate&&!e._reorderIndicatorUpIconTemplate),l(),s("ngTemplateOutlet",e.reorderIndicatorUpIconTemplate||e._reorderIndicatorUpIconTemplate)}}function kv(t,r){if(t&1&&(O(),F(0,"svg",42)),t&2){let e=d(2);s("pBind",e.ptm("rowReorderIndicatorDown").icon)}}function Tv(t,r){}function Sv(t,r){t&1&&g(0,Tv,0,0,"ng-template")}function Iv(t,r){if(t&1&&(c(0,"span",38,9),g(2,kv,1,1,"svg",41)(3,Sv,1,0,null,20),p()),t&2){let e=d();je("display","none"),s("ngClass",e.cx("rowReorderIndicatorDown"))("pBind",e.ptm("rowReorderIndicatorDown")),l(2),s("ngIf",!e.reorderIndicatorDownIconTemplate&&!e._reorderIndicatorDownIconTemplate),l(),s("ngTemplateOutlet",e.reorderIndicatorDownIconTemplate||e._reorderIndicatorDownIconTemplate)}}var Ev=["pTableBody",""],fr=(t,r,e,n,i)=>({$implicit:t,rowIndex:r,columns:e,editing:n,frozen:i}),Dv=(t,r,e,n,i,o,a)=>({$implicit:t,rowIndex:r,columns:e,editing:n,frozen:i,rowgroup:o,rowspan:a}),go=(t,r,e,n,i,o)=>({$implicit:t,rowIndex:r,columns:e,expanded:n,editing:i,frozen:o}),td=(t,r,e,n)=>({$implicit:t,rowIndex:r,columns:e,frozen:n}),nd=(t,r)=>({$implicit:t,frozen:r});function Mv(t,r){t&1&&U(0)}function Lv(t,r){if(t&1&&(W(0,3),g(1,Mv,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.groupHeaderTemplate||o.dataTable._groupHeaderTemplate)("ngTemplateOutletContext",yi(2,fr,n,o.getRowIndex(i),o.columns,o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function Pv(t,r){t&1&&U(0)}function Fv(t,r){if(t&1&&(W(0),g(1,Pv,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",n?o.template:o.dataTable.loadingBodyTemplate||o.dataTable._loadingBodyTemplate)("ngTemplateOutletContext",yi(2,fr,n,o.getRowIndex(i),o.columns,o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function Rv(t,r){t&1&&U(0)}function Bv(t,r){if(t&1&&(W(0),g(1,Rv,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",n?o.template:o.dataTable.loadingBodyTemplate||o.dataTable._loadingBodyTemplate)("ngTemplateOutletContext",Er(2,Dv,n,o.getRowIndex(i),o.columns,o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen,o.shouldRenderRowspan(o.value,n,i),o.calculateRowGroupSize(o.value,n,i)))}}function Ov(t,r){t&1&&U(0)}function Vv(t,r){if(t&1&&(W(0,3),g(1,Ov,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.groupFooterTemplate||o.dataTable._groupFooterTemplate)("ngTemplateOutletContext",yi(2,fr,n,o.getRowIndex(i),o.columns,o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function zv(t,r){if(t&1&&g(0,Lv,2,8,"ng-container",2)(1,Fv,2,8,"ng-container",0)(2,Bv,2,10,"ng-container",0)(3,Vv,2,8,"ng-container",2),t&2){let e=r.$implicit,n=r.index,i=d(2);s("ngIf",(i.dataTable.groupHeaderTemplate||i.dataTable._groupHeaderTemplate)&&!i.dataTable.virtualScroll&&i.dataTable.rowGroupMode==="subheader"&&i.shouldRenderRowGroupHeader(i.value,e,i.getRowIndex(n))),l(),s("ngIf",i.dataTable.rowGroupMode!=="rowspan"),l(),s("ngIf",i.dataTable.rowGroupMode==="rowspan"),l(),s("ngIf",(i.dataTable.groupFooterTemplate||i.dataTable._groupFooterTemplate)&&!i.dataTable.virtualScroll&&i.dataTable.rowGroupMode==="subheader"&&i.shouldRenderRowGroupFooter(i.value,e,i.getRowIndex(n)))}}function qv(t,r){if(t&1&&(W(0),g(1,zv,4,4,"ng-template",1),K()),t&2){let e=d();l(),s("ngForOf",e.value)("ngForTrackBy",e.dataTable.rowTrackBy)}}function Av(t,r){t&1&&U(0)}function Nv(t,r){if(t&1&&(W(0),g(1,Av,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.template)("ngTemplateOutletContext",Kn(2,go,n,o.getRowIndex(i),o.columns,o.dataTable.isRowExpanded(n),o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function Hv(t,r){t&1&&U(0)}function $v(t,r){if(t&1&&(W(0,3),g(1,Hv,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.groupHeaderTemplate||o.dataTable._groupHeaderTemplate)("ngTemplateOutletContext",Kn(2,go,n,o.getRowIndex(i),o.columns,o.dataTable.isRowExpanded(n),o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function jv(t,r){t&1&&U(0)}function Uv(t,r){t&1&&U(0)}function Qv(t,r){if(t&1&&(W(0,3),g(1,Uv,1,0,"ng-container",4),K()),t&2){let e=d(2),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.groupFooterTemplate||o.dataTable._groupFooterTemplate)("ngTemplateOutletContext",Kn(2,go,n,o.getRowIndex(i),o.columns,o.dataTable.isRowExpanded(n),o.dataTable.editMode==="row"&&o.dataTable.isRowEditing(n),o.frozen))}}function Gv(t,r){if(t&1&&(W(0),g(1,jv,1,0,"ng-container",4)(2,Qv,2,9,"ng-container",2),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.expandedRowTemplate||o.dataTable._expandedRowTemplate)("ngTemplateOutletContext",Lo(3,td,n,o.getRowIndex(i),o.columns,o.frozen)),l(),s("ngIf",(o.dataTable.groupFooterTemplate||o.dataTable._groupFooterTemplate)&&o.dataTable.rowGroupMode==="subheader"&&o.shouldRenderRowGroupFooter(o.value,n,o.getRowIndex(i)))}}function Wv(t,r){if(t&1&&g(0,Nv,2,9,"ng-container",0)(1,$v,2,9,"ng-container",2)(2,Gv,3,8,"ng-container",0),t&2){let e=r.$implicit,n=r.index,i=d(2);s("ngIf",!(i.dataTable.groupHeaderTemplate&&i.dataTable._groupHeaderTemplate)),l(),s("ngIf",(i.dataTable.groupHeaderTemplate||i.dataTable._groupHeaderTemplate)&&i.dataTable.rowGroupMode==="subheader"&&i.shouldRenderRowGroupHeader(i.value,e,i.getRowIndex(n))),l(),s("ngIf",i.dataTable.isRowExpanded(e))}}function Kv(t,r){if(t&1&&(W(0),g(1,Wv,3,3,"ng-template",1),K()),t&2){let e=d();l(),s("ngForOf",e.value)("ngForTrackBy",e.dataTable.rowTrackBy)}}function Yv(t,r){t&1&&U(0)}function Zv(t,r){t&1&&U(0)}function Xv(t,r){if(t&1&&(W(0),g(1,Zv,1,0,"ng-container",4),K()),t&2){let e=d(),n=e.$implicit,i=e.index,o=d(2);l(),s("ngTemplateOutlet",o.dataTable.frozenExpandedRowTemplate||o.dataTable._frozenExpandedRowTemplate)("ngTemplateOutletContext",Lo(2,td,n,o.getRowIndex(i),o.columns,o.frozen))}}function Jv(t,r){if(t&1&&g(0,Yv,1,0,"ng-container",4)(1,Xv,2,7,"ng-container",0),t&2){let e=r.$implicit,n=r.index,i=d(2);s("ngTemplateOutlet",i.template)("ngTemplateOutletContext",Kn(3,go,e,i.getRowIndex(n),i.columns,i.dataTable.isRowExpanded(e),i.dataTable.editMode==="row"&&i.dataTable.isRowEditing(e),i.frozen)),l(),s("ngIf",i.dataTable.isRowExpanded(e))}}function ex(t,r){if(t&1&&(W(0),g(1,Jv,2,10,"ng-template",1),K()),t&2){let e=d();l(),s("ngForOf",e.value)("ngForTrackBy",e.dataTable.rowTrackBy)}}function tx(t,r){t&1&&U(0)}function nx(t,r){if(t&1&&(W(0),g(1,tx,1,0,"ng-container",4),K()),t&2){let e=d();l(),s("ngTemplateOutlet",e.dataTable.loadingBodyTemplate||e.dataTable._loadingBodyTemplate)("ngTemplateOutletContext",Pe(2,nd,e.columns,e.frozen))}}function ix(t,r){t&1&&U(0)}function ox(t,r){if(t&1&&(W(0),g(1,ix,1,0,"ng-container",4),K()),t&2){let e=d();l(),s("ngTemplateOutlet",e.dataTable.emptyMessageTemplate||e.dataTable._emptyMessageTemplate)("ngTemplateOutletContext",Pe(2,nd,e.columns,e.frozen))}}var rx=`
${$l}

/* For PrimeNG */
.p-datatable-scrollable-table > .p-datatable-thead {
    top: 0;
    z-index: 2;
}

.p-datatable-scrollable-table > .p-datatable-frozen-tbody {
    position: sticky;
    z-index: 2;
}

.p-datatable-scrollable-table > .p-datatable-frozen-tbody + .p-datatable-frozen-tbody {
    z-index: 1;
}

.p-datatable-mask.p-overlay-mask {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
}

.p-datatable-filter-overlay {
    position: absolute;
    background: dt('datatable.filter.overlay.select.background');
    color: dt('datatable.filter.overlay.select.color');
    border: 1px solid dt('datatable.filter.overlay.select.border.color');
    border-radius: dt('datatable.filter.overlay.select.border.radius');
    box-shadow: dt('datatable.filter.overlay.select.shadow');
    min-width: 12.5rem;
}

.p-datatable-filter-rule {
    border-bottom: 1px solid dt('datatable.filter.rule.border.color');
}

.p-datatable-filter-rule:last-child {
    border-bottom: 0 none;
}

.p-datatable-filter-add-rule-button,
.p-datatable-filter-remove-rule-button {
    width: 100%;
}

.p-datatable-filter-remove-button {
    width: 100%;
}

.p-datatable-thead > tr > th {
    padding: dt('datatable.header.cell.padding');
    background: dt('datatable.header.cell.background');
    border-color: dt('datatable.header.cell.border.color');
    border-style: solid;
    border-width: 0 0 1px 0;
    color: dt('datatable.header.cell.color');
    font-weight: dt('datatable.column.title.font.weight');
    text-align: start;
    transition:
        background dt('datatable.transition.duration'),
        color dt('datatable.transition.duration'),
        border-color dt('datatable.transition.duration'),
        outline-color dt('datatable.transition.duration'),
        box-shadow dt('datatable.transition.duration');
}

.p-datatable-thead > tr > th p-columnfilter {
    font-weight: normal;
}

.p-datatable-thead > tr > th,
.p-datatable-sort-icon,
.p-datatable-sort-badge {
    vertical-align: middle;
}

.p-datatable-thead > tr > th.p-datatable-column-sorted {
    background: dt('datatable.header.cell.selected.background');
    color: dt('datatable.header.cell.selected.color');
}

.p-datatable-thead > tr > th.p-datatable-column-sorted .p-datatable-sort-icon {
    color: dt('datatable.header.cell.selected.color');
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd) {
    background: dt('datatable.row.striped.background');
}

.p-datatable.p-datatable-striped .p-datatable-tbody > tr:nth-child(odd).p-datatable-row-selected {
    background: dt('datatable.row.selected.background');
    color: dt('datatable.row.selected.color');
}

p-sortIcon, p-sort-icon, p-sorticon {
    display: inline-flex;
    align-items: center;
    gap: dt('datatable.header.cell.gap');
}

.p-datatable .p-editable-column.p-cell-editing {
    padding: 0;
}

.p-datatable .p-editable-column.p-cell-editing p-celleditor {
    display: block;
    width: 100%;
}
`,ax={root:({instance:t})=>["p-datatable p-component",{"p-datatable-hoverable":t.rowHover||t.selectionMode,"p-datatable-resizable":t.resizableColumns,"p-datatable-resizable-fit":t.resizableColumns&&t.columnResizeMode==="fit","p-datatable-scrollable":t.scrollable,"p-datatable-flex-scrollable":t.scrollable&&t.scrollHeight==="flex","p-datatable-striped":t.stripedRows,"p-datatable-gridlines":t.showGridlines,"p-datatable-sm":t.size==="small","p-datatable-lg":t.size==="large"}],mask:"p-datatable-mask p-overlay-mask",loadingIcon:"p-datatable-loading-icon",header:"p-datatable-header",pcPaginator:({instance:t})=>"p-datatable-paginator-"+t.paginatorPosition,tableContainer:"p-datatable-table-container",table:({instance:t})=>["p-datatable-table",{"p-datatable-scrollable-table":t.scrollable,"p-datatable-resizable-table":t.resizableColumns,"p-datatable-resizable-table-fit":t.resizableColumns&&t.columnResizeMode==="fit"}],thead:"p-datatable-thead",columnResizer:"p-datatable-column-resizer",columnHeaderContent:"p-datatable-column-header-content",columnTitle:"p-datatable-column-title",columnFooter:"p-datatable-column-footer",sortIcon:"p-datatable-sort-icon",pcSortBadge:"p-datatable-sort-badge",filter:({instance:t})=>({"p-datatable-filter":!0,"p-datatable-inline-filter":t.display==="row","p-datatable-popover-filter":t.display==="menu"}),filterElementContainer:"p-datatable-filter-element-container",pcColumnFilterButton:"p-datatable-column-filter-button",pcColumnFilterClearButton:"p-datatable-column-filter-clear-button",filterOverlay:({instance:t})=>({"p-datatable-filter-overlay p-component":!0,"p-datatable-filter-overlay-popover":t.display==="menu"}),filterConstraintList:"p-datatable-filter-constraint-list",filterConstraint:({selected:t})=>({"p-datatable-filter-constraint":!0,"p-datatable-filter-constraint-selected":t}),filterConstraintSeparator:"p-datatable-filter-constraint-separator",filterOperator:"p-datatable-filter-operator",pcFilterOperatorDropdown:"p-datatable-filter-operator-dropdown",filterRuleList:"p-datatable-filter-rule-list",filterRule:"p-datatable-filter-rule",pcFilterConstraintDropdown:"p-datatable-filter-constraint-dropdown",pcFilterRemoveRuleButton:"p-datatable-filter-remove-rule-button",pcFilterAddRuleButton:"p-datatable-filter-add-rule-button",filterButtonbar:"p-datatable-filter-buttonbar",pcFilterClearButton:"p-datatable-filter-clear-button",pcFilterApplyButton:"p-datatable-filter-apply-button",tbody:({instance:t})=>({"p-datatable-tbody":!0,"p-datatable-frozen-tbody":t.frozenValue||t.frozenBodyTemplate,"p-virtualscroller-content":t.virtualScroll}),rowGroupHeader:"p-datatable-row-group-header",rowToggleButton:"p-datatable-row-toggle-button",rowToggleIcon:"p-datatable-row-toggle-icon",rowExpansion:"p-datatable-row-expansion",rowGroupFooter:"p-datatable-row-group-footer",emptyMessage:"p-datatable-empty-message",bodyCell:({instance:t})=>({"p-datatable-frozen-column":t.columnProp("frozen")}),reorderableRowHandle:"p-datatable-reorderable-row-handle",pcRowEditorInit:"p-datatable-row-editor-init",pcRowEditorSave:"p-datatable-row-editor-save",pcRowEditorCancel:"p-datatable-row-editor-cancel",tfoot:"p-datatable-tfoot",footerCell:({instance:t})=>({"p-datatable-frozen-column":t.columnProp("frozen")}),virtualScrollerSpacer:"p-datatable-virtualscroller-spacer",footer:"p-datatable-tfoot",columnResizeIndicator:"p-datatable-column-resize-indicator",rowReorderIndicatorUp:"p-datatable-row-reorder-indicator-up",rowReorderIndicatorDown:"p-datatable-row-reorder-indicator-down",sortableColumn:({instance:t})=>({"p-datatable-sortable-column":t.isEnabled()," p-datatable-column-sorted":t.sorted}),sortableColumnIcon:"p-datatable-sort-icon",sortableColumnBadge:"p-sortable-column-badge",selectableRow:({instance:t})=>({"p-datatable-selectable-row":t.isEnabled(),"p-datatable-row-selected":t.selected}),resizableColumn:"p-datatable-resizable-column",reorderableColumn:"p-datatable-reorderable-column",rowEditorCancel:"p-datatable-row-editor-cancel",frozenColumn:({instance:t})=>({"p-datatable-frozen-column":t.frozen,"p-datatable-frozen-column-left":t.alignFrozenLeft==="left"}),contextMenuRowSelected:({instance:t})=>({"p-datatable-contextmenu-row-selected":t.selected})},lx={tableContainer:({instance:t})=>({"max-height":t.virtualScroll?"":t.scrollHeight,overflow:"auto"}),thead:{position:"sticky"},tfoot:{position:"sticky"},rowGroupHeader:({instance:t})=>({top:t.getFrozenRowGroupHeaderStickyPosition})},mr=(()=>{class t extends fe{name="datatable";style=rx;classes=ax;inlineStyles=lx;static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})();var sx=new ae("TABLE_INSTANCE"),hr=(()=>{class t{sortSource=new Ce;selectionSource=new Ce;contextMenuSource=new Ce;valueSource=new Ce;columnsSource=new Ce;sortSource$=this.sortSource.asObservable();selectionSource$=this.selectionSource.asObservable();contextMenuSource$=this.contextMenuSource.asObservable();valueSource$=this.valueSource.asObservable();columnsSource$=this.columnsSource.asObservable();onSort(e){this.sortSource.next(e)}onSelectionChange(){this.selectionSource.next(null)}onContextMenu(e){this.contextMenuSource.next(e)}onValueChange(e){this.valueSource.next(e)}onColumnsChange(e){this.columnsSource.next(e)}static \u0275fac=function(n){return new(n||t)};static \u0275prov=ne({token:t,factory:t.\u0275fac})}return t})(),gr=(()=>{class t extends De{componentName="DataTable";frozenColumns;frozenValue;styleClass;tableStyle;tableStyleClass;paginator;pageLinks=5;rowsPerPageOptions;alwaysShowPaginator=!0;paginatorPosition="bottom";paginatorStyleClass;paginatorDropdownAppendTo;paginatorDropdownScrollHeight="200px";currentPageReportTemplate="{currentPage} of {totalPages}";showCurrentPageReport;showJumpToPageDropdown;showJumpToPageInput;showFirstLastIcon=!0;showPageLinks=!0;defaultSortOrder=1;sortMode="single";resetPageOnSort=!0;selectionMode;selectionPageOnly;contextMenuSelection;contextMenuSelectionChange=new I;contextMenuSelectionMode="separate";dataKey;metaKeySelection=!1;rowSelectable;rowTrackBy=(e,n)=>n;lazy=!1;lazyLoadOnInit=!0;compareSelectionBy="deepEquals";csvSeparator=",";exportFilename="download";filters={};globalFilterFields;filterDelay=300;filterLocale;expandedRowKeys={};editingRowKeys={};rowExpandMode="multiple";scrollable;rowGroupMode;scrollHeight;virtualScroll;virtualScrollItemSize;virtualScrollOptions;virtualScrollDelay=250;frozenWidth;contextMenu;resizableColumns;columnResizeMode="fit";reorderableColumns;loading;loadingIcon;showLoader=!0;rowHover;customSort;showInitialSortBadge=!0;exportFunction;exportHeader;stateKey;stateStorage="session";editMode="cell";groupRowsBy;size;showGridlines;stripedRows;groupRowsByOrder=1;responsiveLayout="scroll";breakpoint="960px";paginatorLocale;get value(){return this._value}set value(e){this._value=e}get columns(){return this._columns}set columns(e){this._columns=e}get first(){return this._first}set first(e){this._first=e}get rows(){return this._rows}set rows(e){this._rows=e}totalRecords=0;get sortField(){return this._sortField}set sortField(e){this._sortField=e}get sortOrder(){return this._sortOrder}set sortOrder(e){this._sortOrder=e}get multiSortMeta(){return this._multiSortMeta}set multiSortMeta(e){this._multiSortMeta=e}get selection(){return this._selection}set selection(e){this._selection=e}get selectAll(){return this._selection}set selectAll(e){this._selection=e}selectAllChange=new I;selectionChange=new I;onRowSelect=new I;onRowUnselect=new I;onPage=new I;onSort=new I;onFilter=new I;onLazyLoad=new I;onRowExpand=new I;onRowCollapse=new I;onContextMenuSelect=new I;onColResize=new I;onColReorder=new I;onRowReorder=new I;onEditInit=new I;onEditComplete=new I;onEditCancel=new I;onHeaderCheckboxToggle=new I;sortFunction=new I;firstChange=new I;rowsChange=new I;onStateSave=new I;onStateRestore=new I;resizeHelperViewChild;reorderIndicatorUpViewChild;reorderIndicatorDownViewChild;wrapperViewChild;tableViewChild;tableHeaderViewChild;tableFooterViewChild;scroller;_templates;_value=[];_columns;_totalRecords=0;_first=0;_rows;filteredValue;_headerTemplate;headerTemplate;_headerGroupedTemplate;headerGroupedTemplate;_bodyTemplate;bodyTemplate;_loadingBodyTemplate;loadingBodyTemplate;_captionTemplate;captionTemplate;_footerTemplate;footerTemplate;_footerGroupedTemplate;footerGroupedTemplate;_summaryTemplate;summaryTemplate;_colGroupTemplate;colGroupTemplate;_expandedRowTemplate;expandedRowTemplate;_groupHeaderTemplate;groupHeaderTemplate;_groupFooterTemplate;groupFooterTemplate;_frozenExpandedRowTemplate;frozenExpandedRowTemplate;_frozenHeaderTemplate;frozenHeaderTemplate;_frozenBodyTemplate;frozenBodyTemplate;_frozenFooterTemplate;frozenFooterTemplate;_frozenColGroupTemplate;frozenColGroupTemplate;_emptyMessageTemplate;emptyMessageTemplate;_paginatorLeftTemplate;paginatorLeftTemplate;_paginatorRightTemplate;paginatorRightTemplate;_paginatorDropdownItemTemplate;paginatorDropdownItemTemplate;_loadingIconTemplate;loadingIconTemplate;_reorderIndicatorUpIconTemplate;reorderIndicatorUpIconTemplate;_reorderIndicatorDownIconTemplate;reorderIndicatorDownIconTemplate;_sortIconTemplate;sortIconTemplate;_checkboxIconTemplate;checkboxIconTemplate;_headerCheckboxIconTemplate;headerCheckboxIconTemplate;_paginatorDropdownIconTemplate;paginatorDropdownIconTemplate;_paginatorFirstPageLinkIconTemplate;paginatorFirstPageLinkIconTemplate;_paginatorLastPageLinkIconTemplate;paginatorLastPageLinkIconTemplate;_paginatorPreviousPageLinkIconTemplate;paginatorPreviousPageLinkIconTemplate;_paginatorNextPageLinkIconTemplate;paginatorNextPageLinkIconTemplate;selectionKeys={};lastResizerHelperX;reorderIconWidth;reorderIconHeight;draggedColumn;draggedRowIndex;droppedRowIndex;rowDragging;dropPosition;editingCell;editingCellData;editingCellField;editingCellRowIndex;selfClick;documentEditListener;_multiSortMeta;_sortField;_sortOrder=1;preventSelectionSetterPropagation;_selection;_selectAll=null;anchorRowIndex;rangeRowIndex;filterTimeout;initialized;rowTouched;restoringSort;restoringFilter;stateRestored;columnOrderStateRestored;columnWidthsState;tableWidthState;overlaySubscription;resizeColumnElement;columnResizing=!1;rowGroupHeaderStyleObject={};id=na();styleElement;responsiveStyleElement;overlayService=v(pn);filterService=v(wi);tableService=v(hr);zone=v(Be);_componentStyle=v(mr);bindDirectiveInstance=v(A,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onInit(){this.lazy&&this.lazyLoadOnInit&&(this.virtualScroll||this.onLazyLoad.emit(this.createLazyLoadMetadata()),this.restoringFilter&&(this.restoringFilter=!1)),this.responsiveLayout==="stack"&&this.createResponsiveStyle(),this.initialized=!0}onAfterContentInit(){this._templates.forEach(e=>{switch(e.getType()){case"caption":this.captionTemplate=e.template;break;case"header":this.headerTemplate=e.template;break;case"headergrouped":this.headerGroupedTemplate=e.template;break;case"body":this.bodyTemplate=e.template;break;case"loadingbody":this.loadingBodyTemplate=e.template;break;case"footer":this.footerTemplate=e.template;break;case"footergrouped":this.footerGroupedTemplate=e.template;break;case"summary":this.summaryTemplate=e.template;break;case"colgroup":this.colGroupTemplate=e.template;break;case"expandedrow":this.expandedRowTemplate=e.template;break;case"groupheader":this.groupHeaderTemplate=e.template;break;case"groupfooter":this.groupFooterTemplate=e.template;break;case"frozenheader":this.frozenHeaderTemplate=e.template;break;case"frozenbody":this.frozenBodyTemplate=e.template;break;case"frozenfooter":this.frozenFooterTemplate=e.template;break;case"frozencolgroup":this.frozenColGroupTemplate=e.template;break;case"frozenexpandedrow":this.frozenExpandedRowTemplate=e.template;break;case"emptymessage":this.emptyMessageTemplate=e.template;break;case"paginatorleft":this.paginatorLeftTemplate=e.template;break;case"paginatorright":this.paginatorRightTemplate=e.template;break;case"paginatordropdownicon":this.paginatorDropdownIconTemplate=e.template;break;case"paginatordropdownitem":this.paginatorDropdownItemTemplate=e.template;break;case"paginatorfirstpagelinkicon":this.paginatorFirstPageLinkIconTemplate=e.template;break;case"paginatorlastpagelinkicon":this.paginatorLastPageLinkIconTemplate=e.template;break;case"paginatorpreviouspagelinkicon":this.paginatorPreviousPageLinkIconTemplate=e.template;break;case"paginatornextpagelinkicon":this.paginatorNextPageLinkIconTemplate=e.template;break;case"loadingicon":this.loadingIconTemplate=e.template;break;case"reorderindicatorupicon":this.reorderIndicatorUpIconTemplate=e.template;break;case"reorderindicatordownicon":this.reorderIndicatorDownIconTemplate=e.template;break;case"sorticon":this.sortIconTemplate=e.template;break;case"checkboxicon":this.checkboxIconTemplate=e.template;break;case"headercheckboxicon":this.headerCheckboxIconTemplate=e.template;break}})}onAfterViewInit(){qe(this.platformId)&&this.isStateful()&&this.resizableColumns&&this.restoreColumnWidths()}onChanges(e){e.totalRecords&&e.totalRecords.firstChange&&(this._totalRecords=e.totalRecords.currentValue),e.value&&(this.isStateful()&&!this.stateRestored&&qe(this.platformId)&&this.restoreState(),this._value=e.value.currentValue,this.lazy||(this.totalRecords=this._totalRecords===0&&this._value?this._value.length:this._totalRecords??0,this.sortMode=="single"&&(this.sortField||this.groupRowsBy)?this.sortSingle():this.sortMode=="multiple"&&(this.multiSortMeta||this.groupRowsBy)?this.sortMultiple():this.hasFilter()&&this._filter()),this.tableService.onValueChange(e.value.currentValue)),e.columns&&(this.isStateful()||(this._columns=e.columns.currentValue,this.tableService.onColumnsChange(e.columns.currentValue)),this._columns&&this.isStateful()&&this.reorderableColumns&&!this.columnOrderStateRestored&&(this.restoreColumnOrder(),this.tableService.onColumnsChange(this._columns))),e.sortField&&(this._sortField=e.sortField.currentValue,(!this.lazy||this.initialized)&&this.sortMode==="single"&&this.sortSingle()),e.groupRowsBy&&(!this.lazy||this.initialized)&&this.sortMode==="single"&&this.sortSingle(),e.sortOrder&&(this._sortOrder=e.sortOrder.currentValue,(!this.lazy||this.initialized)&&this.sortMode==="single"&&this.sortSingle()),e.groupRowsByOrder&&(!this.lazy||this.initialized)&&this.sortMode==="single"&&this.sortSingle(),e.multiSortMeta&&(this._multiSortMeta=e.multiSortMeta.currentValue,this.sortMode==="multiple"&&(this.initialized||!this.lazy&&!this.virtualScroll)&&this.sortMultiple()),e.selection&&(this._selection=e.selection.currentValue,this.preventSelectionSetterPropagation||(this.updateSelectionKeys(),this.tableService.onSelectionChange()),this.preventSelectionSetterPropagation=!1),e.selectAll&&(this._selectAll=e.selectAll.currentValue,this.preventSelectionSetterPropagation||(this.updateSelectionKeys(),this.tableService.onSelectionChange(),this.isStateful()&&this.saveState()),this.preventSelectionSetterPropagation=!1)}get processedData(){return this.filteredValue||this.value||[]}_initialColWidths;dataToRender(e){let n=e||this.processedData;if(n&&this.paginator){let i=this.lazy?0:this.first;return n.slice(i,i+this.rows)}return n}updateSelectionKeys(){if(this.dataKey&&this._selection)if(this.selectionKeys={},Array.isArray(this._selection))for(let e of this._selection)this.selectionKeys[String(ce.resolveFieldData(e,this.dataKey))]=1;else this.selectionKeys[String(ce.resolveFieldData(this._selection,this.dataKey))]=1}onPageChange(e){this.first=e.first,this.rows=e.rows,this.onPage.emit({first:this.first,rows:this.rows}),this.lazy&&this.onLazyLoad.emit(this.createLazyLoadMetadata()),this.firstChange.emit(this.first),this.rowsChange.emit(this.rows),this.tableService.onValueChange(this.value),this.isStateful()&&this.saveState(),this.anchorRowIndex=null,this.scrollable&&this.resetScrollTop()}sort(e){let n=e.originalEvent;if(this.sortMode==="single"&&(this._sortOrder=this.sortField===e.field?this.sortOrder*-1:this.defaultSortOrder,this._sortField=e.field,this.resetPageOnSort&&(this._first=0,this.firstChange.emit(this._first),this.scrollable&&this.resetScrollTop()),this.sortSingle()),this.sortMode==="multiple"){let i=n.metaKey||n.ctrlKey,o=this.getSortMeta(e.field);o?i?o.order=o.order*-1:(this._multiSortMeta=[{field:e.field,order:o.order*-1}],this.resetPageOnSort&&(this._first=0,this.firstChange.emit(this._first),this.scrollable&&this.resetScrollTop())):((!i||!this.multiSortMeta)&&(this._multiSortMeta=[],this.resetPageOnSort&&(this._first=0,this.firstChange.emit(this._first))),this._multiSortMeta.push({field:e.field,order:this.defaultSortOrder})),this.sortMultiple()}this.isStateful()&&this.saveState(),this.anchorRowIndex=null}sortSingle(){let e=this.sortField||this.groupRowsBy,n=this.sortField?this.sortOrder:this.groupRowsByOrder;if(this.groupRowsBy&&this.sortField&&this.groupRowsBy!==this.sortField){this._multiSortMeta=[this.getGroupRowsMeta(),{field:this.sortField,order:this.sortOrder}],this.sortMultiple();return}if(e&&n){this.restoringSort&&(this.restoringSort=!1),this.lazy?this.onLazyLoad.emit(this.createLazyLoadMetadata()):this.value&&(this.customSort?this.sortFunction.emit({data:this.value,mode:this.sortMode,field:e,order:n}):(this.value.sort((o,a)=>{let u=ce.resolveFieldData(o,e),h=ce.resolveFieldData(a,e),f=null;return u==null&&h!=null?f=-1:u!=null&&h==null?f=1:u==null&&h==null?f=0:typeof u=="string"&&typeof h=="string"?f=u.localeCompare(h):f=u<h?-1:u>h?1:0,n*(f||0)}),this._value=[...this.value]),this.hasFilter()&&this._filter());let i={field:e,order:n};this.onSort.emit(i),this.tableService.onSort(i)}}sortMultiple(){this.groupRowsBy&&(this._multiSortMeta?this.multiSortMeta[0].field!==this.groupRowsBy&&(this._multiSortMeta=[this.getGroupRowsMeta(),...this._multiSortMeta]):this._multiSortMeta=[this.getGroupRowsMeta()]),this.multiSortMeta&&(this.lazy?this.onLazyLoad.emit(this.createLazyLoadMetadata()):this.value&&(this.customSort?this.sortFunction.emit({data:this.value,mode:this.sortMode,multiSortMeta:this.multiSortMeta}):(this.value.sort((e,n)=>this.multisortField(e,n,this.multiSortMeta,0)),this._value=[...this.value]),this.hasFilter()&&this._filter()),this.onSort.emit({multisortmeta:this.multiSortMeta}),this.tableService.onSort(this.multiSortMeta))}multisortField(e,n,i,o){let a=ce.resolveFieldData(e,i[o].field),u=ce.resolveFieldData(n,i[o].field);return ce.compare(a,u,this.filterLocale)===0?i.length-1>o?this.multisortField(e,n,i,o+1):0:this.compareValuesOnSort(a,u,i[o].order)}compareValuesOnSort(e,n,i){return ce.sort(e,n,i,this.filterLocale,this.sortOrder)}getSortMeta(e){if(this.multiSortMeta&&this.multiSortMeta.length){for(let n=0;n<this.multiSortMeta.length;n++)if(this.multiSortMeta[n].field===e)return this.multiSortMeta[n]}return null}isSorted(e){if(this.sortMode==="single")return this.sortField&&this.sortField===e;if(this.sortMode==="multiple"){let n=!1;if(this.multiSortMeta){for(let i=0;i<this.multiSortMeta.length;i++)if(this.multiSortMeta[i].field==e){n=!0;break}}return n}}handleRowClick(e){let n=e.originalEvent.target,i=n.nodeName,o=n.parentElement&&n.parentElement.nodeName;if(!(i=="INPUT"||i=="BUTTON"||i=="A"||o=="INPUT"||o=="BUTTON"||o=="A"||jr(e.originalEvent.target))){if(this.selectionMode){let a=e.rowData,u=e.rowIndex;if(this.preventSelectionSetterPropagation=!0,this.isMultipleSelectionMode()&&e.originalEvent.shiftKey&&this.anchorRowIndex!=null)de.clearSelection(),this.rangeRowIndex!=null&&this.clearSelectionRange(e.originalEvent),this.rangeRowIndex=u,this.selectRange(e.originalEvent,u);else{let h=this.isSelected(a);if(!h&&!this.isRowSelectable(a,u))return;let f=this.rowTouched?!1:this.metaKeySelection,y=this.dataKey?String(ce.resolveFieldData(a,this.dataKey)):null;if(this.anchorRowIndex=u,this.rangeRowIndex=u,f){let S=e.originalEvent.metaKey||e.originalEvent.ctrlKey;if(h&&S){if(this.isSingleSelectionMode())this._selection=null,this.selectionKeys={},this.selectionChange.emit(null);else{let N=this.findIndexInSelection(a);this._selection=this.selection.filter((B,q)=>q!=N),this.selectionChange.emit(this.selection),y&&delete this.selectionKeys[y]}this.onRowUnselect.emit({originalEvent:e.originalEvent,data:a,type:"row"})}else this.isSingleSelectionMode()?(this._selection=a,this.selectionChange.emit(a),y&&(this.selectionKeys={},this.selectionKeys[y]=1)):this.isMultipleSelectionMode()&&(S?this._selection=this.selection||[]:(this._selection=[],this.selectionKeys={}),this._selection=[...this.selection,a],this.selectionChange.emit(this.selection),y&&(this.selectionKeys[y]=1)),this.onRowSelect.emit({originalEvent:e.originalEvent,data:a,type:"row",index:u})}else if(this.selectionMode==="single")h?(this._selection=null,this.selectionKeys={},this.selectionChange.emit(this.selection),this.onRowUnselect.emit({originalEvent:e.originalEvent,data:a,type:"row",index:u})):(this._selection=a,this.selectionChange.emit(this.selection),this.onRowSelect.emit({originalEvent:e.originalEvent,data:a,type:"row",index:u}),y&&(this.selectionKeys={},this.selectionKeys[y]=1));else if(this.selectionMode==="multiple")if(h){let S=this.findIndexInSelection(a);this._selection=this.selection.filter((N,B)=>B!=S),this.selectionChange.emit(this.selection),this.onRowUnselect.emit({originalEvent:e.originalEvent,data:a,type:"row",index:u}),y&&delete this.selectionKeys[y]}else this._selection=this.selection?[...this.selection,a]:[a],this.selectionChange.emit(this.selection),this.onRowSelect.emit({originalEvent:e.originalEvent,data:a,type:"row",index:u}),y&&(this.selectionKeys[y]=1)}this.tableService.onSelectionChange(),this.isStateful()&&this.saveState()}this.rowTouched=!1}}handleRowTouchEnd(e){this.rowTouched=!0}handleRowRightClick(e){if(this.contextMenu){let n=e.rowData,i=e.rowIndex,o=()=>{this.contextMenu.show(e.originalEvent),this.contextMenu.hideCallback=()=>{this.contextMenuSelection=null,this.contextMenuSelectionChange.emit(null),this.tableService.onContextMenu(null)}};if(this.contextMenuSelectionMode==="separate")this.contextMenuSelection=n,this.contextMenuSelectionChange.emit(n),this.tableService.onContextMenu(n),o(),this.onContextMenuSelect.emit({originalEvent:e.originalEvent,data:n,index:e.rowIndex});else if(this.contextMenuSelectionMode==="joint"){this.preventSelectionSetterPropagation=!0;let a=this.isSelected(n),u=this.dataKey?String(ce.resolveFieldData(n,this.dataKey)):null;if(!a){if(!this.isRowSelectable(n,i))return;this.isSingleSelectionMode()?(this.selection=n,this.selectionChange.emit(n),u&&(this.selectionKeys={},this.selectionKeys[u]=1)):this.isMultipleSelectionMode()&&(this._selection=this.selection?[...this.selection,n]:[n],this.selectionChange.emit(this.selection),u&&(this.selectionKeys[u]=1))}this.contextMenuSelection=n,this.contextMenuSelectionChange.emit(n),this.tableService.onContextMenu(n),this.tableService.onSelectionChange(),o(),this.onContextMenuSelect.emit({originalEvent:e,data:n,index:e.rowIndex})}}}selectRange(e,n,i){let o,a;this.anchorRowIndex>n?(o=n,a=this.anchorRowIndex):this.anchorRowIndex<n?(o=this.anchorRowIndex,a=n):(o=n,a=n),this.lazy&&this.paginator&&(o-=this.first,a-=this.first);let u=[];for(let h=o;h<=a;h++){let f=this.filteredValue?this.filteredValue[h]:this.value[h];if(!this.isSelected(f)&&!i){if(!this.isRowSelectable(f,n))continue;u.push(f),this._selection=[...this.selection,f];let y=this.dataKey?String(ce.resolveFieldData(f,this.dataKey)):null;y&&(this.selectionKeys[y]=1)}}this.selectionChange.emit(this.selection),this.onRowSelect.emit({originalEvent:e,data:u,type:"row"})}clearSelectionRange(e){let n,i,o=this.rangeRowIndex,a=this.anchorRowIndex;o>a?(n=this.anchorRowIndex,i=this.rangeRowIndex):o<a?(n=this.rangeRowIndex,i=this.anchorRowIndex):(n=this.rangeRowIndex,i=this.rangeRowIndex);for(let u=n;u<=i;u++){let h=this.value[u],f=this.findIndexInSelection(h);this._selection=this.selection.filter((S,N)=>N!=f);let y=this.dataKey?String(ce.resolveFieldData(h,this.dataKey)):null;y&&delete this.selectionKeys[y],this.onRowUnselect.emit({originalEvent:e,data:h,type:"row"})}}isSelected(e){return e&&this.selection?this.dataKey?this.selectionKeys[ce.resolveFieldData(e,this.dataKey)]!==void 0:Array.isArray(this.selection)?this.findIndexInSelection(e)>-1:this.equals(e,this.selection):!1}findIndexInSelection(e){let n=-1;if(this.selection&&this.selection.length){for(let i=0;i<this.selection.length;i++)if(this.equals(e,this.selection[i])){n=i;break}}return n}isRowSelectable(e,n){return!(this.rowSelectable&&!this.rowSelectable({data:e,index:n}))}toggleRowWithRadio(e,n){if(this.preventSelectionSetterPropagation=!0,this.selection!=n){if(!this.isRowSelectable(n,e.rowIndex))return;this._selection=n,this.selectionChange.emit(this.selection),this.onRowSelect.emit({originalEvent:e.originalEvent,index:e.rowIndex,data:n,type:"radiobutton"}),this.dataKey&&(this.selectionKeys={},this.selectionKeys[String(ce.resolveFieldData(n,this.dataKey))]=1)}else this._selection=null,this.selectionChange.emit(this.selection),this.onRowUnselect.emit({originalEvent:e.originalEvent,index:e.rowIndex,data:n,type:"radiobutton"});this.tableService.onSelectionChange(),this.isStateful()&&this.saveState()}toggleRowWithCheckbox(e,n){this.selection=this.selection||[];let i=this.isSelected(n),o=this.dataKey?String(ce.resolveFieldData(n,this.dataKey)):null;if(this.preventSelectionSetterPropagation=!0,i){let a=this.findIndexInSelection(n);this._selection=this.selection.filter((u,h)=>h!=a),this.selectionChange.emit(this.selection),this.onRowUnselect.emit({originalEvent:e.originalEvent,index:e.rowIndex,data:n,type:"checkbox"}),o&&delete this.selectionKeys[o]}else{if(!this.isRowSelectable(n,e.rowIndex))return;this._selection=this.selection?[...this.selection,n]:[n],this.selectionChange.emit(this.selection),this.onRowSelect.emit({originalEvent:e.originalEvent,index:e.rowIndex,data:n,type:"checkbox"}),o&&(this.selectionKeys[o]=1)}this.tableService.onSelectionChange(),this.isStateful()&&this.saveState()}toggleRowsWithCheckbox({originalEvent:e},n){if(this._selectAll!==null)this.selectAllChange.emit({originalEvent:e,checked:n});else{let i=this.selectionPageOnly?this.dataToRender(this.processedData):this.processedData,o=this.selectionPageOnly&&this._selection?this._selection.filter(a=>!i.some(u=>this.equals(a,u))):[];n&&(o=this.frozenValue?[...o,...this.frozenValue,...i]:[...o,...i],o=this.rowSelectable?o.filter((a,u)=>this.rowSelectable({data:a,index:u})):o),this._selection=o,this.preventSelectionSetterPropagation=!0,this.updateSelectionKeys(),this.selectionChange.emit(this._selection),this.tableService.onSelectionChange(),this.onHeaderCheckboxToggle.emit({originalEvent:e,checked:n}),this.isStateful()&&this.saveState()}}equals(e,n){return this.compareSelectionBy==="equals"?e===n:ce.equals(e,n,this.dataKey)}filter(e,n,i){this.filterTimeout&&clearTimeout(this.filterTimeout),this.isFilterBlank(e)?this.filters[n]&&delete this.filters[n]:this.filters[n]={value:e,matchMode:i},this.filterTimeout=setTimeout(()=>{this._filter(),this.filterTimeout=null},this.filterDelay),this.anchorRowIndex=null}filterGlobal(e,n){this.filter(e,"global",n)}isFilterBlank(e){return e!=null?!!(typeof e=="string"&&e.trim().length==0||Array.isArray(e)&&e.length==0):!0}_filter(){if(this.restoringFilter||(this.first=0,this.firstChange.emit(this.first)),this.lazy)this.onLazyLoad.emit(this.createLazyLoadMetadata());else{if(!this.value)return;if(!this.hasFilter())this.filteredValue=null,this.paginator&&(this.totalRecords=this._totalRecords===0&&this.value?this.value.length:this._totalRecords);else{let e;if(this.filters.global){if(!this.columns&&!this.globalFilterFields)throw new Error("Global filtering requires dynamic columns or globalFilterFields to be defined.");e=this.globalFilterFields||this.columns}this.filteredValue=[];for(let n=0;n<this.value.length;n++){let i=!0,o=!1,a=!1;for(let h in this.filters)if(this.filters.hasOwnProperty(h)&&h!=="global"){a=!0;let f=h,y=this.filters[f];if(Array.isArray(y)){for(let S of y)if(i=this.executeLocalFilter(f,this.value[n],S),S.operator===Bo.OR&&i||S.operator===Bo.AND&&!i)break}else i=this.executeLocalFilter(f,this.value[n],y);if(!i)break}if(this.filters.global&&!o&&e)for(let h=0;h<e.length;h++){let f=e[h].field||e[h];if(o=this.filterService.filters[this.filters.global.matchMode](ce.resolveFieldData(this.value[n],f),this.filters.global.value,this.filterLocale),o)break}let u;this.filters.global?u=a?a&&i&&o:o:u=a&&i,u&&this.filteredValue.push(this.value[n])}this.filteredValue.length===this.value.length&&(this.filteredValue=null),this.paginator&&(this.totalRecords=this.filteredValue?this.filteredValue.length:this._totalRecords===0&&this.value?this.value.length:this._totalRecords??0)}}this.onFilter.emit({filters:this.filters,filteredValue:this.filteredValue||this.value}),this.tableService.onValueChange(this.value),this.isStateful()&&!this.restoringFilter&&this.saveState(),this.restoringFilter&&(this.restoringFilter=!1),this.cd.markForCheck(),this.scrollable&&this.resetScrollTop()}executeLocalFilter(e,n,i){let o=i.value,a=i.matchMode||Zr.STARTS_WITH,u=ce.resolveFieldData(n,e),h=this.filterService.filters[a];return h(u,o,this.filterLocale)}hasFilter(){let e=!0;for(let n in this.filters)if(this.filters.hasOwnProperty(n)){e=!1;break}return!e}createLazyLoadMetadata(){return{first:this.first,rows:this.rows,sortField:this.sortField,sortOrder:this.sortOrder,filters:this.filters,globalFilter:this.filters&&this.filters.global?this.filters.global.value:null,multiSortMeta:this.multiSortMeta,forceUpdate:()=>this.cd.detectChanges()}}clear(){this._sortField=null,this._sortOrder=this.defaultSortOrder,this._multiSortMeta=null,this.tableService.onSort(null),this.clearFilterValues(),this.filteredValue=null,this.first=0,this.firstChange.emit(this.first),this.lazy?this.onLazyLoad.emit(this.createLazyLoadMetadata()):this.totalRecords=this._totalRecords===0&&this._value?this._value.length:this._totalRecords??0}clearFilterValues(){for(let[,e]of Object.entries(this.filters))if(Array.isArray(e))for(let n of e)n.value=null;else e&&(e.value=null)}reset(){this.clear()}getExportHeader(e){return e[this.exportHeader]||e.header||e.field}exportCSV(e){let n,i="",o=this.columns;e&&e.selectionOnly?n=this.selection||[]:e&&e.allValues?n=this.value||[]:(n=this.filteredValue||this.value,this.frozenValue&&(n=n?[...this.frozenValue,...n]:this.frozenValue));let a=o.filter(y=>y.exportable!==!1&&y.field);i+=a.map(y=>'"'+this.getExportHeader(y)+'"').join(this.csvSeparator);let u=n.map(y=>a.map(S=>{let N=ce.resolveFieldData(y,S.field);return N!=null?this.exportFunction?N=this.exportFunction({data:N,field:S.field}):N=String(N).replace(/"/g,'""'):N="",'"'+N+'"'}).join(this.csvSeparator)).join(`
`);u.length&&(i+=`
`+u);let h=new Blob([new Uint8Array([239,187,191]),i],{type:"text/csv;charset=utf-8;"}),f=this.renderer.createElement("a");f.style.display="none",this.renderer.appendChild(this.document.body,f),f.download!==void 0?(f.setAttribute("href",URL.createObjectURL(h)),f.setAttribute("download",this.exportFilename+".csv"),f.click()):(i="data:text/csv;charset=utf-8,"+i,this.document.defaultView?.open(encodeURI(i))),this.renderer.removeChild(this.document.body,f)}onLazyItemLoad(e){this.onLazyLoad.emit(ue(G(G({},this.createLazyLoadMetadata()),e),{rows:e.last-e.first}))}resetScrollTop(){this.virtualScroll?this.scrollToVirtualIndex(0):this.scrollTo({top:0})}scrollToVirtualIndex(e){this.scroller&&this.scroller.scrollToIndex(e)}scrollTo(e){this.virtualScroll?this.scroller?.scrollTo(e):this.wrapperViewChild&&this.wrapperViewChild.nativeElement&&(this.wrapperViewChild.nativeElement.scrollTo?this.wrapperViewChild.nativeElement.scrollTo(e):(this.wrapperViewChild.nativeElement.scrollLeft=e.left,this.wrapperViewChild.nativeElement.scrollTop=e.top))}updateEditingCell(e,n,i,o){this.editingCell=e,this.editingCellData=n,this.editingCellField=i,this.editingCellRowIndex=o,this.bindDocumentEditListener()}isEditingCellValid(){return this.editingCell&&de.find(this.editingCell,".ng-invalid.ng-dirty").length===0}bindDocumentEditListener(){this.documentEditListener||(this.documentEditListener=this.renderer.listen(this.document,"click",e=>{this.editingCell&&!this.selfClick&&this.isEditingCellValid()&&(!this.$unstyled()&&de.removeClass(this.editingCell,"p-cell-editing"),cn(this.editingCell,"data-p-cell-editing","false"),this.editingCell=null,this.onEditComplete.emit({field:this.editingCellField,data:this.editingCellData,originalEvent:e,index:this.editingCellRowIndex}),this.editingCellField=null,this.editingCellData=null,this.editingCellRowIndex=null,this.unbindDocumentEditListener(),this.cd.markForCheck(),this.overlaySubscription&&this.overlaySubscription.unsubscribe()),this.selfClick=!1}))}unbindDocumentEditListener(){this.documentEditListener&&(this.documentEditListener(),this.documentEditListener=null)}initRowEdit(e){let n=String(ce.resolveFieldData(e,this.dataKey));this.editingRowKeys[n]=!0}saveRowEdit(e,n){if(de.find(n,".ng-invalid.ng-dirty").length===0){let i=String(ce.resolveFieldData(e,this.dataKey));delete this.editingRowKeys[i]}}cancelRowEdit(e){let n=String(ce.resolveFieldData(e,this.dataKey));delete this.editingRowKeys[n]}toggleRow(e,n){if(!this.dataKey&&!this.groupRowsBy)throw new Error("dataKey or groupRowsBy must be defined to use row expansion");let i=this.groupRowsBy?String(ce.resolveFieldData(e,this.groupRowsBy)):String(ce.resolveFieldData(e,this.dataKey));this.expandedRowKeys[i]!=null?(delete this.expandedRowKeys[i],this.onRowCollapse.emit({originalEvent:n,data:e})):(this.rowExpandMode==="single"&&(this.expandedRowKeys={}),this.expandedRowKeys[i]=!0,this.onRowExpand.emit({originalEvent:n,data:e})),n&&n.preventDefault(),this.isStateful()&&this.saveState()}isRowExpanded(e){return this.groupRowsBy?this.expandedRowKeys[String(ce.resolveFieldData(e,this.groupRowsBy))]===!0:this.expandedRowKeys[String(ce.resolveFieldData(e,this.dataKey))]===!0}isRowEditing(e){return this.editingRowKeys[String(ce.resolveFieldData(e,this.dataKey))]===!0}isSingleSelectionMode(){return this.selectionMode==="single"}isMultipleSelectionMode(){return this.selectionMode==="multiple"}onColumnResizeBegin(e){let n=de.getOffset(this.el?.nativeElement).left;this.resizeColumnElement=e.target.closest("th"),this.columnResizing=!0,e.type=="touchstart"?this.lastResizerHelperX=e.changedTouches[0].clientX-n+this.el?.nativeElement.scrollLeft:this.lastResizerHelperX=e.pageX-n+this.el?.nativeElement.scrollLeft,this.onColumnResize(e),e.preventDefault()}onColumnResize(e){let n=de.getOffset(this.el?.nativeElement).left;!this.$unstyled()&&de.addClass(this.el?.nativeElement,"p-unselectable-text"),this.resizeHelperViewChild.nativeElement.style.height=this.el?.nativeElement.offsetHeight+"px",this.resizeHelperViewChild.nativeElement.style.top="0px",e.type=="touchmove"?this.resizeHelperViewChild.nativeElement.style.left=e.changedTouches[0].clientX-n+this.el?.nativeElement.scrollLeft+"px":this.resizeHelperViewChild.nativeElement.style.left=e.pageX-n+this.el?.nativeElement.scrollLeft+"px",this.resizeHelperViewChild.nativeElement.style.display="block"}onColumnResizeEnd(){let e=getComputedStyle(this.el?.nativeElement??document.documentElement).direction==="rtl",n=this.resizeHelperViewChild?.nativeElement.offsetLeft-this.lastResizerHelperX,i=e?-n:n,a=this.resizeColumnElement.offsetWidth+i,u=this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g,""),h=u?parseFloat(u):15;if(a>=h){if(this.columnResizeMode==="fit"){let y=this.resizeColumnElement.nextElementSibling.offsetWidth-i;a>15&&y>15&&this.resizeTableCells(a,y)}else if(this.columnResizeMode==="expand"){this._initialColWidths=this._totalTableWidth();let f=this.tableViewChild?.nativeElement.offsetWidth+i;this.setResizeTableWidth(f+"px"),this.resizeTableCells(a,null)}this.onColResize.emit({element:this.resizeColumnElement,delta:i}),this.isStateful()&&this.saveState()}this.resizeHelperViewChild.nativeElement.style.display="none",de.removeClass(this.el?.nativeElement,"p-unselectable-text")}_totalTableWidth(){let e=[],n=de.findSingle(this.el.nativeElement,'[data-pc-section="thead"]');return de.find(n,"tr > th").forEach(o=>e.push(de.getOuterWidth(o))),e}onColumnDragStart(e,n){this.reorderIconWidth=de.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement),this.reorderIconHeight=de.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement),this.draggedColumn=n,e.dataTransfer.setData("text","b")}onColumnDragEnter(e,n){if(this.reorderableColumns&&this.draggedColumn&&n){e.preventDefault();let i=de.getOffset(this.el?.nativeElement),o=de.getOffset(n);if(this.draggedColumn!=n){let a=de.indexWithinGroup(this.draggedColumn,"preorderablecolumn"),u=de.indexWithinGroup(n,"preorderablecolumn"),h=o.left-i.left,f=i.top-o.top,y=o.left+n.offsetWidth/2;this.reorderIndicatorUpViewChild.nativeElement.style.top=o.top-i.top-(this.reorderIconHeight-1)+"px",this.reorderIndicatorDownViewChild.nativeElement.style.top=o.top-i.top+n.offsetHeight+"px",e.pageX>y?(this.reorderIndicatorUpViewChild.nativeElement.style.left=h+n.offsetWidth-Math.ceil(this.reorderIconWidth/2)+"px",this.reorderIndicatorDownViewChild.nativeElement.style.left=h+n.offsetWidth-Math.ceil(this.reorderIconWidth/2)+"px",this.dropPosition=1):(this.reorderIndicatorUpViewChild.nativeElement.style.left=h-Math.ceil(this.reorderIconWidth/2)+"px",this.reorderIndicatorDownViewChild.nativeElement.style.left=h-Math.ceil(this.reorderIconWidth/2)+"px",this.dropPosition=-1),this.reorderIndicatorUpViewChild.nativeElement.style.display="block",this.reorderIndicatorDownViewChild.nativeElement.style.display="block"}else e.dataTransfer.dropEffect="none"}}onColumnDragLeave(e){this.reorderableColumns&&this.draggedColumn&&e.preventDefault()}onColumnDrop(e,n){if(e.preventDefault(),this.draggedColumn){let i=de.indexWithinGroup(this.draggedColumn,"preorderablecolumn"),o=de.indexWithinGroup(n,"preorderablecolumn"),a=i!=o;if(a&&(o-i==1&&this.dropPosition===-1||i-o==1&&this.dropPosition===1)&&(a=!1),a&&o<i&&this.dropPosition===1&&(o=o+1),a&&o>i&&this.dropPosition===-1&&(o=o-1),a&&(ce.reorderArray(this.columns,i,o),this.onColReorder.emit({dragIndex:i,dropIndex:o,columns:this.columns}),this.isStateful()&&this.zone.runOutsideAngular(()=>{setTimeout(()=>{this.saveState()})})),this.resizableColumns&&this.resizeColumnElement){let u=this.columnResizeMode==="expand"?this._initialColWidths:this._totalTableWidth();ce.reorderArray(u,i+1,o+1),this.updateStyleElement(u,i,0,0)}this.reorderIndicatorUpViewChild.nativeElement.style.display="none",this.reorderIndicatorDownViewChild.nativeElement.style.display="none",this.draggedColumn.draggable=!1,this.draggedColumn=null,this.dropPosition=null}}resizeTableCells(e,n){let i=de.index(this.resizeColumnElement),o=this.columnResizeMode==="expand"?this._initialColWidths:this._totalTableWidth();this.updateStyleElement(o,i,e,n)}updateStyleElement(e,n,i,o){this.destroyStyleElement(),this.createStyleElement();let a="";e.forEach((u,h)=>{let f=h===n?i:o&&h===n+1?o:u,y=`width: ${f}px !important; max-width: ${f}px !important;`;a+=`
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${h+1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${h+1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${h+1}) {
                    ${y}
                }
            `}),this.renderer.setProperty(this.styleElement,"innerHTML",a)}onRowDragStart(e,n){this.rowDragging=!0,this.draggedRowIndex=n,e.dataTransfer.setData("text","b")}onRowDragOver(e,n,i){if(this.rowDragging&&this.draggedRowIndex!==n){let o=de.getOffset(i).top,a=e.pageY,u=o+de.getOuterHeight(i)/2,h=i.previousElementSibling;a<u?(de.removeClass(i,"p-datatable-dragpoint-bottom"),this.droppedRowIndex=n,h&&!this.$unstyled()?de.addClass(h,"p-datatable-dragpoint-bottom"):!this.$unstyled()&&de.addClass(i,"p-datatable-dragpoint-top")):(h&&!this.$unstyled()?de.removeClass(h,"p-datatable-dragpoint-bottom"):!this.$unstyled()&&de.addClass(i,"p-datatable-dragpoint-top"),this.droppedRowIndex=n+1,!this.$unstyled()&&de.addClass(i,"p-datatable-dragpoint-bottom"))}}onRowDragLeave(e,n){let i=n.previousElementSibling;i&&!this.$unstyled()&&de.removeClass(i,"p-datatable-dragpoint-bottom"),!this.$unstyled()&&de.removeClass(n,"p-datatable-dragpoint-bottom"),!this.$unstyled()&&de.removeClass(n,"p-datatable-dragpoint-top")}onRowDragEnd(e){this.rowDragging=!1,this.draggedRowIndex=null,this.droppedRowIndex=null}onRowDrop(e,n){if(this.droppedRowIndex!=null){let i=this.draggedRowIndex>this.droppedRowIndex?this.droppedRowIndex:this.droppedRowIndex===0?0:this.droppedRowIndex-1;ce.reorderArray(this.value,this.draggedRowIndex,i),this.virtualScroll&&(this._value=[...this._value]),this.onRowReorder.emit({dragIndex:this.draggedRowIndex,dropIndex:i})}this.onRowDragLeave(e,n),this.onRowDragEnd(e)}isEmpty(){let e=this.filteredValue||this.value;return e==null||e.length==0}getBlockableElement(){return this.el.nativeElement.children[0]}getStorage(){if(qe(this.platformId))switch(this.stateStorage){case"local":return window.localStorage;case"session":return window.sessionStorage;default:throw new Error(this.stateStorage+' is not a valid value for the state storage, supported values are "local" and "session".')}else throw new Error("Browser storage is not available in the server side.")}isStateful(){return this.stateKey!=null}saveState(){let e=this.getStorage(),n={};this.paginator&&(n.first=this.first,n.rows=this.rows),this.sortField&&(n.sortField=this.sortField,n.sortOrder=this.sortOrder),this.multiSortMeta&&(n.multiSortMeta=this.multiSortMeta),this.hasFilter()&&(n.filters=this.filters),this.resizableColumns&&this.saveColumnWidths(n),this.reorderableColumns&&this.saveColumnOrder(n),this.selection&&(n.selection=this.selection),Object.keys(this.expandedRowKeys).length&&(n.expandedRowKeys=this.expandedRowKeys),e.setItem(this.stateKey,JSON.stringify(n)),this.onStateSave.emit(n)}clearState(){let e=this.getStorage();this.stateKey&&e.removeItem(this.stateKey)}restoreState(){let n=this.getStorage().getItem(this.stateKey),i=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,o=function(a,u){return typeof u=="string"&&i.test(u)?new Date(u):u};if(n){let a=JSON.parse(n,o);this.paginator&&(this.first!==void 0&&(this.first=a.first,this.firstChange.emit(this.first)),this.rows!==void 0&&(this.rows=a.rows,this.rowsChange.emit(this.rows))),a.sortField&&(this.restoringSort=!0,this._sortField=a.sortField,this._sortOrder=a.sortOrder),a.multiSortMeta&&(this.restoringSort=!0,this._multiSortMeta=a.multiSortMeta),a.filters&&(this.restoringFilter=!0,this.filters=a.filters),this.resizableColumns&&(this.columnWidthsState=a.columnWidths,this.tableWidthState=a.tableWidth),a.expandedRowKeys&&(this.expandedRowKeys=a.expandedRowKeys),a.selection&&Promise.resolve(null).then(()=>this.selectionChange.emit(a.selection)),this.stateRestored=!0,this.onStateRestore.emit(a)}}saveColumnWidths(e){let n=[],i=[],o=this.el?.nativeElement;o&&(i=de.find(o,'[data-pc-section="thead"] > tr > th')),i.forEach(a=>n.push(de.getOuterWidth(a))),e.columnWidths=n.join(","),this.columnResizeMode==="expand"&&this.tableViewChild&&(e.tableWidth=de.getOuterWidth(this.tableViewChild.nativeElement))}setResizeTableWidth(e){this.tableViewChild.nativeElement.style.width=e,this.tableViewChild.nativeElement.style.minWidth=e}restoreColumnWidths(){if(this.columnWidthsState){let e=this.columnWidthsState.split(",");if(this.columnResizeMode==="expand"&&this.tableWidthState&&this.setResizeTableWidth(this.tableWidthState+"px"),ce.isNotEmpty(e)){this.createStyleElement();let n="";e.forEach((i,o)=>{let a=`width: ${i}px !important; max-width: ${i}px !important`;n+=`
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${o+1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${o+1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${o+1}) {
                            ${a}
                        }
                    `}),this.styleElement.innerHTML=n}}}saveColumnOrder(e){if(this.columns){let n=[];this.columns.map(i=>{n.push(i.field||i.key)}),e.columnOrder=n}}restoreColumnOrder(){let n=this.getStorage().getItem(this.stateKey);if(n){let o=JSON.parse(n).columnOrder;if(o){let a=[];o.map(u=>{let h=this.findColumnByKey(u);h&&a.push(h)}),this.columnOrderStateRestored=!0,this.columns=a}}}findColumnByKey(e){if(this.columns){for(let n of this.columns)if(n.key===e||n.field===e)return n}else return null}createStyleElement(){this.styleElement=this.renderer.createElement("style"),this.styleElement.type="text/css",de.setAttribute(this.styleElement,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.styleElement),de.setAttribute(this.styleElement,"nonce",this.config?.csp()?.nonce)}getGroupRowsMeta(){return{field:this.groupRowsBy,order:this.groupRowsByOrder}}createResponsiveStyle(){if(qe(this.platformId)&&!this.responsiveStyleElement){this.responsiveStyleElement=this.renderer.createElement("style"),this.responsiveStyleElement.type="text/css",de.setAttribute(this.responsiveStyleElement,"nonce",this.config?.csp()?.nonce),this.renderer.appendChild(this.document.head,this.responsiveStyleElement);let e=`
    @media screen and (max-width: ${this.breakpoint}) {
        #${this.id}-table > .p-datatable-thead > tr > th,
        #${this.id}-table > .p-datatable-tfoot > tr > td {
            display: none !important;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td {
            display: flex;
            width: 100% !important;
            align-items: center;
            justify-content: space-between;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td:not(:last-child) {
            border: 0 none;
        }

        #${this.id}.p-datatable-gridlines > .p-datatable-table-container > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td > .p-datatable-column-title {
            display: block;
        }
    }
    `;this.renderer.setProperty(this.responsiveStyleElement,"innerHTML",e),de.setAttribute(this.responsiveStyleElement,"nonce",this.config?.csp()?.nonce)}}destroyResponsiveStyle(){this.responsiveStyleElement&&(this.renderer.removeChild(this.document.head,this.responsiveStyleElement),this.responsiveStyleElement=null)}destroyStyleElement(){this.styleElement&&(this.renderer.removeChild(this.document.head,this.styleElement),this.styleElement=null)}ngAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onDestroy(){this.unbindDocumentEditListener(),this.editingCell=null,this.initialized=null,this.destroyStyleElement(),this.destroyResponsiveStyle()}get dataP(){return this.cn({scrollable:this.scrollable,"flex-scrollable":this.scrollable&&this.scrollHeight==="flex",[this.size]:this.size,loading:this.loading,empty:this.isEmpty()})}static \u0275fac=(()=>{let e;return function(i){return(e||(e=M(t)))(i||t)}})();static \u0275cmp=E({type:t,selectors:[["p-table"]],contentQueries:function(n,i,o){if(n&1&&Re(o,M1,4)(o,L1,4)(o,P1,4)(o,F1,4)(o,R1,4)(o,B1,4)(o,O1,4)(o,V1,4)(o,z1,4)(o,q1,4)(o,A1,4)(o,N1,4)(o,H1,4)(o,$1,4)(o,j1,4)(o,U1,4)(o,Q1,4)(o,G1,4)(o,W1,4)(o,K1,4)(o,Y1,4)(o,Z1,4)(o,X1,4)(o,J1,4)(o,ey,4)(o,ty,4)(o,ny,4)(o,iy,4)(o,oy,4)(o,ry,4)(o,ay,4)(o,ly,4)(o,Me,4),n&2){let a;k(a=T())&&(i._headerTemplate=a.first),k(a=T())&&(i._headerGroupedTemplate=a.first),k(a=T())&&(i._bodyTemplate=a.first),k(a=T())&&(i._loadingBodyTemplate=a.first),k(a=T())&&(i._captionTemplate=a.first),k(a=T())&&(i._footerTemplate=a.first),k(a=T())&&(i._footerGroupedTemplate=a.first),k(a=T())&&(i._summaryTemplate=a.first),k(a=T())&&(i._colGroupTemplate=a.first),k(a=T())&&(i._expandedRowTemplate=a.first),k(a=T())&&(i._groupHeaderTemplate=a.first),k(a=T())&&(i._groupFooterTemplate=a.first),k(a=T())&&(i._frozenExpandedRowTemplate=a.first),k(a=T())&&(i._frozenHeaderTemplate=a.first),k(a=T())&&(i._frozenBodyTemplate=a.first),k(a=T())&&(i._frozenFooterTemplate=a.first),k(a=T())&&(i._frozenColGroupTemplate=a.first),k(a=T())&&(i._emptyMessageTemplate=a.first),k(a=T())&&(i._paginatorLeftTemplate=a.first),k(a=T())&&(i._paginatorRightTemplate=a.first),k(a=T())&&(i._paginatorDropdownItemTemplate=a.first),k(a=T())&&(i._loadingIconTemplate=a.first),k(a=T())&&(i._reorderIndicatorUpIconTemplate=a.first),k(a=T())&&(i._reorderIndicatorDownIconTemplate=a.first),k(a=T())&&(i._sortIconTemplate=a.first),k(a=T())&&(i._checkboxIconTemplate=a.first),k(a=T())&&(i._headerCheckboxIconTemplate=a.first),k(a=T())&&(i._paginatorDropdownIconTemplate=a.first),k(a=T())&&(i._paginatorFirstPageLinkIconTemplate=a.first),k(a=T())&&(i._paginatorLastPageLinkIconTemplate=a.first),k(a=T())&&(i._paginatorPreviousPageLinkIconTemplate=a.first),k(a=T())&&(i._paginatorNextPageLinkIconTemplate=a.first),k(a=T())&&(i._templates=a)}},viewQuery:function(n,i){if(n&1&&We(sy,5)(dy,5)(cy,5)(py,5)(uy,5)(my,5)(hy,5)(fy,5),n&2){let o;k(o=T())&&(i.resizeHelperViewChild=o.first),k(o=T())&&(i.reorderIndicatorUpViewChild=o.first),k(o=T())&&(i.reorderIndicatorDownViewChild=o.first),k(o=T())&&(i.wrapperViewChild=o.first),k(o=T())&&(i.tableViewChild=o.first),k(o=T())&&(i.tableHeaderViewChild=o.first),k(o=T())&&(i.tableFooterViewChild=o.first),k(o=T())&&(i.scroller=o.first)}},hostVars:3,hostBindings:function(n,i){n&2&&(D("data-p",i.dataP),C(i.cn(i.cx("root"),i.styleClass)))},inputs:{frozenColumns:"frozenColumns",frozenValue:"frozenValue",styleClass:"styleClass",tableStyle:"tableStyle",tableStyleClass:"tableStyleClass",paginator:[2,"paginator","paginator",w],pageLinks:[2,"pageLinks","pageLinks",se],rowsPerPageOptions:"rowsPerPageOptions",alwaysShowPaginator:[2,"alwaysShowPaginator","alwaysShowPaginator",w],paginatorPosition:"paginatorPosition",paginatorStyleClass:"paginatorStyleClass",paginatorDropdownAppendTo:"paginatorDropdownAppendTo",paginatorDropdownScrollHeight:"paginatorDropdownScrollHeight",currentPageReportTemplate:"currentPageReportTemplate",showCurrentPageReport:[2,"showCurrentPageReport","showCurrentPageReport",w],showJumpToPageDropdown:[2,"showJumpToPageDropdown","showJumpToPageDropdown",w],showJumpToPageInput:[2,"showJumpToPageInput","showJumpToPageInput",w],showFirstLastIcon:[2,"showFirstLastIcon","showFirstLastIcon",w],showPageLinks:[2,"showPageLinks","showPageLinks",w],defaultSortOrder:[2,"defaultSortOrder","defaultSortOrder",se],sortMode:"sortMode",resetPageOnSort:[2,"resetPageOnSort","resetPageOnSort",w],selectionMode:"selectionMode",selectionPageOnly:[2,"selectionPageOnly","selectionPageOnly",w],contextMenuSelection:"contextMenuSelection",contextMenuSelectionMode:"contextMenuSelectionMode",dataKey:"dataKey",metaKeySelection:[2,"metaKeySelection","metaKeySelection",w],rowSelectable:"rowSelectable",rowTrackBy:"rowTrackBy",lazy:[2,"lazy","lazy",w],lazyLoadOnInit:[2,"lazyLoadOnInit","lazyLoadOnInit",w],compareSelectionBy:"compareSelectionBy",csvSeparator:"csvSeparator",exportFilename:"exportFilename",filters:"filters",globalFilterFields:"globalFilterFields",filterDelay:[2,"filterDelay","filterDelay",se],filterLocale:"filterLocale",expandedRowKeys:"expandedRowKeys",editingRowKeys:"editingRowKeys",rowExpandMode:"rowExpandMode",scrollable:[2,"scrollable","scrollable",w],rowGroupMode:"rowGroupMode",scrollHeight:"scrollHeight",virtualScroll:[2,"virtualScroll","virtualScroll",w],virtualScrollItemSize:[2,"virtualScrollItemSize","virtualScrollItemSize",se],virtualScrollOptions:"virtualScrollOptions",virtualScrollDelay:[2,"virtualScrollDelay","virtualScrollDelay",se],frozenWidth:"frozenWidth",contextMenu:"contextMenu",resizableColumns:[2,"resizableColumns","resizableColumns",w],columnResizeMode:"columnResizeMode",reorderableColumns:[2,"reorderableColumns","reorderableColumns",w],loading:[2,"loading","loading",w],loadingIcon:"loadingIcon",showLoader:[2,"showLoader","showLoader",w],rowHover:[2,"rowHover","rowHover",w],customSort:[2,"customSort","customSort",w],showInitialSortBadge:[2,"showInitialSortBadge","showInitialSortBadge",w],exportFunction:"exportFunction",exportHeader:"exportHeader",stateKey:"stateKey",stateStorage:"stateStorage",editMode:"editMode",groupRowsBy:"groupRowsBy",size:"size",showGridlines:[2,"showGridlines","showGridlines",w],stripedRows:[2,"stripedRows","stripedRows",w],groupRowsByOrder:[2,"groupRowsByOrder","groupRowsByOrder",se],responsiveLayout:"responsiveLayout",breakpoint:"breakpoint",paginatorLocale:"paginatorLocale",value:"value",columns:"columns",first:"first",rows:"rows",totalRecords:"totalRecords",sortField:"sortField",sortOrder:"sortOrder",multiSortMeta:"multiSortMeta",selection:"selection",selectAll:"selectAll"},outputs:{contextMenuSelectionChange:"contextMenuSelectionChange",selectAllChange:"selectAllChange",selectionChange:"selectionChange",onRowSelect:"onRowSelect",onRowUnselect:"onRowUnselect",onPage:"onPage",onSort:"onSort",onFilter:"onFilter",onLazyLoad:"onLazyLoad",onRowExpand:"onRowExpand",onRowCollapse:"onRowCollapse",onContextMenuSelect:"onContextMenuSelect",onColResize:"onColResize",onColReorder:"onColReorder",onRowReorder:"onRowReorder",onEditInit:"onEditInit",onEditComplete:"onEditComplete",onEditCancel:"onEditCancel",onHeaderCheckboxToggle:"onHeaderCheckboxToggle",sortFunction:"sortFunction",firstChange:"firstChange",rowsChange:"rowsChange",onStateSave:"onStateSave",onStateRestore:"onStateRestore"},standalone:!1,features:[le([hr,mr,{provide:sx,useExisting:t},{provide:be,useExisting:t}]),we([A]),L],decls:14,vars:15,consts:[["wrapper",""],["buildInTable",""],["scroller",""],["content",""],["table",""],["thead",""],["tfoot",""],["resizeHelper",""],["reorderIndicatorUp",""],["reorderIndicatorDown",""],[3,"class","pBind",4,"ngIf"],[3,"rows","first","totalRecords","pageLinkSize","alwaysShow","rowsPerPageOptions","templateLeft","templateRight","appendTo","dropdownScrollHeight","currentPageReportTemplate","showFirstLastIcon","dropdownItemTemplate","showCurrentPageReport","showJumpToPageDropdown","showJumpToPageInput","showPageLinks","styleClass","locale","pt","unstyled","onPageChange",4,"ngIf"],[3,"ngStyle","pBind"],[3,"items","columns","style","scrollHeight","itemSize","step","delay","inline","autoSize","lazy","loaderDisabled","showSpacer","showLoader","options","pt","onLazyLoad",4,"ngIf"],[4,"ngIf"],[3,"ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind","display",4,"ngIf"],[3,"pBind"],["data-p-icon","spinner",3,"spin","class","pBind",4,"ngIf"],["data-p-icon","spinner",3,"spin","pBind"],[4,"ngTemplateOutlet"],[3,"onPageChange","rows","first","totalRecords","pageLinkSize","alwaysShow","rowsPerPageOptions","templateLeft","templateRight","appendTo","dropdownScrollHeight","currentPageReportTemplate","showFirstLastIcon","dropdownItemTemplate","showCurrentPageReport","showJumpToPageDropdown","showJumpToPageInput","showPageLinks","styleClass","locale","pt","unstyled"],["pTemplate","dropdownicon"],["pTemplate","firstpagelinkicon"],["pTemplate","previouspagelinkicon"],["pTemplate","lastpagelinkicon"],["pTemplate","nextpagelinkicon"],[3,"onLazyLoad","items","columns","scrollHeight","itemSize","step","delay","inline","autoSize","lazy","loaderDisabled","showSpacer","showLoader","options","pt"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["role","table",3,"pBind"],["role","rowgroup",3,"ngStyle","pBind"],["role","rowgroup",3,"class","pBind","value","frozenRows","pTableBody","pTableBodyTemplate","unstyled","frozen",4,"ngIf"],["role","rowgroup",3,"pBind","value","pTableBody","pTableBodyTemplate","scrollerOptions","unstyled"],["role","rowgroup",3,"style","class","pBind",4,"ngIf"],["role","rowgroup",3,"ngClass","ngStyle","pBind",4,"ngIf"],["role","rowgroup",3,"pBind","value","frozenRows","pTableBody","pTableBodyTemplate","unstyled","frozen"],["role","rowgroup",3,"pBind"],["role","rowgroup",3,"ngClass","ngStyle","pBind"],[3,"ngClass","pBind"],["data-p-icon","arrow-down",3,"pBind",4,"ngIf"],["data-p-icon","arrow-down",3,"pBind"],["data-p-icon","arrow-up",3,"pBind",4,"ngIf"],["data-p-icon","arrow-up",3,"pBind"]],template:function(n,i){n&1&&(g(0,ky,3,5,"div",10)(1,Sy,2,4,"div",10)(2,Hy,6,26,"p-paginator",11),c(3,"div",12,0),g(5,Uy,4,18,"p-scroller",13)(6,Gy,2,7,"ng-container",14)(7,ev,10,32,"ng-template",null,1,Ie),p(),g(9,gv,6,26,"p-paginator",11)(10,bv,2,3,"div",15)(11,yv,2,4,"div",16)(12,wv,4,6,"span",16)(13,Iv,4,6,"span",16)),n&2&&(s("ngIf",i.loading&&i.showLoader),l(),s("ngIf",i.captionTemplate||i._captionTemplate),l(),s("ngIf",i.paginator&&(i.paginatorPosition==="top"||i.paginatorPosition=="both")),l(),C(i.cx("tableContainer")),s("ngStyle",i.sx("tableContainer"))("pBind",i.ptm("tableContainer")),D("data-p",i.dataP),l(2),s("ngIf",i.virtualScroll),l(),s("ngIf",!i.virtualScroll),l(3),s("ngIf",i.paginator&&(i.paginatorPosition==="bottom"||i.paginatorPosition=="both")),l(),s("ngIf",i.summaryTemplate||i._summaryTemplate),l(),s("ngIf",i.resizableColumns),l(),s("ngIf",i.reorderableColumns),l(),s("ngIf",i.reorderableColumns))},dependencies:()=>[at,ze,Le,rt,cr,Me,mi,tr,nr,Cn,A,dx],encapsulation:2})}return t})(),dx=(()=>{class t extends De{dataTable;tableService;hostName="Table";columns;template;get value(){return this._value}set value(e){this._value=e,this.frozenRows&&this.updateFrozenRowStickyPosition(),this.dataTable.scrollable&&this.dataTable.rowGroupMode==="subheader"&&this.updateFrozenRowGroupHeaderStickyPosition()}frozen;frozenRows;scrollerOptions;subscription;_value;onAfterViewInit(){this.frozenRows&&this.updateFrozenRowStickyPosition(),this.dataTable.scrollable&&this.dataTable.rowGroupMode==="subheader"&&this.updateFrozenRowGroupHeaderStickyPosition()}constructor(e,n){super(),this.dataTable=e,this.tableService=n,this.subscription=this.dataTable.tableService.valueSource$.subscribe(()=>{this.dataTable.virtualScroll&&this.cd.detectChanges()})}shouldRenderRowGroupHeader(e,n,i){let o=ce.resolveFieldData(n,this.dataTable?.groupRowsBy||""),a=e[i-(this.dataTable?._first||0)-1];if(a){let u=ce.resolveFieldData(a,this.dataTable?.groupRowsBy||"");return o!==u}else return!0}shouldRenderRowGroupFooter(e,n,i){let o=ce.resolveFieldData(n,this.dataTable?.groupRowsBy||""),a=e[i-(this.dataTable?._first||0)+1];if(a){let u=ce.resolveFieldData(a,this.dataTable?.groupRowsBy||"");return o!==u}else return!0}shouldRenderRowspan(e,n,i){let o=ce.resolveFieldData(n,this.dataTable?.groupRowsBy),a=e[i-1];if(a){let u=ce.resolveFieldData(a,this.dataTable?.groupRowsBy||"");return o!==u}else return!0}calculateRowGroupSize(e,n,i){let o=ce.resolveFieldData(n,this.dataTable?.groupRowsBy),a=o,u=0;for(;o===a;){u++;let h=e[++i];if(h)a=ce.resolveFieldData(h,this.dataTable?.groupRowsBy||"");else break}return u===1?null:u}onDestroy(){this.subscription&&this.subscription.unsubscribe()}updateFrozenRowStickyPosition(){this.el.nativeElement.style.top=de.getOuterHeight(this.el.nativeElement.previousElementSibling)+"px"}updateFrozenRowGroupHeaderStickyPosition(){if(this.el.nativeElement.previousElementSibling){let e=de.getOuterHeight(this.el.nativeElement.previousElementSibling);this.dataTable.rowGroupHeaderStyleObject.top=e+"px"}}getScrollerOption(e,n){return this.dataTable.virtualScroll?(n=n||this.scrollerOptions,n?n[e]:null):null}getRowIndex(e){let n=this.dataTable.paginator?this.dataTable.first+e:e,i=this.getScrollerOption("getItemOptions");return i?i(n).index:n}get dataP(){return this.cn({hoverable:this.dataTable.rowHover||this.dataTable.selectionMode,frozen:this.frozen})}static \u0275fac=function(n){return new(n||t)(Qe(gr),Qe(hr))};static \u0275cmp=E({type:t,selectors:[["","pTableBody",""]],hostVars:1,hostBindings:function(n,i){n&2&&D("data-p",i.dataP)},inputs:{columns:[0,"pTableBody","columns"],template:[0,"pTableBodyTemplate","template"],value:"value",frozen:[2,"frozen","frozen",w],frozenRows:[2,"frozenRows","frozenRows",w],scrollerOptions:"scrollerOptions"},standalone:!1,features:[L],attrs:Ev,decls:5,vars:5,consts:[[4,"ngIf"],["ngFor","",3,"ngForOf","ngForTrackBy"],["role","row",4,"ngIf"],["role","row"],[4,"ngTemplateOutlet","ngTemplateOutletContext"]],template:function(n,i){n&1&&g(0,qv,2,2,"ng-container",0)(1,Kv,2,2,"ng-container",0)(2,ex,2,2,"ng-container",0)(3,nx,2,5,"ng-container",0)(4,ox,2,5,"ng-container",0),n&2&&(s("ngIf",!i.dataTable.expandedRowTemplate&&!i.dataTable._expandedRowTemplate),l(),s("ngIf",(i.dataTable.expandedRowTemplate||i.dataTable._expandedRowTemplate)&&!(i.frozen&&(i.dataTable.frozenExpandedRowTemplate||i.dataTable._frozenExpandedRowTemplate))),l(),s("ngIf",(i.dataTable.frozenExpandedRowTemplate||i.dataTable._frozenExpandedRowTemplate)&&i.frozen),l(),s("ngIf",i.dataTable.loading),l(),s("ngIf",i.dataTable.isEmpty()&&!i.dataTable.loading))},dependencies:[jt,ze,Le],encapsulation:2})}return t})();var id=(()=>{class t{static \u0275fac=function(n){return new(n||t)};static \u0275mod=_e({type:t});static \u0275inj=ge({providers:[mr],imports:[te,qs,Yl,Bs,tt,Dl,Js,ns,ls,no,po,sr,tr,nr,Cn,_l,yl,bl,ul,is,ml,fl,vl,js,Ve,gn,ie,sr]})}return t})();var od=t=>({id:t.id?.toString()??"",title:t.title??"",subject:t.subject??"",difficulty_level:t.difficulty_level??t.difficultyLevel??"BEGINNER",status:t.status??"DRAFT",estimated_duration_minutes:t.estimated_duration_minutes??t.estimatedDurationMinutes??0,created_at:t.created_at??t.createdAt??t.updatedAt??t.lastModified??new Date().toISOString()}),rd={items:[],total:0,page:0,pageSize:20,loading:!1,error:null,selectedIds:[],filters:{search:"",status:"",subject:"",difficulty:""},sort:{field:"lastModified",order:"desc"}},_o=Tt({providedIn:"root"},It(rd),un(t=>({isEmpty:J(()=>!t.loading()&&t.items().length===0),selectedCount:J(()=>t.selectedIds().length),allSelected:J(()=>t.items().length>0&&t.selectedIds().length===t.items().length),pageCount:J(()=>Math.max(1,Math.ceil(t.total()/t.pageSize())))})),St((t,r=v(Je),e=v(Yt))=>{let n=()=>{let o=t.filters(),a=t.sort(),u=new Fr().set("page",String(t.page())).set("pageSize",String(t.pageSize())).set("sortField",a.field).set("sortOrder",a.order);return o.search&&(u=u.set("search",o.search)),o.status&&(u=u.set("status",o.status)),o.subject&&(u=u.set("subject",o.subject)),o.difficulty&&(u=u.set("difficulty",o.difficulty)),u},i=()=>{R(t,{loading:!0,error:null}),r.get(`${e}/lessons`,{params:n()}).subscribe({next:o=>{let a=o,u=[],h=0;Array.isArray(a)?(u=a.map(od),h=a.length):(u=(a.items??a.content??[]).map(od),typeof a.totalElements=="number"?h=a.totalElements:typeof a.total=="number"?h=a.total:a.page&&typeof a.page.totalElements=="number"?h=a.page.totalElements:h=u.length),R(t,{items:u,total:h,loading:!1})},error:o=>{let a=o instanceof Error?o.message:"Failed to load lessons";R(t,{loading:!1,error:a})}})};return{load(){i()},setSearch(o){R(t,a=>({filters:ue(G({},a.filters),{search:o}),page:0})),i()},setFilter(o,a){R(t,u=>({filters:ue(G({},u.filters),{[o]:a}),page:0})),i()},clearFilters(){R(t,{filters:{search:"",status:"",subject:"",difficulty:""},page:0}),i()},setSort(o,a){R(t,{sort:{field:o,order:a}}),i()},setPage(o){R(t,{page:o}),i()},setPageSize(o){R(t,{pageSize:o,page:0}),i()},toggleSelected(o){R(t,a=>({selectedIds:a.selectedIds.includes(o)?a.selectedIds.filter(u=>u!==o):[...a.selectedIds,o]}))},selectAll(o){R(t,a=>({selectedIds:o?a.items.map(u=>u.id):[]}))},clearSelection(){R(t,{selectedIds:[]})},publish(o){R(t,{loading:!0}),r.post(`${e}/lessons/${o}/publish`,{}).subscribe({next:()=>i(),error:()=>R(t,{loading:!1})})},archive(o){R(t,{loading:!0}),r.post(`${e}/lessons/${o}/archive`,{}).subscribe({next:()=>i(),error:()=>R(t,{loading:!1})})},unpublish(o){R(t,{loading:!0}),r.post(`${e}/lessons/${o}/unpublish`,{}).subscribe({next:()=>i(),error:()=>R(t,{loading:!1})})},duplicate(o){R(t,{loading:!0}),r.post(`${e}/lessons/${o}/duplicate`,{}).subscribe({next:()=>i(),error:()=>R(t,{loading:!1})})},remove(o){R(t,{loading:!0}),r.delete(`${e}/lessons/${o}`).subscribe({next:()=>{R(t,a=>({selectedIds:a.selectedIds.filter(u=>u!==o)})),i()},error:()=>R(t,{loading:!1})})},bulkAction(o){let a=t.selectedIds();if(a.length===0)return;let u=h=>o==="publish"?r.post(`${e}/lessons/${h}/publish`,{}).pipe(ct(()=>$e(null))):o==="archive"?r.post(`${e}/lessons/${h}/archive`,{}).pipe(ct(()=>$e(null))):r.delete(`${e}/lessons/${h}`).pipe(ct(()=>$e(null)));R(t,{loading:!0}),an(a.map(u)).pipe(wn(()=>{}),Cr(()=>{R(t,{selectedIds:[]}),i()})).subscribe()},reset(){R(t,rd)}}}));function px(t,r){if(t&1&&(c(0,"option",18),m(1),p()),t&2){let e=r.$implicit;s("value",e),l(),Q(e)}}function ux(t,r){if(t&1){let e=P();c(0,"div",23)(1,"span",31),m(2),p(),c(3,"app-button",32),x("btnClick",function(){_(e);let i=d();return b(i.bulkPublish())}),m(4," Publish "),p(),c(5,"app-button",33),x("btnClick",function(){_(e);let i=d();return b(i.bulkArchive())}),m(6," Archive "),p(),c(7,"app-button",34),x("btnClick",function(){_(e);let i=d();return b(i.bulkDelete())}),m(8," Delete "),p(),c(9,"app-button",35),x("btnClick",function(){_(e);let i=d();return b(i.store.clearSelection())}),m(10," Clear "),p()()}if(t&2){let e=d();l(2),$("",e.store.selectedCount()," selected")}}function mx(t,r){if(t&1){let e=P();c(0,"app-error-state",36),x("retryClick",function(){_(e);let i=d();return b(i.store.load())}),p()}if(t&2){let e=d();s("message",e.store.error()||"")}}function hx(t,r){if(t&1){let e=P();c(0,"tr",37)(1,"th",38)(2,"p-checkbox",39),x("ngModelChange",function(i){_(e);let o=d();return b(o.store.selectAll(i))}),p()(),c(3,"th",40),x("click",function(){_(e);let i=d();return b(i.toggleSort("title"))}),m(4," Title "),c(5,"span",41),m(6),p()(),c(7,"th",38),m(8,"Subject"),p(),c(9,"th",38),m(10,"Difficulty"),p(),c(11,"th",40),x("click",function(){_(e);let i=d();return b(i.toggleSort("status"))}),m(12," Status "),c(13,"span",41),m(14),p()(),c(15,"th",40),x("click",function(){_(e);let i=d();return b(i.toggleSort("lastModified"))}),m(16," Created At "),c(17,"span",41),m(18),p()(),c(19,"th",42),m(20,"Actions"),p()()}if(t&2){let e=d();l(2),s("binary",!0)("ngModel",e.store.allSelected()),l(4),Q(e.sortIcon("title")),l(8),Q(e.sortIcon("status")),l(4),Q(e.sortIcon("lastModified"))}}function fx(t,r){if(t&1){let e=P();c(0,"app-button",32),x("btnClick",function(){_(e);let i=d().$implicit,o=d();return b(o.publish(i.id))}),m(1," Publish "),p()}}function gx(t,r){if(t&1){let e=P();c(0,"app-button",54),x("btnClick",function(){_(e);let i=d().$implicit,o=d();return b(o.unpublish(i.id))}),m(1," Unpublish "),p(),c(2,"app-button",33),x("btnClick",function(){_(e);let i=d().$implicit,o=d();return b(o.archive(i.id))}),m(3," Archive "),p()}}function _x(t,r){if(t&1){let e=P();c(0,"app-button",55),x("btnClick",function(){_(e);let i=d().$implicit,o=d();return b(o.unpublish(i.id))}),m(1," Restore "),p()}}function bx(t,r){if(t&1){let e=P();c(0,"tr",43)(1,"td",44)(2,"p-checkbox",45),x("ngModelChange",function(){let i=_(e).$implicit,o=d();return b(o.store.toggleSelected(i.id))}),p()(),c(3,"td",46),m(4),p(),c(5,"td",44),m(6),p(),c(7,"td",44),m(8),p(),c(9,"td",44)(10,"app-badge",47),m(11),p()(),c(12,"td",48),m(13),p(),c(14,"td",44)(15,"div",49)(16,"app-button",50),x("btnClick",function(){let i=_(e).$implicit,o=d();return b(o.goToEdit(i.id))}),m(17," Edit "),p(),c(18,"app-button",51),x("btnClick",function(){let i=_(e).$implicit,o=d();return b(o.duplicate(i.id))}),m(19," Duplicate "),p(),V(20,fx,2,0,"app-button",52)(21,gx,4,0)(22,_x,2,0,"app-button",53),c(23,"app-button",34),x("btnClick",function(){let i=_(e).$implicit,o=d();return b(o.confirmDelete(i))}),m(24," Delete "),p()()()()}if(t&2){let e=r.$implicit,n=d();l(2),s("binary",!0)("ngModel",n.isSelected(e.id))("ariaLabel","Select "+e.title),l(2),Q(e.title),l(2),Q(e.subject),l(2),Q(e.difficulty_level),l(2),s("variant",n.badgeVariant(e.status)),l(),Q(e.status),l(2),Q(n.formatDate(e.created_at)),l(7),z(e.status==="DRAFT"?20:e.status==="PUBLISHED"?21:22)}}function yx(t,r){t&1&&(c(0,"tr")(1,"td",56),F(2,"app-empty-state",57),p()())}function vx(t,r){if(t&1){let e=P();c(0,"div",30)(1,"div",58)(2,"h2",59),m(3,"Delete lesson?"),p(),c(4,"p",60),m(5," Are you sure you want to delete "),c(6,"strong"),m(7),p(),m(8,"? This cannot be undone. "),p(),c(9,"div",61)(10,"app-button",62),x("btnClick",function(){_(e);let i=d();return b(i.cancelDelete())}),m(11,"Cancel"),p(),c(12,"app-button",63),x("btnClick",function(){_(e);let i=d();return b(i.performDelete())}),m(13," Delete "),p()()()()}if(t&2){let e,n=d();l(7),$('"',(e=n.lessonPendingDelete())==null?null:e.title,'"')}}var xx=["Math","Science","History","English","Geography","Art","Music"],bo=class t{store=v(_o);router=v(Dn);destroy$=new Ce;searchInput$=new Ce;subjectOptions=xx;searchInput="";lessonPendingDelete=Z(null);selectedSet=J(()=>new Set(this.store.selectedIds()));constructor(){Xe(()=>{this.searchInput=this.store.filters().search})}ngOnInit(){this.searchInput$.pipe(_i(300),Rt(this.destroy$)).subscribe(r=>this.store.setSearch(r)),this.store.load()}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}onSearchChange(r){this.searchInput$.next(r)}setFilter(r,e){r==="status"?this.store.setFilter("status",e):this.store.setFilter(r,e)}toggleSort(r){let e=this.store.sort(),n=e.field===r&&e.order==="asc"?"desc":"asc";this.store.setSort(r,n)}sortIcon(r){let e=this.store.sort();return e.field!==r?"unfold_more":e.order==="asc"?"expand_less":"expand_more"}onPage(r){let e=r.rows??this.store.pageSize(),n=Math.floor((r.first??0)/e);e!==this.store.pageSize()&&this.store.setPageSize(e),n!==this.store.page()&&this.store.setPage(n)}noopSort(){}isSelected(r){return this.selectedSet().has(r)}badgeVariant(r){return r==="PUBLISHED"?"success":r==="DRAFT"?"warning":"neutral"}formatDate(r){return new Date(r).toLocaleDateString()}goToEdit(r){this.router.navigate(["/teacher/lessons",r,"edit"])}publish(r){this.store.publish(r)}unpublish(r){this.store.unpublish(r)}archive(r){this.store.archive(r)}duplicate(r){this.store.duplicate(r)}confirmDelete(r){this.lessonPendingDelete.set(r)}cancelDelete(){this.lessonPendingDelete.set(null)}performDelete(){let r=this.lessonPendingDelete();r&&(this.store.remove(r.id),this.lessonPendingDelete.set(null))}bulkPublish(){this.store.bulkAction("publish")}bulkArchive(){this.store.bulkAction("archive")}bulkDelete(){this.store.bulkAction("delete")}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-teacher-lesson-list"]],decls:58,vars:17,consts:[[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-6"],[1,"flex","flex-col","md:flex-row","justify-between","items-start","md:items-center","gap-4","bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],[1,"flex","items-center","space-x-4"],["aria-hidden","true",1,"w-14","h-14","bg-[#0ABAB5]/20","rounded-2xl","border-4","border-black","flex","items-center","justify-center"],[1,"material-icons","text-[#0ABAB5]","text-3xl"],[1,"text-3xl","font-black","text-black","tracking-tight"],[1,"text-gray-600","font-medium"],["variant","primary","icon","add_circle","routerLink","/teacher/lessons/new"],[1,"bg-white","p-4","rounded-2xl","border-4","border-black","shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]","grid","grid-cols-1","md:grid-cols-4","gap-3"],[1,"flex","flex-col","text-sm","font-bold"],[1,"mb-1"],["type","search","placeholder","Search by title\u2026","aria-label","Search lessons by title",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium",3,"ngModelChange","ngModel"],["aria-label","Filter by status",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium","bg-white",3,"ngModelChange","ngModel"],["value",""],["value","DRAFT"],["value","PUBLISHED"],["value","ARCHIVED"],["aria-label","Filter by subject",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium","bg-white",3,"ngModelChange","ngModel"],[3,"value"],["aria-label","Filter by difficulty",1,"px-3","py-2","border-2","border-black","rounded-xl","font-medium","bg-white",3,"ngModelChange","ngModel"],["value","BEGINNER"],["value","INTERMEDIATE"],["value","ADVANCED"],["role","toolbar","aria-label","Bulk actions",1,"flex","flex-wrap","items-center","gap-3","p-4","bg-[#0ABAB5]/10","border-4","border-black","rounded-2xl"],["title","Could not load lessons","retryLabel","Retry",3,"message"],[1,"bg-white","border-4","border-black","rounded-3xl","overflow-hidden","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"],["dataKey","id",3,"onPage","sortFunction","value","lazy","loading","paginator","rows","totalRecords","first","responsiveLayout","breakpoint","customSort"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],["role","dialog","aria-modal","true","aria-labelledby","confirm-delete-title",1,"fixed","inset-0","bg-black/50","flex","items-center","justify-center","z-50","p-4"],[1,"font-bold"],["size","sm","variant","primary","icon","cloud_upload",3,"btnClick"],["size","sm","variant","secondary","icon","archive",3,"btnClick"],["size","sm","variant","danger","icon","delete",3,"btnClick"],["size","sm","variant","secondary",3,"btnClick"],["title","Could not load lessons","retryLabel","Retry",3,"retryClick","message"],[1,"bg-gray-100","border-b-4","border-black"],["scope","col",1,"p-3"],["ariaLabel","Select all visible lessons",3,"ngModelChange","binary","ngModel"],["scope","col",1,"p-3","cursor-pointer",3,"click"],[1,"material-icons","text-sm","align-middle"],["scope","col",1,"p-3","text-right"],[1,"border-b-2","border-black/10","hover:bg-[#0ABAB5]/5"],[1,"p-3"],[3,"ngModelChange","binary","ngModel","ariaLabel"],[1,"p-3","font-bold"],[3,"variant"],[1,"p-3","text-sm"],[1,"flex","gap-2","justify-end"],["size","sm","variant","secondary","icon","edit",3,"btnClick"],["size","sm","variant","secondary","icon","content_copy",3,"btnClick"],["size","sm","variant","primary","icon","cloud_upload"],["size","sm","variant","secondary","icon","unarchive"],["size","sm","variant","secondary","icon","cloud_off",3,"btnClick"],["size","sm","variant","secondary","icon","unarchive",3,"btnClick"],["colspan","7",1,"p-6"],["title","No lessons yet","description","Create your first lesson to get started.","icon","menu_book"],[1,"bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]","max-w-md","w-full"],["id","confirm-delete-title",1,"text-2xl","font-black","mb-2"],[1,"mb-6","text-gray-700"],[1,"flex","justify-end","gap-3"],["variant","secondary",3,"btnClick"],["variant","danger","icon","delete",3,"btnClick"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"span",4),m(5,"menu_book"),p()(),c(6,"div")(7,"h1",5),m(8,"My Lessons"),p(),c(9,"p",6),m(10,"Create, edit, and publish your lessons"),p()()(),c(11,"app-button",7),m(12," Create New Lesson "),p()(),c(13,"div",8)(14,"label",9)(15,"span",10),m(16,"Search"),p(),c(17,"input",11),xt("ngModelChange",function(o){return vt(n.searchInput,o)||(n.searchInput=o),o}),x("ngModelChange",function(o){return n.onSearchChange(o)}),p()(),c(18,"label",9)(19,"span",10),m(20,"Status"),p(),c(21,"select",12),x("ngModelChange",function(o){return n.setFilter("status",o)}),c(22,"option",13),m(23,"All"),p(),c(24,"option",14),m(25,"Draft"),p(),c(26,"option",15),m(27,"Published"),p(),c(28,"option",16),m(29,"Archived"),p()()(),c(30,"label",9)(31,"span",10),m(32,"Subject"),p(),c(33,"select",17),x("ngModelChange",function(o){return n.setFilter("subject",o)}),c(34,"option",13),m(35,"All"),p(),me(36,px,2,2,"option",18,ln),p()(),c(38,"label",9)(39,"span",10),m(40,"Difficulty"),p(),c(41,"select",19),x("ngModelChange",function(o){return n.setFilter("difficulty",o)}),c(42,"option",13),m(43,"All"),p(),c(44,"option",20),m(45,"Beginner"),p(),c(46,"option",21),m(47,"Intermediate"),p(),c(48,"option",22),m(49,"Advanced"),p()()()(),V(50,ux,11,1,"div",23),V(51,mx,1,1,"app-error-state",24),c(52,"div",25)(53,"p-table",26),x("onPage",function(o){return n.onPage(o)})("sortFunction",function(){return n.noopSort()}),g(54,hx,21,5,"ng-template",27)(55,bx,25,10,"ng-template",28)(56,yx,3,0,"ng-template",29),p()()(),V(57,vx,14,1,"div",30)),e&2&&(l(17),yt("ngModel",n.searchInput),l(4),s("ngModel",n.store.filters().status),l(12),s("ngModel",n.store.filters().subject),l(3),he(n.subjectOptions),l(5),s("ngModel",n.store.filters().difficulty),l(9),z(n.store.selectedCount()>0?50:-1),l(),z(n.store.error()?51:-1),l(2),s("value",n.store.items())("lazy",!0)("loading",n.store.loading())("paginator",!0)("rows",n.store.pageSize())("totalRecords",n.store.total())("first",n.store.page()*n.store.pageSize())("responsiveLayout","stack")("breakpoint","960px")("customSort",!0),l(4),z(n.lessonPendingDelete()?57:-1))},dependencies:[te,tt,Pn,Fn,ft,Di,et,st,kt,wt,id,gr,Me,po,co,Et,Rn,Bi,Oi],encapsulation:2,changeDetection:0})};var Cx=t=>["/teacher/classes",t],wx=(t,r)=>r.id;function kx(t,r){if(t&1){let e=P();c(0,"button",11),x("click",function(){_(e);let i=d();return b(i.onCreateClass())}),m(1," Create Class "),p()}}function Tx(t,r){if(t&1){let e=P();c(0,"div",5)(1,"h2",12),m(2,"New Class"),p(),c(3,"div",13)(4,"label",14)(5,"span",15),m(6,"Class Name *"),p(),c(7,"input",16),x("ngModelChange",function(i){_(e);let o=d();return b(o.newClassName.set(i))}),p()(),c(8,"label",14)(9,"span",15),m(10,"Description"),p(),c(11,"textarea",17),x("ngModelChange",function(i){_(e);let o=d();return b(o.newClassDescription.set(i))}),p()()(),c(12,"div",18)(13,"button",11),x("click",function(){_(e);let i=d();return b(i.submitCreate())}),m(14," Create "),p(),c(15,"button",19),x("click",function(){_(e);let i=d();return b(i.cancelCreate())}),m(16," Cancel "),p()()()}if(t&2){let e=d();l(7),s("ngModel",e.newClassName()),l(4),s("ngModel",e.newClassDescription())}}function Sx(t,r){t&1&&(c(0,"div",7),m(1,"Loading..."),p())}function Ix(t,r){if(t&1){let e=P();c(0,"div",13)(1,"label",14)(2,"span",20),m(3,"Class Name *"),p(),c(4,"input",21),x("ngModelChange",function(i){_(e);let o=d(2);return b(o.editName.set(i))}),p()(),c(5,"label",14)(6,"span",20),m(7,"Description"),p(),c(8,"textarea",22),x("ngModelChange",function(i){_(e);let o=d(2);return b(o.editDescription.set(i))}),p()(),c(9,"div",23)(10,"button",24),x("click",function(){_(e);let i=d(2);return b(i.submitEdit())}),m(11," Save "),p(),c(12,"button",25),x("click",function(){_(e);let i=d(2);return b(i.cancelEdit())}),m(13," Cancel "),p()()()}if(t&2){let e=d(2);l(4),s("ngModel",e.editName()),l(4),s("ngModel",e.editDescription())}}function Ex(t,r){if(t&1&&(c(0,"p",27),m(1),p()),t&2){let e=d(2).$implicit;l(),Q(e.description)}}function Dx(t,r){if(t&1){let e=P();c(0,"h3",26),m(1),p(),V(2,Ex,2,1,"p",27),c(3,"p",28),m(4),p(),c(5,"p",29),m(6),p(),c(7,"p",30),m(8),Vt(9,"date"),p(),c(10,"div",31)(11,"button",32),m(12," View "),p(),c(13,"button",33),x("click",function(){_(e);let i=d().$implicit,o=d();return b(o.onEdit(i.id,i.name,i.description??""))}),m(14," Edit "),p(),c(15,"button",34),x("click",function(){_(e);let i=d().$implicit,o=d();return b(o.onDelete(i.id))}),m(16," Delete "),p()()}if(t&2){let e=d().$implicit;l(),Q(e.name),l(),z(e.description?2:-1),l(2),$(" Students: ",e.studentCount," "),l(2),$(" Lessons: ",e.lessonCount," "),l(2),$(" ",Dr(9,6,e.createdAt)," "),l(3),s("routerLink",oe(8,Cx,e.id))}}function Mx(t,r){if(t&1&&(c(0,"div",9),V(1,Ix,14,2,"div",13)(2,Dx,17,10),p()),t&2){let e=r.$implicit,n=d();l(),z(n.editingClassId()===e.id?1:2)}}function Lx(t,r){t&1&&(c(0,"div",10),m(1," No classes yet. Create your first class! "),p())}var yo=class t{store=v(Bn);createMode=Z(!1);newClassName=Z("");newClassDescription=Z("");editingClassId=Z(null);editName=Z("");editDescription=Z("");ngOnInit(){this.store.loadClasses()}onDelete(r){this.store.deleteClass(r)}onEdit(r,e,n){this.editingClassId.set(r),this.editName.set(e),this.editDescription.set(n??"")}submitEdit(){let r=this.editingClassId();if(!r)return;let e=this.editName().trim();e&&(this.store.updateClass(r,{name:e,description:this.editDescription().trim()}),this.cancelEdit())}cancelEdit(){this.editingClassId.set(null),this.editName.set(""),this.editDescription.set("")}onCreateClass(){this.createMode.set(!0)}submitCreate(){let r=this.newClassName().trim();r&&(this.store.createClass({name:r,description:this.newClassDescription().trim()}),this.cancelCreate())}cancelCreate(){this.createMode.set(!1),this.newClassName.set(""),this.newClassDescription.set("")}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-classes-list"]],decls:16,vars:4,consts:[[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-6"],[1,"flex","justify-between","items-center","bg-white","p-6","rounded-3xl","border-4","border-black","shadow"],[1,"text-3xl","font-black"],[1,"text-gray-600"],[1,"px-4","py-2","bg-[#0ABAB5]","text-white","font-black","rounded-xl","border-2","border-black","cursor-pointer","hover:bg-[#089692]","transition-colors"],[1,"bg-white","p-6","rounded-3xl","border-4","border-black","shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]","space-y-4"],[1,"px-3","py-2","border-2","border-black","rounded-xl","bg-white","font-bold",3,"click"],[1,"text-gray-500","font-bold"],[1,"grid","grid-cols-1","md:grid-cols-3","gap-4"],[1,"p-5","bg-white","border-4","border-black","rounded-2xl","shadow"],[1,"col-span-full","text-center","py-12","text-gray-400","font-bold"],[1,"px-4","py-2","bg-[#0ABAB5]","text-white","font-black","rounded-xl","border-2","border-black","cursor-pointer","hover:bg-[#089692]","transition-colors",3,"click"],[1,"text-xl","font-black","text-black"],[1,"space-y-3"],[1,"block"],[1,"text-sm","font-bold","mb-1","block"],["placeholder","e.g. Algebra 101","aria-label","Class name",1,"w-full","px-4","py-2","border-2","border-black","rounded-xl","font-medium",3,"ngModelChange","ngModel"],["placeholder","Brief description of the class","rows","3","aria-label","Class description",1,"w-full","px-4","py-2","border-2","border-black","rounded-xl","font-medium",3,"ngModelChange","ngModel"],[1,"flex","gap-3"],[1,"px-4","py-2","bg-gray-200","text-black","font-black","rounded-xl","border-2","border-black","cursor-pointer","hover:bg-gray-300","transition-colors",3,"click"],[1,"text-xs","font-bold","mb-1","block"],["placeholder","Class name","aria-label","Edit class name",1,"w-full","px-3","py-1.5","border-2","border-black","rounded-lg","text-sm","font-medium",3,"ngModelChange","ngModel"],["placeholder","Description","rows","2","aria-label","Edit class description",1,"w-full","px-3","py-1.5","border-2","border-black","rounded-lg","text-sm","font-medium",3,"ngModelChange","ngModel"],[1,"flex","gap-2"],[1,"px-3","py-1","bg-[#0ABAB5]","text-white","font-black","rounded-lg","border-2","border-black","cursor-pointer","hover:bg-[#089692]","transition-colors","text-sm",3,"click"],[1,"px-3","py-1","bg-gray-200","text-black","font-black","rounded-lg","border-2","border-black","cursor-pointer","hover:bg-gray-300","transition-colors","text-sm",3,"click"],[1,"text-xl","font-black"],[1,"text-sm","text-gray-500","mt-1","italic"],[1,"text-sm","text-gray-600","mt-2"],[1,"text-sm","text-gray-600"],[1,"text-xs","text-gray-500","mt-2"],[1,"flex","gap-2","mt-4"],[1,"px-3","py-1","border-2","border-black","rounded-lg","font-bold","hover:bg-gray-50","transition-colors",3,"routerLink"],[1,"px-3","py-1","border-2","border-blue-500","text-blue-600","rounded-lg","font-bold","hover:bg-blue-50","transition-colors",3,"click"],[1,"px-3","py-1","border-2","border-red-500","text-red-600","rounded-lg","font-bold","hover:bg-red-50","transition-colors",3,"click"]],template:function(e,n){e&1&&(c(0,"div",0)(1,"div",1)(2,"div")(3,"h1",2),m(4,"My Classes"),p(),c(5,"p",3),m(6,"Manage your classes"),p()(),V(7,kx,2,0,"button",4),p(),V(8,Tx,17,2,"div",5),c(9,"button",6),x("click",function(){return n.store.loadClasses()}),m(10," Refresh "),p(),V(11,Sx,2,0,"div",7),c(12,"div",8),me(13,Mx,3,1,"div",9,wx),V(15,Lx,2,0,"div",10),p()()),e&2&&(l(7),z(n.createMode()?-1:7),l(),z(n.createMode()?8:-1),l(3),z(n.store.loading()?11:-1),l(2),he(n.store.classes()),l(2),z(!n.store.loading()&&n.store.classes().length===0?15:-1))},dependencies:[te,kt,wt,tt,ft,et,st,sn],styles:[".classes-page[_ngcontent-%COMP%]{padding:24px}.header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.create-btn[_ngcontent-%COMP%]{padding:10px 16px;border:none;border-radius:8px;cursor:pointer}table[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;margin-top:20px}th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{padding:12px;border-bottom:1px solid #ddd;text-align:left}.actions[_ngcontent-%COMP%]{display:flex;gap:8px}button[_ngcontent-%COMP%]{cursor:pointer}"]})};var vo=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-teacher-classes-page"]],decls:2,vars:0,consts:[[1,"teacher-classes-page"]],template:function(e,n){e&1&&(c(0,"div",0),F(1,"app-classes-list"),p())},dependencies:[te,yo],styles:[".teacher-classes-page[_ngcontent-%COMP%]{width:100%}"]})};var _r=(t,r)=>r.id,Px=(t,r)=>r.attemptId,Fx=(t,r)=>r.studentId;function Rx(t,r){t&1&&(c(0,"div",4),m(1," Loading class details\u2026 "),p())}function Bx(t,r){t&1&&(c(0,"div",5),m(1," Class not found or failed to load. "),p())}function Ox(t,r){if(t&1&&(c(0,"p",11),m(1),p()),t&2){let e,n=d(2);l(),Q((e=n.store.currentClass())==null?null:e.description)}}function Vx(t,r){if(t&1&&(c(0,"div",12)(1,"p",25),m(2,"Class Code"),p(),c(3,"p",26),m(4),p()()),t&2){let e,n=d(2);l(4),$(" ",(e=n.store.currentClass())==null?null:e.code," ")}}function zx(t,r){t&1&&(c(0,"p",19),m(1," No students enrolled yet. Invite some! "),p())}function qx(t,r){if(t&1){let e=P();c(0,"div",20)(1,"div")(2,"p",27),m(3),p(),c(4,"p",28),m(5),p()(),c(6,"button",29),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.removeStudent(i.id))}),m(7," Remove "),p()()}if(t&2){let e=r.$implicit;l(3),Q(e.name||"\u2014"),l(2),Q(e.id)}}function Ax(t,r){t&1&&(c(0,"p",19),m(1," No lessons assigned yet. "),p())}function Nx(t,r){if(t&1){let e=P();c(0,"div",20)(1,"p",27),m(2),p(),c(3,"button",29),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.removeLesson(i.id))}),m(4," Remove "),p()()}if(t&2){let e=r.$implicit;l(2),Q(e.title)}}function Hx(t,r){t&1&&m(0," Loading\u2026 ")}function $x(t,r){t&1&&m(0," \u21BB Load Attempts ")}function jx(t,r){if(t&1&&(c(0,"div",23),m(1),p()),t&2){let e=d(2);l(),Q(e.quizError())}}function Ux(t,r){t&1&&(c(0,"p",19),m(1,' Press "Load Attempts" to see student quiz results. '),p())}function Qx(t,r){t&1&&(c(0,"p",19),m(1," No lessons in this class yet \u2014 add lessons first. "),p())}function Gx(t,r){if(t&1&&(c(0,"tr",35)(1,"td",36),m(2),p(),c(3,"td",37),m(4),p(),c(5,"td",38)(6,"span",39),m(7),p()(),c(8,"td",40),m(9),Vt(10,"date"),p()()),t&2){let e=r.$implicit;l(2),Q(e.studentName),l(2),Q(e.lessonTitle),l(2),C(e.score>=70?"bg-green-50 text-green-700 border-green-300":e.score>=40?"bg-yellow-50 text-yellow-700 border-yellow-300":"bg-red-50 text-red-600 border-red-300"),l(),$(" ",e.score,"% "),l(2),$(" ",tn(10,6,e.submittedAt,"MMM d, HH:mm")," ")}}function Wx(t,r){if(t&1&&(c(0,"div",24)(1,"table",30)(2,"thead",31)(3,"tr")(4,"th",32),m(5,"Student"),p(),c(6,"th",32),m(7,"Lesson"),p(),c(8,"th",33),m(9,"Score"),p(),c(10,"th",34),m(11,"Submitted"),p()()(),c(12,"tbody",18),me(13,Gx,11,9,"tr",35,Px),p()()()),t&2){let e=d(2);l(13),he(e.quizAttempts())}}function Kx(t,r){if(t&1){let e=P();c(0,"div",8)(1,"div",9)(2,"div")(3,"h1",10),m(4),p(),V(5,Ox,2,1,"p",11),p(),V(6,Vx,5,1,"div",12),p()(),c(7,"div",13)(8,"div",14)(9,"div",15)(10,"h2",16),m(11),p(),c(12,"button",17),x("click",function(){_(e);let i=d();return b(i.openInviteModal())}),m(13," + Invite Student "),p()(),c(14,"div",18),V(15,zx,2,0,"p",19),me(16,qx,8,2,"div",20,_r),p()(),c(18,"div",14)(19,"div",15)(20,"h2",16),m(21),p(),c(22,"button",17),x("click",function(){_(e);let i=d();return b(i.openLessonsModal())}),m(23," + Add Lesson "),p()(),c(24,"div",18),V(25,Ax,2,0,"p",19),me(26,Nx,5,1,"div",20,_r),p()()(),c(28,"div",14)(29,"div",15)(30,"div")(31,"h2",16),m(32,"Final Quiz Attempts"),p(),c(33,"p",21),m(34,"Only students and lessons in this class"),p()(),c(35,"button",22),x("click",function(){_(e);let i=d();return b(i.loadQuizAttempts())}),V(36,Hx,1,0)(37,$x,1,0),p()(),V(38,jx,2,1,"div",23),V(39,Ux,2,0,"p",19),V(40,Qx,2,0,"p",19),V(41,Wx,15,0,"div",24),p()}if(t&2){let e,n,i,o=d();l(4),Q((e=o.store.currentClass())==null?null:e.name),l(),z((n=o.store.currentClass())!=null&&n.description?5:-1),l(),z((i=o.store.currentClass())!=null&&i.code?6:-1),l(5),$("Students (",o.students().length,")"),l(4),z(o.students().length===0?15:-1),l(),he(o.students()),l(5),$("Lessons (",o.lessons().length,")"),l(4),z(o.lessons().length===0?25:-1),l(),he(o.lessons()),l(9),s("disabled",o.quizLoading()),l(),z(o.quizLoading()?36:37),l(2),z(o.quizError()?38:-1),l(),z(!o.quizLoading()&&!o.quizError()&&o.quizAttempts().length===0&&o.lessons().length>0?39:-1),l(),z(!o.quizLoading()&&!o.quizError()&&o.quizAttempts().length===0&&o.lessons().length===0?40:-1),l(),z(o.quizAttempts().length>0?41:-1)}}function Yx(t,r){if(t&1&&(c(0,"p",49),m(1),p()),t&2){let e=d(2);l(),Q(e.addStudentError())}}function Zx(t,r){t&1&&(c(0,"div",51),m(1,"Loading students\u2026"),p())}function Xx(t,r){if(t&1&&(c(0,"div",51),m(1),p()),t&2){let e=d(2);l(),$(' No students found matching "',e.studentSearch(),'" ')}}function Jx(t,r){if(t&1&&(c(0,"p",55),m(1),Vt(2,"date"),p()),t&2){let e=d().$implicit;l(),$(" Last active: ",tn(2,1,e.lastActiveAt,"MMM d")," ")}}function e2(t,r){t&1&&m(0," Adding\u2026 ")}function t2(t,r){t&1&&m(0," Add ")}function n2(t,r){if(t&1){let e=P();c(0,"div",52)(1,"div")(2,"p",27),m(3),p(),V(4,Jx,3,4,"p",55),p(),c(5,"button",56),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.addStudent(i))}),V(6,e2,1,0)(7,t2,1,0),p()()}if(t&2){let e=r.$implicit,n=d(2);l(3),In("",e.firstName," ",e.lastName),l(),z(e.lastActiveAt?4:-1),l(),s("disabled",n.addingStudentId()===e.studentId),l(),z(n.addingStudentId()===e.studentId?6:7)}}function i2(t,r){if(t&1){let e=P();c(0,"div",41,0),x("click",function(i){_(e);let o=Se(1),a=d();return b(i.target===o&&a.closeInviteModal())})("keyup.escape",function(){_(e);let i=d();return b(i.closeInviteModal())})("keydown.enter",function(i){_(e);let o=Se(1),a=d();return b(i.target===o&&a.closeInviteModal())}),c(2,"div",42)(3,"div",43)(4,"div")(5,"h2",44),m(6,"Invite a Student"),p(),c(7,"p",45),m(8,"Search by name and add to this class"),p()(),c(9,"button",46),x("click",function(){_(e);let i=d();return b(i.closeInviteModal())}),m(10," \xD7 "),p()(),c(11,"div",47)(12,"input",48),x("ngModelChange",function(i){_(e);let o=d();return b(o.studentSearch.set(i))}),p(),V(13,Yx,2,1,"p",49),p(),c(14,"div",50),V(15,Zx,2,0,"div",51),V(16,Xx,2,1,"div",51),me(17,n2,8,5,"div",52,Fx),p(),c(19,"div",53)(20,"button",54),x("click",function(){_(e);let i=d();return b(i.closeInviteModal())}),m(21," Done "),p()()()()}if(t&2){let e=d();l(12),s("ngModel",e.studentSearch()),l(),z(e.addStudentError()?13:-1),l(2),z(e.filteredStudents().length===0&&!e.studentSearch()?15:-1),l(),z(e.filteredStudents().length===0&&e.studentSearch()?16:-1),l(),he(e.filteredStudents())}}function o2(t,r){if(t&1&&(c(0,"p",49),m(1),p()),t&2){let e=d(2);l(),Q(e.addLessonError())}}function r2(t,r){t&1&&(c(0,"div",51),m(1,"Loading lessons\u2026"),p())}function a2(t,r){t&1&&(c(0,"div",51),m(1," No available lessons. All your lessons are already added or you have none. "),p())}function l2(t,r){if(t&1&&(c(0,"div",51),m(1),p()),t&2){let e=d(2);l(),$(' No lessons found matching "',e.lessonSearch(),'" ')}}function s2(t,r){t&1&&m(0," Adding\u2026 ")}function d2(t,r){t&1&&m(0," Add ")}function c2(t,r){if(t&1){let e=P();c(0,"div",52)(1,"div")(2,"p",27),m(3),p(),c(4,"div",59)(5,"span",60),m(6),p(),c(7,"span",61),m(8),p()()(),c(9,"button",56),x("click",function(){let i=_(e).$implicit,o=d(2);return b(o.addLesson(i.id))}),V(10,s2,1,0)(11,d2,1,0),p()()}if(t&2){let e=r.$implicit,n=d(2);l(3),Q(e.title),l(3),Q(e.subject),l(),C(e.status==="PUBLISHED"?"text-green-700 border-green-300 bg-green-50":"text-yellow-700 border-yellow-300 bg-yellow-50"),l(),$(" ",e.status," "),l(),s("disabled",n.addingLessonId()===e.id),l(),z(n.addingLessonId()===e.id?10:11)}}function p2(t,r){if(t&1){let e=P();c(0,"div",57,1),x("click",function(i){_(e);let o=Se(1),a=d();return b(i.target===o&&a.closeLessonsModal())})("keyup.escape",function(){_(e);let i=d();return b(i.closeLessonsModal())})("keydown.enter",function(i){_(e);let o=Se(1),a=d();return b(i.target===o&&a.closeLessonsModal())}),c(2,"div",42)(3,"div",43)(4,"div")(5,"h2",44),m(6,"Add a Lesson"),p(),c(7,"p",45),m(8,"Pick from your published lessons"),p()(),c(9,"button",46),x("click",function(){_(e);let i=d();return b(i.closeLessonsModal())}),m(10," \xD7 "),p()(),c(11,"div",47)(12,"input",58),x("ngModelChange",function(i){_(e);let o=d();return b(o.lessonSearch.set(i))}),p(),V(13,o2,2,1,"p",49),p(),c(14,"div",50),V(15,r2,2,0,"div",51),V(16,a2,2,0,"div",51),V(17,l2,2,1,"div",51),me(18,c2,12,7,"div",52,_r),p(),c(20,"div",53)(21,"button",54),x("click",function(){_(e);let i=d();return b(i.closeLessonsModal())}),m(22," Done "),p()()()()}if(t&2){let e=d();l(12),s("ngModel",e.lessonSearch()),l(),z(e.addLessonError()?13:-1),l(2),z(e.lessonsStore.loading()?15:-1),l(),z(!e.lessonsStore.loading()&&e.filteredLessons().length===0&&!e.lessonSearch()?16:-1),l(),z(!e.lessonsStore.loading()&&e.filteredLessons().length===0&&e.lessonSearch()?17:-1),l(),he(e.filteredLessons())}}var xo=class t{route=v(En);store=v(Bn);lessonsStore=v(_o);http=v(Je);userApi=v(mn);contentApi=v(Yt);classId;students=J(()=>this.store.currentClass()?.students??[]);lessons=J(()=>this.store.currentClass()?.lessons??[]);showInviteModal=Z(!1);allStudents=Z([]);studentSearch=Z("");addingStudentId=Z(null);addStudentError=Z(null);filteredStudents=J(()=>{let r=this.studentSearch().toLowerCase().trim(),e=new Set(this.students().map(n=>n.id));return this.allStudents().filter(n=>!e.has(n.studentId)).filter(n=>!r||`${n.firstName} ${n.lastName}`.toLowerCase().includes(r))});showLessonsModal=Z(!1);lessonSearch=Z("");addingLessonId=Z(null);addLessonError=Z(null);filteredLessons=J(()=>{let r=this.lessonSearch().toLowerCase().trim(),e=new Set(this.lessons().map(n=>n.id));return this.lessonsStore.items().filter(n=>!e.has(n.id)).filter(n=>!r||n.title.toLowerCase().includes(r)||n.subject.toLowerCase().includes(r))});quizAttempts=Z([]);quizLoading=Z(!1);quizError=Z(null);ngOnInit(){this.classId=this.route.snapshot.params.classId,this.store.loadClassDetail(this.classId),this.lessonsStore.load()}removeStudent(r){this.store.removeStudent(this.classId,r)}removeLesson(r){this.store.removeLesson(this.classId,r)}openInviteModal(){this.showInviteModal.set(!0),this.studentSearch.set(""),this.addStudentError.set(null),this.allStudents().length===0&&this.http.get(`${this.userApi}/progress/professor/students`).pipe(ct(()=>$e([]))).subscribe(r=>this.allStudents.set(r))}closeInviteModal(){this.showInviteModal.set(!1),this.addingStudentId.set(null),this.addStudentError.set(null)}addStudent(r){this.addingStudentId.set(r.studentId),this.addStudentError.set(null),this.store.addStudent(this.classId,r.studentId).subscribe({next:()=>{this.store.loadClassDetail(this.classId),this.addingStudentId.set(null)},error:()=>{this.addStudentError.set("Failed to add student. They may already be in this class."),this.addingStudentId.set(null)}})}openLessonsModal(){this.showLessonsModal.set(!0),this.lessonSearch.set(""),this.addLessonError.set(null),this.lessonsStore.load()}closeLessonsModal(){this.showLessonsModal.set(!1),this.addingLessonId.set(null),this.addLessonError.set(null)}addLesson(r){this.addingLessonId.set(r),this.addLessonError.set(null),this.store.addLesson(this.classId,r).subscribe({next:()=>{this.store.loadClassDetail(this.classId),this.addingLessonId.set(null)},error:()=>{this.addLessonError.set("Failed to add lesson. It may already be in this class."),this.addingLessonId.set(null)}})}loadQuizAttempts(){if(this.quizLoading())return;let r=this.lessons().map(i=>i.id),e=this.students().map(i=>i.id);if(r.length===0||e.length===0){this.quizAttempts.set([]);return}this.quizLoading.set(!0),this.quizError.set(null);let n=r.map(i=>this.http.get(`${this.contentApi}/lessons/${i}/final-quiz/attempts`).pipe(wn(o=>this.mapQuizAttempts(o,e,i))));an(n).subscribe({next:i=>{let o=i.flat().sort((a,u)=>new Date(u.submittedAt).getTime()-new Date(a.submittedAt).getTime());this.quizAttempts.set(o),this.quizLoading.set(!1)},error:()=>{this.quizError.set("Failed to load quiz attempts"),this.quizLoading.set(!1)}})}mapQuizAttempts(r,e,n){return r.filter(i=>i.studentId&&e.includes(i.studentId)).map(i=>({attemptId:i.id??i.attemptId??"",studentId:i.studentId??"",studentName:this.resolveStudentName(i.studentId??""),lessonId:n,lessonTitle:this.lessons().find(o=>o.id===n)?.title??n,score:i.score??i.totalScore??0,submittedAt:i.submittedAt??i.completedAt??""}))}resolveStudentName(r){let e=this.students().find(i=>i.id===r);if(e?.name)return e.name;let n=this.allStudents().find(i=>i.studentId===r);return n?`${n.firstName} ${n.lastName}`:r}static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-class-detail"]],decls:8,vars:5,consts:[["inviteBackdrop",""],["lessonBackdrop",""],[1,"p-6","md:p-8","max-w-7xl","mx-auto","space-y-6"],["routerLink","/teacher/classes",1,"inline-flex","items-center","gap-2","text-sm","font-bold","text-gray-600","hover:text-black","transition-colors"],[1,"bg-white","p-10","rounded-3xl","border-4","border-black","text-center","font-bold","text-gray-500"],[1,"bg-white","p-10","rounded-3xl","border-4","border-red-400","text-center","font-bold","text-red-500"],["tabindex","0","role","button","aria-label","Close invite modal",1,"fixed","inset-0","z-50","flex","items-center","justify-center","p-4","cursor-pointer",2,"background","rgba(0, 0, 0, 0.5)","backdrop-filter","blur(4px)"],["tabindex","0","role","button","aria-label","Close lesson modal",1,"fixed","inset-0","z-50","flex","items-center","justify-center","p-4","cursor-pointer",2,"background","rgba(0, 0, 0, 0.5)","backdrop-filter","blur(4px)"],[1,"bg-white","p-6","rounded-3xl","border-4","border-black","shadow"],[1,"flex","items-start","justify-between","gap-4","flex-wrap"],[1,"text-3xl","font-black"],[1,"text-gray-500","italic","mt-1"],[1,"bg-gray-50","border-2","border-dashed","border-gray-400","rounded-xl","px-4","py-2","text-center","shrink-0"],[1,"grid","grid-cols-1","md:grid-cols-2","gap-6"],[1,"bg-white","rounded-3xl","border-4","border-black","overflow-hidden"],[1,"flex","items-center","justify-between","p-5","border-b-4","border-black","bg-gray-50"],[1,"text-xl","font-black"],[1,"flex","items-center","gap-1.5","px-3","py-1.5","bg-[#0ABAB5]","text-white","font-black","text-sm","rounded-xl","border-2","border-black","hover:bg-[#089692]","transition-colors","cursor-pointer",3,"click"],[1,"divide-y","divide-gray-100"],[1,"p-6","text-gray-400","text-sm","font-medium","text-center"],[1,"flex","justify-between","items-center","px-5","py-3","hover:bg-gray-50","transition-colors"],[1,"text-xs","text-gray-500","mt-0.5"],[1,"flex","items-center","gap-1.5","px-3","py-1.5","bg-white","font-black","text-sm","rounded-xl","border-2","border-black","hover:bg-gray-50","transition-colors","cursor-pointer","disabled:opacity-50",3,"click","disabled"],[1,"p-5","text-red-500","font-bold","text-sm"],[1,"overflow-x-auto"],[1,"text-xs","text-gray-500","font-bold","uppercase","tracking-wider"],[1,"text-2xl","font-black","tracking-widest","text-black"],[1,"font-bold"],[1,"text-xs","text-gray-400","font-mono"],[1,"text-red-500","font-bold","text-sm","hover:text-red-700","hover:underline","transition-colors",3,"click"],[1,"w-full","text-sm"],[1,"bg-gray-50","border-b-2","border-black"],[1,"text-left","px-5","py-3","font-black"],[1,"text-center","px-5","py-3","font-black"],[1,"text-right","px-5","py-3","font-black"],[1,"hover:bg-gray-50","transition-colors"],[1,"px-5","py-3","font-semibold"],[1,"px-5","py-3","text-gray-600"],[1,"px-5","py-3","text-center"],[1,"inline-block","px-2","py-0.5","rounded-lg","font-black","text-xs","border-2"],[1,"px-5","py-3","text-right","text-gray-500","font-mono","text-xs"],["tabindex","0","role","button","aria-label","Close invite modal",1,"fixed","inset-0","z-50","flex","items-center","justify-center","p-4","cursor-pointer",2,"background","rgba(0, 0, 0, 0.5)","backdrop-filter","blur(4px)",3,"click","keyup.escape","keydown.enter"],[1,"bg-white","rounded-3xl","border-4","border-black","shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]","w-full","max-w-lg","max-h-[80vh]","flex","flex-col","cursor-auto"],[1,"flex","items-center","justify-between","p-6","border-b-4","border-black"],[1,"text-2xl","font-black"],[1,"text-sm","text-gray-500","mt-0.5"],[1,"text-2xl","font-black","text-gray-400","hover:text-black","transition-colors","leading-none",3,"click"],[1,"p-4","border-b","border-gray-200"],["placeholder","Search by name\u2026","aria-label","Search students","id","student-search-input",1,"w-full","px-4","py-2.5","border-2","border-black","rounded-xl","font-medium","text-sm","focus:outline-none","focus:ring-2","focus:ring-[#0ABAB5]",3,"ngModelChange","ngModel"],[1,"mt-2","text-xs","font-bold","text-red-600"],[1,"overflow-y-auto","flex-1"],[1,"p-6","text-center","text-gray-400","font-medium","text-sm"],[1,"flex","items-center","justify-between","px-5","py-3","border-b","border-gray-100","hover:bg-gray-50","transition-colors"],[1,"p-4","border-t","border-gray-200","text-right"],[1,"px-4","py-2","bg-gray-100","text-black","font-black","rounded-xl","border-2","border-black","hover:bg-gray-200","transition-colors","cursor-pointer","text-sm",3,"click"],[1,"text-xs","text-gray-400"],[1,"px-3","py-1.5","bg-[#0ABAB5]","text-white","font-black","text-sm","rounded-lg","border-2","border-black","hover:bg-[#089692]","transition-colors","cursor-pointer","disabled:opacity-50","disabled:cursor-not-allowed",3,"click","disabled"],["tabindex","0","role","button","aria-label","Close lesson modal",1,"fixed","inset-0","z-50","flex","items-center","justify-center","p-4","cursor-pointer",2,"background","rgba(0, 0, 0, 0.5)","backdrop-filter","blur(4px)",3,"click","keyup.escape","keydown.enter"],["placeholder","Search by title or subject\u2026","aria-label","Search lessons","id","lesson-search-input",1,"w-full","px-4","py-2.5","border-2","border-black","rounded-xl","font-medium","text-sm","focus:outline-none","focus:ring-2","focus:ring-[#0ABAB5]",3,"ngModelChange","ngModel"],[1,"flex","items-center","gap-2","mt-0.5"],[1,"text-xs","text-gray-500"],[1,"text-xs","font-bold","px-1.5","py-0.5","rounded","border"]],template:function(e,n){e&1&&(c(0,"div",2)(1,"a",3),m(2," \u2190 Back to Classes "),p(),V(3,Rx,2,0,"div",4),V(4,Bx,2,0,"div",5),V(5,Kx,42,13),p(),V(6,i2,22,4,"div",6),V(7,p2,23,5,"div",7)),e&2&&(l(3),z(n.store.loading()?3:-1),l(),z(!n.store.loading()&&!n.store.currentClass()?4:-1),l(),z(!n.store.loading()&&n.store.currentClass()?5:-1),l(),z(n.showInviteModal()?6:-1),l(),z(n.showLessonsModal()?7:-1))},dependencies:[te,kt,wt,tt,ft,et,st,sn],styles:[".detail-page[_ngcontent-%COMP%]{padding:24px}.section[_ngcontent-%COMP%]{margin-top:32px}.card[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:12px;margin-top:12px;border:1px solid #ddd;border-radius:8px}button[_ngcontent-%COMP%]{cursor:pointer}"]})};var Co=class t{static \u0275fac=function(e){return new(e||t)};static \u0275cmp=E({type:t,selectors:[["app-teacher-class-detail-page"]],decls:2,vars:0,consts:[[1,"teacher-class-detail-page"]],template:function(e,n){e&1&&(c(0,"div",0),F(1,"app-class-detail"),p())},dependencies:[te,xo],styles:[".teacher-class-detail-page[_ngcontent-%COMP%]{width:100%}"]})};var c8=[{path:"dashboard",component:so},{path:"analytics",component:zi},{path:"content",component:qi},{path:"profile",loadComponent:()=>import("./chunk-WMQBAKSB.js").then(t=>t.TeacherProfileComponent)},{path:"lessons",component:bo},{path:"lessons/new",component:pi,canDeactivate:[rr]},{path:"lessons/:id/edit",component:pi,canDeactivate:[rr]},{path:"path-builder",component:Ai},{path:"learning-paths/new",component:di},{path:"learning-paths/:id/edit",component:di},{path:"",redirectTo:"dashboard",pathMatch:"full"},{path:"classes",component:vo},{path:"classes/:classId",component:Co},{path:"chat",loadComponent:()=>import("./chunk-PFV7LPMT.js").then(t=>t.ChatPageComponent)}];export{c8 as default};
