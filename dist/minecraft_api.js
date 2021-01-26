class Message{constructor(e){this.function=e}set_response_function(e){this.function=e}has_response_function(){return!!self.function}get_response_function(){return this.function}}class EventHandler extends Message{constructor(e,s=null){super(s),this.event=e}get_message(){return this.event}}class Command extends Message{constructor(e,s,t=null){super(t),this.command=e,this.arguments=s}get_message(){return this.command}get_arguments(){return this.arguments}}class MinecraftAPIClient{constructor(){this.messages=[]}async open_connection(){return this.socket&&this.socket.close(),new Promise(((e,s)=>{this.socket=new WebSocket("http://localhost:3000"),this.socket.onmessage=function(e){e=JSON.parse(e),parent.postMessage(e)},this.socket.onopen=()=>{e()},this.socket.onerror=()=>{s()}}))}generate_message(e,s){var t=e.get_message();if(e instanceof EventHandler)var n="subscribe";else if(e instanceof Command){n="commandRequest";e.get_arguments().forEach((e=>{t+=" "+e}))}return{header:{messagePurpose:n,messageType:"commandRequest",requestId:s,version:1},body:{message_type:t,version:1}}}add_message(e){if(this.messages.includes(e))throw"Event already exists";this.messages.push(e)}send_message(e){this.socket.send(JSON.stringify(e))}start(){this.open_connection().then((e=>{this.messages.forEach(((e,s)=>{e=this.generate_message(e,s),this.send_message(e)}))}),(e=>{console.log("Error connecting to the server, is it running?")}))}}
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1lc3NhZ2UuanMiLCJldmVudC5qcyIsImNvbW1hbmQuanMiLCJtaW5lY3JhZnRfYXBpLmpzIl0sIm5hbWVzIjpbIk1lc3NhZ2UiLCJbb2JqZWN0IE9iamVjdF0iLCJmdW5jIiwidGhpcyIsImZ1bmN0aW9uIiwic2VsZiIsIkV2ZW50SGFuZGxlciIsImV2ZW50Iiwic3VwZXIiLCJDb21tYW5kIiwiY29tbWFuZCIsImFyZ3MiLCJhcmd1bWVudHMiLCJNaW5lY3JhZnRBUElDbGllbnQiLCJtZXNzYWdlcyIsInNvY2tldCIsImNsb3NlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJXZWJTb2NrZXQiLCJvbm1lc3NhZ2UiLCJtZXNzYWdlIiwiSlNPTiIsInBhcnNlIiwicGFyZW50IiwicG9zdE1lc3NhZ2UiLCJvbm9wZW4iLCJvbmVycm9yIiwiaWQiLCJtZXNzYWdlX3ZhbHVlIiwiZ2V0X21lc3NhZ2UiLCJtZXNzYWdlX3B1cnBvc2UiLCJnZXRfYXJndW1lbnRzIiwiZm9yRWFjaCIsImFyZ3VtZW50IiwiaGVhZGVyIiwibWVzc2FnZVB1cnBvc2UiLCJtZXNzYWdlVHlwZSIsInJlcXVlc3RJZCIsInZlcnNpb24iLCJib2R5IiwibWVzc2FnZV90eXBlIiwiaW5jbHVkZXMiLCJwdXNoIiwic2VuZCIsInN0cmluZ2lmeSIsIm9wZW5fY29ubmVjdGlvbiIsInRoZW4iLCJzdWNjZXNzIiwiaSIsImdlbmVyYXRlX21lc3NhZ2UiLCJzZW5kX21lc3NhZ2UiLCJleGNlcHRpb24iLCJjb25zb2xlIiwibG9nIl0sIm1hcHBpbmdzIjoiQUFNQSxNQUFBQSxRQUVBQyxZQUFBQyxHQUNBQyxLQUFBQyxTQUFBRixFQVNBRCxzQkFBQUMsR0FDQUMsS0FBQUMsU0FBQUYsRUFTQUQsd0JBQ0EsUUFBQUksS0FBQUQsU0FVQUgsd0JBQ0EsT0FBQUUsS0FBQUMsVUNwQ0EsTUFBQUUscUJBQUFOLFFBUUFDLFlBQUFNLEVBQUFMLEVBQUEsTUFDQU0sTUFBQU4sR0FDQUMsS0FBQUksTUFBQUEsRUFRQU4sY0FDQSxPQUFBRSxLQUFBSSxPQ25CQSxNQUFBRSxnQkFBQVQsUUFXQUMsWUFBQVMsRUFBQUMsRUFBQVQsRUFBQSxNQUNBTSxNQUFBTixHQUNBQyxLQUFBTyxRQUFBQSxFQUNBUCxLQUFBUyxVQUFBRCxFQVFBVixjQUNBLE9BQUFFLEtBQUFPLFFBUUFULGdCQUNBLE9BQUFFLEtBQUFTLFdDeEJBLE1BQUFDLG1CQUVBWixjQUNBRSxLQUFBVyxTQUFBLEdBT0FiLHdCQUtBLE9BSEFFLEtBQUFZLFFBQ0FaLEtBQUFZLE9BQUFDLFFBRUEsSUFBQUMsU0FBQSxDQUFBQyxFQUFBQyxLQUNBaEIsS0FBQVksT0FBQSxJQUFBSyxVQUFBLHlCQUVBakIsS0FBQVksT0FBQU0sVUFBQSxTQUFBQyxHQUNBQSxFQUFBQyxLQUFBQyxNQUFBRixHQUNBRyxPQUFBQyxZQUFBSixJQUdBbkIsS0FBQVksT0FBQVksT0FBQSxLQUNBVCxLQUdBZixLQUFBWSxPQUFBYSxRQUFBLEtBQ0FULFFBV0FsQixpQkFBQXFCLEVBQUFPLEdBR0EsSUFBQUMsRUFBQVIsRUFBQVMsY0FHQSxHQUFBVCxhQUFBaEIsYUFDQSxJQUFBMEIsRUFBQSxpQkFJQSxHQUFBVixhQUFBYixRQUFBLENBQ0F1QixFQUFBLGlCQUVBVixFQUFBVyxnQkFBQUMsU0FBQUMsSUFDQUwsR0FBQSxJQUFBSyxLQUlBLE1BQUEsQ0FDQUMsT0FBQSxDQUNBQyxlQUFBTCxFQUNBTSxZQUFBLGlCQUNBQyxVQUFBVixFQUNBVyxRQUFBLEdBRUFDLEtBQUEsQ0FDQUMsYUFBQVosRUFDQVUsUUFBQSxJQVVBdkMsWUFBQXFCLEdBQ0EsR0FBQW5CLEtBQUFXLFNBQUE2QixTQUFBckIsR0FDQSxLQUFBLHVCQUNBbkIsS0FBQVcsU0FBQThCLEtBQUF0QixHQVdBckIsYUFBQXFCLEdBQ0FuQixLQUFBWSxPQUFBOEIsS0FBQXRCLEtBQUF1QixVQUFBeEIsSUFRQXJCLFFBRUFFLEtBQUE0QyxrQkFBQUMsTUFDQUMsSUFDQTlDLEtBQUFXLFNBQUFvQixTQUFBLENBQUFaLEVBQUE0QixLQUVBNUIsRUFBQW5CLEtBQUFnRCxpQkFBQTdCLEVBQUE0QixHQUVBL0MsS0FBQWlELGFBQUE5QixTQUdBK0IsSUFDQUMsUUFBQUMsSUFBQSIsImZpbGUiOiJtaW5lY3JhZnRfYXBpLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBQYXJlbnQgY2xhc3MgZm9yIGJvdGggRXZlbnRIYW5kbGVyIGFuZCBDb21tYW5kLCB3aGljaCBkZWZpbmVzXG4gKiB0aGUgY2FsbGJhY2sgZnVuY3Rpb24gYW5kIGFkZGl0aW9uYWwgZnVuY3Rpb25hbGl0aWVzLiBUaGlzIHdvdWxkIG5vcm1hbGx5IFxuICogYmUgYSBnZW5lcmljLCBidXQgYXMgR2VuZXJpY3MgYXJlIG5vdCBhdmFpbGFibGUgaW4gSmF2YVNjcmlwdCB0aGlzIGlzIGRlZmluZWQgXG4gKiBhcyBhIHBhcmVudC4gVGhpcyBpcyBub3QgdG8gYmUgdXNlZCBpbiBjb2RlLlxuICovXG5jbGFzcyBNZXNzYWdlIHtcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihmdW5jKSB7XG4gICAgICAgIHRoaXMuZnVuY3Rpb24gPSBmdW5jO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uIG9uY2UgdGhlIG9iamVjdCAgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkLlxuICAgICAqICBcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIGZ1bmN0aW9uIHRvIGJlIHJ1biBvbiBzdWNjZXNzZnVsIHJlc3BvbnNlXG4gICAgICogXG4gICAgICovXG4gICAgc2V0X3Jlc3BvbnNlX2Z1bmN0aW9uKGZ1bmMpIHtcbiAgICAgICAgdGhpcy5mdW5jdGlvbiA9IGZ1bmM7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIGZ1bmN0aW9uIGhhcyBhIGRlZmluZWQgY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogXG4gICAgICogQHJldHVybnMgVHJ1ZSBpZiBmdW5jdGlvbiBoYXMgZGVmaW5lZCBjYWxsYmFjayBmdW5jdGlvbiwgZWxzZSBmYWxzZS5cbiAgICAgKi9cbiAgICBoYXNfcmVzcG9uc2VfZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmKCFzZWxmLmZ1bmN0aW9uKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIG9iamVjdC5cbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBDYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICBnZXRfcmVzcG9uc2VfZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZ1bmN0aW9uO1xuICAgIH1cbn0iLCIvKipcbiAqIEV2ZW50IEhhbmRsZXIgb2JqZWN0LiBDYW4gYmUgdXNlZCBpbiB0aGUgTWluZWNyYWZ0QVBJQ2xpZW50IHRvIGNyZWF0ZSBhIGhvb2tcbiAqIGZvciBldmVudHMgaW4gbWluZWNyYWZ0IGVkdWNhdGlvbi5cbiAqL1xuY2xhc3MgRXZlbnRIYW5kbGVyIGV4dGVuZHMgTWVzc2FnZSB7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIEV2ZW50SGFuZGxlciBvYmplY3Qgd2hpY2ggY2FuIGJlIHNlbnQgdG8gbWluZWNyYWZ0IGVkdWNhdGlvbi5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgLSBFdmVudCB0byBob29rIGluIG1pbmVjcmFmdCBlZHVjYXRpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gYmUgcnVuIG9uIHN1Y2Nlc3MgXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZXZlbnQsIGZ1bmMgPSBudWxsKSB7XG4gICAgICAgIHN1cGVyKGZ1bmMpXG4gICAgICAgIHRoaXMuZXZlbnQgPSBldmVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBldmVudCBuYW1lLlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFN0cmluZyBuYW1lIGZvciBldmVudCB0byBoYW5kbGVcbiAgICAgKi9cbiAgICBnZXRfbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gICAgfVxufSIsIi8qKlxuICogQ29tbWFuZCBvYmplY3QuIENhbiBiZSB1c2VkIGluIHRoZSBNaW5lY3JhZnRBUElDbGllbnQgdG8gcnVuIGNvZGUgXG4gKiBpbiBtaW5lY3JhZnQgZWR1Y2F0aW9uLlxuICovXG5jbGFzcyBDb21tYW5kIGV4dGVuZHMgTWVzc2FnZSB7XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBDcmVhdGVzIGEgQ29tbWFuZCBvYmplY3QsIHdoaWNoIGNhbiBiZSBzZW50IHRvIG1pbmVjcmFmdCBlZHVjYXRpb24gdG9cbiAgICAgKiBtYW5pcHVsYXRlIHRoZSBnYW1lLiBcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gY29tbWFuZCAtIENvbW1hbmQgdG8gYmUgcnVuIG9uIHNlcnZlciBcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBhcmdzIC0gQXJyYXkgb2YgYXJndW1lbnRzIGZvciB0aGUgY29tbWFuZFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgLSBDYWxsYmFjayBmdW5jdGlvbiBvbiBzdWNjZXNzIChkZWZhdWx0IG51bGwpXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY29tbWFuZCwgYXJncywgZnVuYyA9IG51bGwpIHtcbiAgICAgICAgc3VwZXIoZnVuYyk7XG4gICAgICAgIHRoaXMuY29tbWFuZCA9IGNvbW1hbmQ7XG4gICAgICAgIHRoaXMuYXJndW1lbnRzID0gYXJncztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjb21tYW5kIGZvciB0aGUgb2JqZWN0LlxuICAgICAqIFxuICAgICAqIEByZXR1cm5zIFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgY29tbWFuZC5cbiAgICAgKi9cbiAgICBnZXRfbWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWFuZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBhcmd1bWVudCBhcnJheSBmb3IgdGhlIGNvbW1hbmQuXG4gICAgICogXG4gICAgICogQHJldHVybnMgQXJyYXkgd2l0aCBhcmd1bWVudHMgZm9yIHRoZSBjb21tYW5kLlxuICAgICAqL1xuICAgIGdldF9hcmd1bWVudHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFyZ3VtZW50cztcbiAgICB9XG5cbn0iLCIvKipcbiAqIFRoaXMgaXMgdGhlIGJhc2ljIE1pbmVjcmFmdEFQSUNsaWVudCBjbGFzcyB0aGF0IGFsbG93cyB1c2VycyB0b1xuICogd3JpdGUgY29kZSBhbmQgY29tbXVuaWNhdGUgd2l0aCB0aGUgZ2FtZS5cbiAqIFxuICogVGhlIG1haW4gaWRlYSBpcyB0aGF0XG4gKiB5b3UgY3JlYXRlIGZ1bmN0aW9ucyB0aGF0IGFyZSBjYWxsZWQgd2hlbiBhbiBldmVudCBvY2N1cnMgb3IgXG4gKiBhZnRlciBhIGNvbW1hbmQgaXMgcnVuLiBUaGVzZSBldmVudCBob29rcyBhbmQgY29tbWFuZHMgYXJlIHNlbnRcbiAqIHRvIHRoZSBzZXJ2ZXIgdG8gYmUgcnVuLCBpZiB0aGV5IHN1Y2NlZWQgdGhlIEpTIGNhbGxzIHRoZSBmdW5jdGlvbi5cbiAqIElmIHRoZSBjb21tYW5kIG9yIGhvb2sgZmFpbHMsIHRoZW4gdGhlIGZ1bmN0aW9uIGlzIG5vdCBjYWxsZWQgYW5kIFxuICogYW4gZXJyb3IgaXMgcHJpbnRlZCB0byB0aGUgY29uc29sZS5cbiAqICBcbiAqL1xuY2xhc3MgTWluZWNyYWZ0QVBJQ2xpZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW11cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcGVucyBhIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlciwgYXN5bmMgc3VjY2VzcyBpcyBhbiBvcGVuIGNvbm5lY3Rpb25cbiAgICAgKiB0aGUgcmVqZWN0IGlzIGEgZmFpbGVkIGNvbm5lY3Rpb24gd2l0aCBhbnkgZXJyb3IuIFxuICAgICAqL1xuICAgIGFzeW5jIG9wZW5fY29ubmVjdGlvbigpIHtcbiAgICAgICAgLy8gQ2xvc2VzIHRoZSBzb2NrZXQgaWYgaXQgYWxyZWFkeSBleGlzdHMgLy9cbiAgICAgICAgaWYodGhpcy5zb2NrZXQpXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5jbG9zZSgpO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNvY2tldCA9IG5ldyBXZWJTb2NrZXQoXCJodHRwOi8vbG9jYWxob3N0OjMwMDBcIik7XG5cbiAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlID0gSlNPTi5wYXJzZShtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQucG9zdE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zb2NrZXQub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBldmVudCBpbnRvIGEgbWVzc2FnZSBmb3IgdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0ge01lc3NhZ2V9IG1lc3NhZ2VcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJucyBKU09OIG9iamVjdCBmb3IgTWluZWNyYWZ0IEFQSVxuICAgICAqL1xuICAgIGdlbmVyYXRlX21lc3NhZ2UobWVzc2FnZSwgaWQpIHtcblxuICAgICAgICAvLyBTZXRzIHRoZSBkZWZhdWx0IG1lc3NhZ2UgYm9keSB2YWx1ZSAvL1xuICAgICAgICB2YXIgbWVzc2FnZV92YWx1ZSA9IG1lc3NhZ2UuZ2V0X21lc3NhZ2UoKTtcblxuICAgICAgICAvLyBJZiB0aGUgbmV3IG1lc3NhZ2UgaXMgYW4gRXZlbnQgSGFuZGxlciAvL1xuICAgICAgICBpZihtZXNzYWdlIGluc3RhbmNlb2YgRXZlbnRIYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZV9wdXJwb3NlID0gXCJzdWJzY3JpYmVcIlxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfdHlwZSA9IFwiZXZlbnROYW1lXCJcbiAgICAgICAgfVxuICAgICAgICAvLyBFbHNlIHdlIGFyZSBzZW5kaW5nIGEgY29tbWFuZCAvL1xuICAgICAgICBlbHNlIGlmIChtZXNzYWdlIGluc3RhbmNlb2YgQ29tbWFuZCkge1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfcHVycG9zZSA9IFwiY29tbWFuZFJlcXVlc3RcIlxuICAgICAgICAgICAgdmFyIG1lc3NhZ2VfdHlwZSA9IFwiY29tbWFuZExpbmVcIlxuICAgICAgICAgICAgbWVzc2FnZS5nZXRfYXJndW1lbnRzKCkuZm9yRWFjaCgoYXJndW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIG1lc3NhZ2VfdmFsdWUgKz0gXCIgXCIgKyBhcmd1bWVudDtcbiAgICAgICAgICAgIH0pKSBcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBcImhlYWRlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlUHVycG9zZVwiOiBtZXNzYWdlX3B1cnBvc2UsXG4gICAgICAgICAgICAgICAgXCJtZXNzYWdlVHlwZVwiOiBcImNvbW1hbmRSZXF1ZXN0XCIsXG4gICAgICAgICAgICAgICAgXCJyZXF1ZXN0SWRcIjogaWQsXG4gICAgICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICBtZXNzYWdlX3R5cGU6IG1lc3NhZ2VfdmFsdWUsXG4gICAgICAgICAgICAgICAgXCJ2ZXJzaW9uXCI6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBtZXNzYWdlIHRvIHRoZSBxdWV1ZSBvZiBtZXNzYWdlcyB0byBiZSBzZW50IHRvIHRoZVxuICAgICAqIHNlcnZlci5cbiAgICAgKiBAcGFyYW0ge01lc3NhZ2V9IG1lc3NhZ2UgXG4gICAgICovXG4gICAgYWRkX21lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLm1lc3NhZ2VzLmluY2x1ZGVzKG1lc3NhZ2UpKVxuICAgICAgICAgICAgdGhyb3cgXCJFdmVudCBhbHJlYWR5IGV4aXN0c1wiO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2gobWVzc2FnZSlcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogVGhpcyB0YWtlcyB0aGUgbWVzc2FnZSwgb3BlbnMgYSBjb25uZWN0aW9uIHdpdGggdGhlXG4gICAgICogc2VydmVyIGFuZCBzZW5kcyB0aGUgbWVzc2FnZSBhbG9uZy4gVGhpcyBsYXRlciBpcyBcbiAgICAgKiBob29rZWQgYnkgdGhlIC5vbm1lc3NhZ2UgZnVuY3Rpb24gZGVmaW5lZCBpbiBgb3Blbl9jb25uZWN0aW9uYFxuICAgICAqIHdoaWNoIGhhbmRsZXMgdGhlIFxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7SlNPTn0gbWVzc2FnZSBcbiAgICAgKi9cbiAgICBzZW5kX21lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnNvY2tldC5zZW5kKEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRoZSBjb25uZWN0aW9uIHdpdGggdGhlIHdlYnNlcnZlciwgdGhlbiBzZW5kcyB0aGUgY29tbWFuZHNcbiAgICAgKiB0byB0aGUgc2VydmVyIGJhc2VkIG9uIHRoZSBjb2RlIHdyaXR0ZW4uXG4gICAgICovXG4gICAgc3RhcnQoKSB7XG5cbiAgICAgICAgdGhpcy5vcGVuX2Nvbm5lY3Rpb24oKS50aGVuKFxuICAgICAgICAgICAgKHN1Y2Nlc3MpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1lc3NhZ2VzLmZvckVhY2goKG1lc3NhZ2UsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2VuZXJhdGVzIGEgSlNPTiBmb3JtYXQgbWVzc2FnZSBmcm9tIHRoZSBvYmplY3QgLy9cbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9IHRoaXMuZ2VuZXJhdGVfbWVzc2FnZShtZXNzYWdlLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZHMgdGhlIG1lc3NhZ2UgdmlhIHNvY2tldHMgLy9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kX21lc3NhZ2UobWVzc2FnZSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIChleGNlcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGNvbm5lY3RpbmcgdG8gdGhlIHNlcnZlciwgaXMgaXQgcnVubmluZz9cIilcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbn0iXX0=
