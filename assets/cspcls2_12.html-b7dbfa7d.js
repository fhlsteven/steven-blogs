import{_ as e,o as t,c as s,d as i}from"./app-35fb03de.js";const o={},r=i('<h1 id="第12章-安全性-chapter-12-security" tabindex="-1"><a class="header-anchor" href="#第12章-安全性-chapter-12-security" aria-hidden="true">#</a> 第12章 安全性(CHAPTER 12 Security)</h1><p>Security is an important topic, especially so because today’s code comes from multiple sources, including the Internet. Therefore, addressing security needs was an important design goal for .NET. These needs are addressed on the code level itself, as well as on the user permission level.</p><p>Because the security provided by .NET could fill a book on its own, this chapter only introduces you to the concepts and possibilities. There are no code examples. I don’t want to convey the false impression that security is an afterthought, and short, unrelated examples would give that impression.</p><p>Therefore, the following topics are covered in this chapter from a conceptual viewpoint:</p><ul><li>Code-access security</li><li>Role-based security</li></ul><h2 id="_12-1-代码访问安全机制-code-access-security" tabindex="-1"><a class="header-anchor" href="#_12-1-代码访问安全机制-code-access-security" aria-hidden="true">#</a> 12.1 代码访问安全机制(Code-Access Security)</h2><p>Today, code can come to a user’s desk not only via a setup application executed from a company’s network server, but also from the Internet via a Web page or an email. Recent experiences have shown that this can be quite dangerous. So how can this threat be answered with .NET?</p><p>The .NET solution is code-access security. It controls access to protected resources and operations. Code is trusted to varying degrees, depending on its identity and where it comes from. The amount of code that must be fully trusted is reduced to a minimum.</p><p>The following are the most notable functions of code access security:</p><ul><li>Administrators can define security policies that assign certain permissions to defined groups of code.</li><li>Code can demand that a caller must have specific permissions.</li><li>Code execution is restricted by the runtime. Checks are performed that verify the granted permissions of a caller match the required permissions for the operations.</li><li>Code can request the permissions it requires to run and the permissions that would be useful, as well as explicitly state which permissions it must never have.</li><li>Permissions are defined that represent certain rights to access various system resources.</li><li>Code-access security grants permissions when a component is loaded. This granting is based on the requests by the code, as well as the permitted operations defined by the security policy.</li></ul><p>From reading this list, you can see that less-trusted code will be prevented from calling highly trusted code because permissions of the less-trusted code are enforced. You will especially like that for Internet scenarios.</p><p>The two important points of code-access security are verification of the type safety of managed code, and the permissions that are requested by the code. The minimum requirement for you to benefit from code-access security is to generate type-safe code.</p><h3 id="_12-1-1-类型安全的确认-verification-of-type-safety" tabindex="-1"><a class="header-anchor" href="#_12-1-1-类型安全的确认-verification-of-type-safety" aria-hidden="true">#</a> 12.1.1 类型安全的确认(Verification of Type Safety)</h3><p>The first step for the runtime in enforcing security restrictions on managed code is being able to determine whether the code is type safe. This matters because the runtime must be able to check the permissions of callers reliably.</p><p>The runtime checks permissions for all callers in the call stack to circumvent the security hole that is created when less-trusted code calls highly trusted code. For this stack-walking, the managed code must be verifiably type safe—every access to types is performed only in allowed ways.</p><p>The good news is that the C# code you write is type safe unless you want to write unsafe code. Both the IL and the metadata are inspected before the okay is given regarding the type safety of code.</p><h3 id="_12-1-2-许可-permissions" tabindex="-1"><a class="header-anchor" href="#_12-1-2-许可-permissions" aria-hidden="true">#</a> 12.1.2 许可(Permissions)</h3><p>The next step is to work actively with permissions. The benefit from actively requesting permissions is that you know when you have proper permissions to perform your code’s actions, or how to degrade gracefully when you don’t get them. Additionally, you can prevent your code from getting extra permissions it wouldn’t need. Minimal permissions guarantee that your code will run on tightly restricted systems where code that requests too much permission without need will fail.</p><p>Although I mentioned the kinds of permissions already, here is the list again:</p><ul><li>Required—Permissions that your code needs to run properly.</li><li>Optional—Permissions that are not mandatory for the proper execution of your code, but that would be good to have.</li><li>Refused—Permissions that you want to ensure your code is never granted—even if the security policy would allow it. You can use this to restrict potential vulnerabilities.</li></ul><p>The interesting question is which permissions can be requested by code,which permissions are granted by the code’s identity, and which permissions derive from the user’s identity. Only the first two belong to code-access security; the latter is tied to role-based security.</p><p>Therefore, the two kinds of code-access security permissions are</p><ul><li>Standard permissions</li><li>Identity permissions</li></ul><h4 id="standard-permissions" tabindex="-1"><a class="header-anchor" href="#standard-permissions" aria-hidden="true">#</a> Standard Permissions</h4><p>Securing access to resources that are exposed by the .NET framework is taken care of by the code-access permissions. With those permissions, you gain either access to a protected resource, or the right to perform a protected operation. Your code can demand any permission at runtime, and the runtime decides whether your code gets that permission.</p><p>Table 12.1 shows a list of standard permissions and a brief description of each. Note, for example, that the net classes have separate network access security.</p><p>Table 12.1 Standard Permissions</p><table><thead><tr><th>Permission</th><th>Description</th></tr></thead><tbody><tr><td>EnvironmentPermission</td><td>This class defines access permissions to environment variables. Two types of access are possible: read-only access to the value of an environment variable, and write access. Write access includes permissions to create and delete environment variables.</td></tr><tr><td>FileDialogPermission</td><td>Controls access to files based on the system file dialog. The user must authorize the file access via that dialog.</td></tr><tr><td>FileIOPermission</td><td>Three different types of file I/O access may be specified: read, write, and append. Read access includes access to file information; write access includes delete and overwrite; and append access limits you to appending—you are not allowed to read other bits.</td></tr><tr><td>IsolatedStoragePermission</td><td>Controls access to the isolated storage (per user). Restrictions include allowed usage, storage quota size, expiration of data, and data retaining.</td></tr><tr><td>ReflectionPermission</td><td>Controls the capability to read the type information of nonpublic members of types. In addition, it controls the use of <code>Reflection.Emit</code>.</td></tr><tr><td>RegistryPermission</td><td>Reading, creating, and writing in the Registry are controlled with this permission. Each type of access must be specified separately for a list of keys and values.</td></tr><tr><td>SecurityPermission</td><td>SecurityPermission is a collection of simple permission flags that are used by the security system. You can control the execution of code, override of security checks, invocation of unmanaged code,verification skipping, serialization,and more.</td></tr><tr><td>UIPermission</td><td>Defines the access to various aspects of the user interface, including the use of windows, access to events, as well as the use of the Clipboard.</td></tr></tbody></table><h4 id="identity-permissions" tabindex="-1"><a class="header-anchor" href="#identity-permissions" aria-hidden="true">#</a> Identity Permissions</h4><p>Identity permissions cannot be requested—they are granted based on evidence from the application code. This kind of permission is a secure way for .NET to determine the identity of managed code, including its origin (possibly a Web site) and its publisher, based on the signature of the code.</p><p>Table 12.2 shows the identity permissions and their descriptions.</p><p><em><strong>Table 12.2 Identity Permissions</strong></em></p><table><thead><tr><th>Permission</th><th>Description</th></tr></thead><tbody><tr><td>PublisherIdentityPermission</td><td>The signature on an .NET component provides proof of the software’s publisher.</td></tr><tr><td>StrongNameIdentityPermission</td><td>Defines the cryptographically strong name of a component. The strong name key and the simple name part comprise the identity.</td></tr><tr><td>ZoneIdentityPermission</td><td>Defines the zone from which the code originates. A URL can belong to only one zone.</td></tr><tr><td>SiteIdentityPermission</td><td>Permissions derived based on the Web site from which the code originates.</td></tr><tr><td>URLIdentityPermission</td><td>Permissions derived based on the URL from which the code originates.</td></tr></tbody></table><h2 id="_12-2-基于角色的安全机制-role-based-security" tabindex="-1"><a class="header-anchor" href="#_12-2-基于角色的安全机制-role-based-security" aria-hidden="true">#</a> 12.2 基于角色的安全机制(Role-Based Security)</h2><p>The system of role-based security might be already familiar for you because the .NET role-based security system is, to some degree, similar to the one found in COM+. However, there are some differences you need to be aware of, so read on.</p><p>The .NET role-based security is modeled around a principal, which represents either a user, or an agent that is acting on behalf of a given user. An .NET application makes security decisions based on either the principal’s identity, or its role membership.</p><p>So, what is a role? For example, a bank has clerks and managers. A clerk can prepare a loan application, but the manager must approve it. It doesn’t matter which instance of manager (principal) approves it, but he or she must be a member of the manager role.</p><p>In more technical terms, a role is a named set of users who share the same privileges. One principal can be a member of multiple roles and, therefore, you can use role membership to determine whether certain requested actions may be performed for a principal.</p><p>I have already mentioned briefly that a principal is not necessarily a user, but it can be also an agent. More generally, there are three kinds of principals:</p><ul><li>Generic principals—These represent unauthenticated users, as well as the roles available to them.</li><li>Windows principals—Map to Windows users and their groups (roles). Impersonation (accessing a resource on another user’s behalf) is supported.</li><li>Custom principals—Defined by an application. They can extend the basic notion of the identity and the roles that the principal is in.The restriction is that your application must provide an authentication module as well as the types that implement the principal.</li></ul><p>How does it work for you in your application? .NET provides you with the <code>PrincipalPermission</code> class, which provides consistency with code-access security. It enables the runtime to perform authorization in a way similar to code-access security checks, but you can directly access a principal’s identity information and perform role and identity checks in your code when you need to do so.</p><h2 id="_12-3-小结-summary" tabindex="-1"><a class="header-anchor" href="#_12-3-小结-summary" aria-hidden="true">#</a> 12.3 小结(Summary)</h2><p>In this final chapter of this book, I introduced you to the concepts of security that are part of .NET. I took you on a tour of code-access security and role-based security. You learned about standard and identity permissions, which are used to enforce code-access security, as well as about principals and roles in role-based security scenarios.</p>',43),a=[r];function n(d,c){return t(),s("div",null,a)}const l=e(o,[["render",n],["__file","cspcls2_12.html.vue"]]);export{l as default};